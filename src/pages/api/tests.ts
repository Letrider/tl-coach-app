import { HttpStatus } from '@/constants/methods'
import { query } from '@/utils/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getLessons(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const { id } = req.query
			console.log('Received ID:', id)

			if (!id) {
				return res.status(400).json({ error: 'Не указан ID темы' })
			}

			const getLessonsQuery = `SELECT * FROM tests WHERE topicId = $1`
			const tests = await query(getLessonsQuery, [id])

			if (tests.rows.length === 0) {
				return res.status(404).json({ error: 'Тестов нет для указанной темы' })
			}

			res.status(HttpStatus.Success).json(tests.rows)
		} catch (error) {
			console.error('Ошибка при запросе уроков:', error)
			res.status(HttpStatus.InternalServerError).json({ error: "Ошибка сервера при запросе уроков" })
		}
	} else {
		res.status(HttpStatus.MethodNotAllowed).end()
	}
}
