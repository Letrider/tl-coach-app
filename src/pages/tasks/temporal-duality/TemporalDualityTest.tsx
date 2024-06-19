import { TemporalDualityIdentities_Test } from '@/constants/data'
import React, { useEffect, useState } from 'react'
import "./TemporalDualityTest.css"

interface Option {
  text: string
  isCorrect: boolean
}

interface Question {
  question: string
  options: Option[]
}

const TemporalDualityTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerOptionClick = async (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < TemporalDualityIdentities_Test.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)

      // Отправка результатов теста на сервер
      const response = await fetch('/api/saveTestResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score, userEmail }),
      })
      console.log(response)

      if (!response.ok) {
        console.error('Ошибка при сохранении результатов теста:', response.statusText)
      }
    }
  }
  useEffect(() => {
    const userEmailIn = localStorage.getItem("userEmail")!
    
    userEmailIn ? setUserEmail(userEmailIn) : new Error("[Operator-Test] Почты в хранилище не найдено")
  }, [userEmail])

  return (
    <div className='true-and-false'>
      {showScore ? (
        <div className='score-section'>
          Верно {score} из {TemporalDualityIdentities_Test.length}
          <br />
          <p>{ score <= 1 ? "Неудовлетворительно" : score <= 3 ? "Удовлетворительно" : score <= 5 ? "Хорошо" : score === 6 ? "Отлично" : "Неудовлетворительно"}</p>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Вопрос {currentQuestion + 1}</span>/{TemporalDualityIdentities_Test.length}
            </div>
            <div className='question-text'>{TemporalDualityIdentities_Test[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {TemporalDualityIdentities_Test[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option.isCorrect)}>
                {option.text}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default TemporalDualityTest