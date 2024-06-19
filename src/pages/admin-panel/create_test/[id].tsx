import Question from '@/components/Question/Question'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import './create_test.css'

export default function CreateTest() {
	const router = useRouter()

	const [testName, setTestName] = useState('')
	const [questions, setQuestions] = useState(
		Array(6).fill({ text: '', selectedOption: null })
	)
	const [isSuccess, setIsSuccess] = useState(false)

	const selectedTopicId = router.query.id

	const updateQuestion = (index: number, title: string, selectedOption: any) => {
		const updatedQuestions = [...questions]
		updatedQuestions[index] = { title, selectedOption }
		setQuestions(updatedQuestions)
	}

	const handleFormSubmit = async (e: any) => {
		e.preventDefault()

		if (!selectedTopicId || !testName.trim()) {
			alert('Выберите тему и введите название теста.')
			return
		}

		try {
			const response = await axios.post('/api/create-test', {
				topicid: selectedTopicId,
				testName,
				questions,
			})

			console.log('Тест успешно создан:', response.data)
			setIsSuccess(true)
		} catch (error) {
			console.error('Ошибка при создании теста:', error)
			alert('Ошибка при создании теста. Пожалуйста, попробуйте еще раз.')
		}
	}

	return (
		<div className='create-test'>
			{isSuccess ? (
				<div>
					<form
						className='create-container'
						style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
					>
						<div>Практический тест был успешно создан (Topic ID: {router.query.id})</div>
					</form>
				</div>
			) : (
				<>
					<h1 className='create-test_header'>Создать урок</h1>
					<form className='create-test_form' onSubmit={handleFormSubmit}>
						<div className='create-container'>
							<input
								className='create-test-input-topic-name'
								minLength={4}
								maxLength={16}
								id='testName'
								value={testName}
								onChange={(e) => setTestName(e.target.value)}
								type='text'
								placeholder='Название темы'
								required
							/>
						</div>
						<div className='create-questions'>
							{questions.map((question, index) => (
								<Question key={index} index={index} updateQuestion={updateQuestion} />
							))}
						</div>
						<button className='create-test-submit' type='submit'>
							Создать
						</button>
					</form>
				</>
			)}
		</div>
	)
}
