import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import "./lesson-test.css"

interface Option {
	text: string
	isCorrect: boolean
}

interface Question {
	question: string
	options: Option[]
}

const QuestionTest: React.FC = () => {
	const router = useRouter()
	const [questions, setQuestions] = useState<Question[]>([])
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [score, setScore] = useState(0)
	const [showScore, setShowScore] = useState(false)

	useEffect(() => {
		const userEmailIn = localStorage.getItem("userEmail")!
		setUserEmail(userEmailIn)
	}, [])

	useEffect(() => {
		axios.get(`/api/questions?testid=${router.query.id}`)
			.then(response => {
				setQuestions(response.data)
				console.log(response.data, 'questionsResponse')
			})
			.catch(error => {
				console.error('Ошибка при загрузке вопросов и вариантов ответов:', error)
			})
	}, [])

	const handleAnswerOptionClick = async (isCorrect: boolean) => {
		if (isCorrect) {
			setScore(score + 1)
		}

		const nextQuestion = currentQuestion + 1
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion)
		} else {
			setShowScore(true)

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

	return (
		<div className='true-and-false'>
			{showScore && questions ? (
				<div className='score-section'>
					Верно {score} из {questions.length}
					<br />
					<p>{score <= 1 ? "Неудовлетворительно" : score <= 3 ? "Удовлетворительно" : score <= 5 ? "Хорошо" : score === 6 ? "Отлично" : "Неудовлетворительно"}</p>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Вопрос {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion]?.question}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion]?.options.map((option, index) => (
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

export default QuestionTest
