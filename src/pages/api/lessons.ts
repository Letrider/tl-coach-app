import { query } from '@/utils/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getLessons(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const { id } = req.query
			console.log('Received ID:', id)

			// Проверка наличия id в запросе
			if (!id) {
				return res.status(400).json({ error: 'Не указан ID темы' })
			}

			const getLessonsQuery = `SELECT * FROM lessons WHERE topicId = $1`
			const lessons = await query(getLessonsQuery, [id])

			// Проверка наличия уроков по указанной теме
			if (lessons.rows.length === 0) {
				return res.status(404).json({ error: 'Уроков нет для указанной темы' })
			}

			res.status(200).json(lessons.rows)
		} catch (error) {
			console.error('Ошибка при запросе уроков:', error)
			res.status(500).json({ error: "Ошибка сервера при запросе уроков" })
		}
	} else {
		res.status(405).end()
	}
}
