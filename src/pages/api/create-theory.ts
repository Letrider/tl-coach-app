import { createTheoryForTopic } from '@/utils/createTheoryForTopic'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { topicid, name, description, videoUrl } = req.body
		console.log(req.body)

		// Проверка наличия необходимых данных
		if (!topicid || !name || !description) {
			return res.status(400).json({ error: 'Все обязательные поля должны быть заполнены' })
		}

		try {
			const newTheory = await createTheoryForTopic({ topicid, name, description, videoUrl })

			res.status(201).json(newTheory)
		} catch (error) {
			console.error('Ошибка при создании теории:', error)
			res.status(500).json({ error: 'Ошибка сервера при создании теории' })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Метод ${req.method} не поддерживается, используйте POST`)
	}
}
