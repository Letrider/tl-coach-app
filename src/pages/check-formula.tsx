import Image from 'next/image'
import { useState } from "react"

import "@/styles/main.css"
import "@/styles/reset.css"
const checkFormula = (formula: string): boolean => {
  if (!formula.trim()) return false
  if (formula.length <= 1) return false // Минимальная длина формулы для проверки

  const operators = ["U", "R", "N", "F", "G", "A", "E"]

  // Проверка наличия хотя бы одного символа оператора
  if (!formula.split("").some(char => operators.includes(char.toUpperCase()))) {
    return false
  }

  // Проверка наличия хотя бы одного символа выражения, не являющегося оператором
  if (!formula.split("").some(char => !operators.includes(char.toUpperCase()))) {
    return false
  }

  let hasOperator = false
  let hasExpression = false

  for (let i = 0; i < formula.length; i++) {
    const char = formula[i]
    const nextChar = formula[i + 1]

    if (!isNaN(parseInt(char, 10))) {
      return false
    }

    if (operators.includes(char.toUpperCase()) && nextChar) {
      hasOperator = true
      hasExpression = true
    }

    if (!operators.includes(char.toUpperCase()) && nextChar) {
      hasExpression = true
    }
  }

  if (!hasExpression && hasOperator) {
    return false // Если только операторы и нет выражений, вернуть false
  }

  return true
}


export default function Tasks(): React.JSX.Element {
  const [formula, setFormula] = useState<string>("")
  const [result, setResult] = useState<string>("")

  const handleCheckFormula = () => {
    if (!formula) {
      setResult("формула введена некорректно.")
      return
    }

    const isFormulaValid = checkFormula(formula)
    setResult(isFormulaValid ? "формула верна." : "формула неверна.")
  }

  return (
    <div className="content-formula">
      <div className="container">
        <div className="container-header">
          <div className="content-header">
            <h1>Проверка формулы</h1>
            {/* <div className="content_text">
              <p>Решение задач</p>
              <div className="line"></div>
              <p>Ввод формул</p>
            </div> */}
          </div>
        </div>

        <div className="container-input">
          <div className="content-input">
            <h3>Введите формулу</h3>
            <input
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
            />
          </div>

          <div className="button-formula">
            <button onClick={() => setFormula((prev) => prev + "U")}>U</button>
            <button onClick={() => setFormula((prev) => prev + "R")}>R</button>
            <button onClick={() => setFormula((prev) => prev + "N")}>N</button>
            <button onClick={() => setFormula((prev) => prev + "F")}>F</button>
            <button onClick={() => setFormula((prev) => prev + "G")}>G</button>
            <button onClick={() => setFormula((prev) => prev + "A")}>A</button>
            <button onClick={() => setFormula((prev) => prev + "E")}>E</button>
          </div>

          <div className="check-formula">
            <button onClick={handleCheckFormula}>
              <h1>Проверить формулу</h1>
              <Image src="/images/Rectangle.png" width={1000} height={1000} alt="rectangle" />
            </button>
            <br />
          </div>
          {result && <p>{result}</p>}
        </div>
      </div>
    </div>
  )
}
