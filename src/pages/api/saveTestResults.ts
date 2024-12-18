import { HttpStatus } from '@/constants/methods'
import { query } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { score, userEmail } = req.body
            let results = null
            console.log(req.body, "body")
            console.log(userEmail, "email SAVETESTRESULTS")

            if (score <= 1) results = "Неудовлетворительно"
            if (score <= 3 && score >= 2) results = "Удовлетворительно"
            if (score <= 5 && score >= 4) results = "Хорошо"
            if (score === 6) results = "Отлично"

            const insertQuery = `
                INSERT INTO tasks (name, description, deadline, created_at, updated_at, email, results)
                VALUES ($1, $2, $3, NOW(), NOW(), $4, $5)
            `
            await query(insertQuery, [`Тест результат`, `Результаты теста: ${score}`, '2024-04-26 23:59:59', userEmail, results])

            res.status(HttpStatus.Success).json({ message: 'Результаты теста успешно сохранены в базе данных' })
        } catch (error) {
            console.error('Ошибка при сохранении результатов теста:', error)
            res.status(HttpStatus.InternalServerError).json({ message: 'Ошибка при сохранении результатов теста' })
        }
    } else {
        res.status(HttpStatus.MethodNotAllowed).end()
    }
}
