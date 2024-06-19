// components/CreateLessonForm.tsx
import { useState } from 'react'

const CreateLessonForm = ({ onSubmit }: { onSubmit: (lessonData: any) => void }) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [youtubeLinks, setYoutubeLinks] = useState<string[]>([''])

	const handleAddLink = () => {
		setYoutubeLinks([...youtubeLinks, ''])
	}

	const handleLinkChange = (index: number, value: string) => {
		const newLinks = [...youtubeLinks]
		newLinks[index] = value
		setYoutubeLinks(newLinks)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit({ title, description, youtubeLinks })
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Название урока</label>
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div>
				<label>Описание</label>
				<textarea value={description} onChange={(e) => setDescription(e.target.value)} />
			</div>
			<div>
				<label>YouTube ссылки</label>
				{youtubeLinks.map((link, index) => (
					<input
						key={index}
						type="text"
						value={link}
						onChange={(e) => handleLinkChange(index, e.target.value)}
						placeholder={`Ссылка ${index + 1}`}
					/>
				))}
				<button type="button" onClick={handleAddLink}>
					Добавить ссылку
				</button>
			</div>
			<button type="submit">Создать урок</button>
		</form>
	)
}

export default CreateLessonForm
