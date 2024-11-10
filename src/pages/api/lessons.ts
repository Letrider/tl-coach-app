import { HttpStatus } from '@/constants/methods'
import { query } from '@/utils/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getLessons(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const { id } = req.query
			console.log('Received ID:', id)

			if (!id) {
				return res.status(HttpStatus.BadRequest).json({ error: 'Не указан ID темы' })
			}

			const getLessonsQuery = `SELECT * FROM lessons WHERE topicId = $1`
			const lessons = await query(getLessonsQuery, [id])

			if (lessons.rows.length === 0) {
				return res.status(HttpStatus.NotFound).json({ error: 'Уроков нет для указанной темы' })
			}

			res.status(HttpStatus.Success).json(lessons.rows)
		} catch (error) {
			console.error('Ошибка при запросе уроков:', error)
			res.status(HttpStatus.InternalServerError).json({ error: "Ошибка сервера при запросе уроков" })
		}
	} else {
		res.status(HttpStatus.MethodNotAllowed).end()
	}
}
