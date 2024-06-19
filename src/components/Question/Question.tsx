import React, { ChangeEvent, useEffect, useState } from 'react'
import './Question.css'

interface Option {
	text: string
	isCorrect: boolean
}

interface QuestionProps {
	index: number
	updateQuestion: (index: number, title: string, options: Option[]) => void
}

const Question: React.FC<QuestionProps> = ({ index, updateQuestion }) => {
	const [questionTitle, setQuestionTitle] = useState('')
	const [options, setOptions] = useState<Option[]>(Array(3).fill({ text: '', isCorrect: false }))

	useEffect(() => {
		updateQuestion(index, questionTitle, options)
	}, [questionTitle, options])

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuestionTitle(e.target.value)
	}

	const handleOptionChange = (e: ChangeEvent<HTMLInputElement>, optionIndex: number) => {
		const updatedOptions = [...options]
		updatedOptions[optionIndex] = { text: e.target.value, isCorrect: updatedOptions[optionIndex].isCorrect }
		setOptions(updatedOptions)
	}

	const handleRadioChange = (optionIndex: number) => {
		const updatedOptions = options.map((option, idx) => ({
			...option,
			isCorrect: idx === optionIndex,
		}))
		setOptions(updatedOptions)
	}

	return (
		<div className='question-container'>
			<input
				type='text'
				minLength={4}
				maxLength={32}
				placeholder='Название вопроса'
				value={questionTitle}
				onChange={handleTitleChange}
			/>
			<ul>
				{options.map((option, optionIndex) => (
					<li key={optionIndex}>
						<label>
							<input
								className='custom-input-check'
								type='radio'
								checked={option.isCorrect}
								onChange={() => handleRadioChange(optionIndex)}
							/>
							<input
								type='text'
								value={option.text}
								onChange={(e) => handleOptionChange(e, optionIndex)}
								placeholder={`Ответ ${optionIndex + 1}`}
							/>
						</label>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Question
