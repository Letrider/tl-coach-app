import { useState } from "react"

enum TemporalOperator {
  ALWAYS = "G",
  UNTIL = "U",
  EVENTUALLY = "F",
  NEXT = "X",
}

export default function TemporalInput(): React.JSX.Element {
  const [formula, setFormula] = useState<string>("")
  const [result, setResult] = useState<string>("")

  const handleCheckFormula = () => {
    // Реализуйте здесь логику проверки формулы с темпоральными операторами
    console.log("Проверяемая формула:", formula)
    // Далее обрабатывайте формулу и выводите результат проверки
  }

  const handleOperatorClick = (operator: TemporalOperator) => {
    setFormula((prevFormula) => prevFormula + operator)
  }

  return (
    <div>
      <input
        type="text"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
      />
      <div>
        {Object.values(TemporalOperator).map((op) => (
          <button key={op} onClick={() => handleOperatorClick(op)}>
            {op}
          </button>
        ))}
      </div>
      <button onClick={handleCheckFormula}>Проверить формулу</button>
      <div>Результат: {result}</div>
    </div>
  )
}

