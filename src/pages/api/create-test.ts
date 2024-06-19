import { pool } from '@/utils/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { topicid, testName, questions } = req.body
		console.log(req.body)

		try {
			const testResult = await pool.query(
				'INSERT INTO tests (topicid, name) VALUES ($1, $2) RETURNING id',
				[topicid, testName]
			)

			const testId = testResult.rows[0].id

			const questionPromises = questions.map((question: any) =>
				pool.query(
					'INSERT INTO questions (testid, title, selected_option) VALUES ($1, $2, $3)',
					[testId, question.title, JSON.stringify(question.selectedOption)]
				)
			)

			await Promise.all(questionPromises)

			res.status(200).json({ message: 'Тест успешно создан' })
		} catch (error) {
			console.error('Ошибка при создании теста:', error)
			res.status(500).json({ message: 'Ошибка при создании теста' })
		}
	} else {
		res.status(405).json({ message: 'Метод не поддерживается' })
	}
}
