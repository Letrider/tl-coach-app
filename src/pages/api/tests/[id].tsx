import { pool } from '@/utils/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query

	if (req.method === 'GET') {
		try {
			const client = await pool.connect()
			const result = await client.query('SELECT * FROM tests WHERE id = $1', [id] as any)
			client.release()

			if (result.rows.length === 0) {
				return res.status(404).json({ error: 'Tests not found' })
			}

			res.status(200).json(result.rows)
		} catch (error) {
			console.error('Ошибка при получении урока:', error)
			res.status(500).json({ error: 'Ошибка сервера при получении урока' })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Метод ${req.method} не поддерживается, используйте GET`)
	}
}
