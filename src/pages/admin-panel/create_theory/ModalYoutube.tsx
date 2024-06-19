import React, { useState } from 'react'
import './create_theory.css'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (url: string) => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
	const [url, setUrl] = useState('')

	const handleSave = () => {
		onSave(url)
		onClose()
	}

	function extractYoutubeId(url: string): string | null {
		const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
		const match = url.match(regex)

		return match ? match[1] : null
	}


	if (!isOpen) return null

	return (
		<div className="modal">
			<div className="modal-content">
				<h2>Введите ссылку на YouTube</h2>
				<input
					type="text"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="https://youtube.com/..."
				/>
				<button onClick={handleSave}>Сохранить</button>
				<button onClick={onClose}>Отмена</button>
			</div>
		</div>
	)
}

export default Modal
