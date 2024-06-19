import { pool } from '@/utils/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const { testid } = req.query

			if (!testid) {
				return res.status(400).json({ message: 'Не указан идентификатор теста' })
			}

			const questions = await pool.query('SELECT * FROM questions WHERE testid = $1', [testid] as any)
			console.log(questions.rows, 'questions')
			console.log(questions.rows[0].selected_option)
			const formattedQuestions = questions.rows.map((question: any) => ({
				question: question.title,
				options: [
					{ text: question.selected_option[0].text, isCorrect: question.selected_option[0].isCorrect },
					{ text: question.selected_option[1].text, isCorrect: question.selected_option[1].isCorrect },
					{ text: question.selected_option[2].text, isCorrect: question.selected_option[2].isCorrect },
				],
			}))

			res.status(200).json(formattedQuestions)
		} catch (error) {
			console.error('Ошибка при загрузке вопросов и вариантов ответов:', error)
			res.status(500).json({ message: 'Ошибка при загрузке вопросов и вариантов ответов' })
		}
	} else {
		res.status(405).json({ message: 'Метод не поддерживается' })
	}
}

