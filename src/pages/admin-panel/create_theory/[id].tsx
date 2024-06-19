import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ModalYoutube from './ModalYoutube'
import './create_theory.css'

export default function CreateTheory(): JSX.Element {
	const router = useRouter()

	const [theoryContent, setTheoryContent] = useState<string>('')
	const [theoryName, setTheoryName] = useState<string>('')
	const [theoryNumber, setTheoryNumber] = useState<string>('')
	const [youtubeURL, setYoutubeURL] = useState<string>('')
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const selectedTopicId = router.query.id

	const handleTheorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!selectedTopicId || !theoryContent.trim()) {
			alert('Выберите тему и введите содержание теории.')
			return
		}

		try {
			const response = await axios.post('/api/create-theory', {
				topicid: selectedTopicId,
				number: theoryNumber,
				name: theoryName,
				description: theoryContent.trim(),
				youtubeURL: youtubeURL || null
			})

			console.log('Теория успешно создана:', response.data)
			setIsSuccess(true)
		} catch (error) {
			console.error('Ошибка при создании теории:', error)
			alert('Ошибка при создании теории. Пожалуйста, попробуйте еще раз.')
		}
	}

	const handleImageClick = () => {
		setIsModalOpen(true)
	}

	const handleModalSave = (url: string) => {
		const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:&|$)/)
		if (match) {
			setYoutubeURL(match[1])
		}
	}

	return (

		<div className='create-theory'>
			{
				isSuccess
					? <form className='create-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div>Теоритический урок был успешно создан (Topic ID: {router.query.id})</div></form>
					: <>
						<h1 className='create-theory_header'>Создать урок</h1>
						<form className='create-theory_form' onSubmit={handleTheorySubmit}>

							<div className='create-container-first'>
								<input
									className='create-theory-input-number'
									min={1}
									type="number"
									id='theoryNumber'
									value={theoryNumber}
									onChange={(e) => setTheoryNumber(e.target.value)}
									placeholder='Номер урока'
								/>
							</div>
							<div className='create-container'>
								<input
									className='create-theory-input-topic-name'
									min={4}
									max={16}
									id='theoryName'
									value={theoryName}
									onChange={(e) => setTheoryName(e.target.value)}
									type="text"
									placeholder='Название темы'
									required
								/>
								<div className="textarea-container">
									<textarea
										minLength={30}
										className='create-container-theory_textarea'
										id="theoryContent"
										value={theoryContent}
										onChange={(e) => setTheoryContent(e.target.value)}
										placeholder='Описание урока'
										required
									/>
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										<Image
											className='button-image-uploader'
											src={`/images/ikonki/create-upload-image.png`}
											width={50}
											height={50}
											alt='create-upload-image'
											onClick={handleImageClick}
										/>
									</div>
								</div>
							</div>
							{youtubeURL
								? (
									<div>
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: .5 }}
										>
											<iframe
												width="1000"
												height="200"
												// src={`https://www.youtube.com/embed/${youtubeURL}`}
												src={`https://www.youtube.com/embed/${youtubeURL}`}
												title="YouTube video player"
												allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
												allowFullScreen
											></iframe>
										</motion.div>
									</div>
								) : null
							}
							<button className='create-theory-submit' type="submit">Создать</button>
						</form>
					</>

			}
			<ModalYoutube isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleModalSave} />

		</div>
	)
}
