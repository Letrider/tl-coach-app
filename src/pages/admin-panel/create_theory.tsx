import { ITopic } from '@/interfaces/ITopic' // Предположим, что у вас есть интерфейс для темы
import axios from 'axios'
import React, { useState } from 'react'

interface CreateTheoryProps {
	selectedTopic: ITopic | null // Передаем выбранную тему в компонент
}

const CreateTheory: React.FC<CreateTheoryProps> = ({ selectedTopic }) => {
	const [theoryContent, setTheoryContent] = useState<string>('')

	const handleTheorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!selectedTopic || !theoryContent.trim()) {
			alert('Выберите тему и введите содержание теории.')
			return
		}

		try {
			const response = await axios.post('/api/create-theory', {
				topicId: selectedTopic.id,
				content: theoryContent.trim(),
			})
			console.log('Теория успешно создана:', response.data)
		} catch (error) {
			console.error('Ошибка при создании теории:', error)
			alert('Ошибка при создании теории. Пожалуйста, попробуйте еще раз.')
		}
	}

	return (
		<form onSubmit={handleTheorySubmit}>
			<label htmlFor="theoryContent">Содержание теории:</label>
			<textarea
				id="theoryContent"
				value={theoryContent}
				onChange={(e) => setTheoryContent(e.target.value)}
				required
			/>
			<button type="submit">Создать теорию</button>
		</form>
	)
}

export default CreateTheory
