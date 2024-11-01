import { query } from "@/utils/db" // Подключаем функцию query из вашего файла db.ts
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { email } = req.query
            console.log(email)

            if (!email || typeof email !== 'string') {
                return res.status(400).json({ error: "Не указан email пользователя" })
            }

            const selectQuery = `
                SELECT id FROM users WHERE email = $1
            `
            const result = await query(selectQuery, [email])

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Пользователь с указанным email не найден" })
            }

            const userEmail = result.rows[0].email
            console.log(result.rows, "result.rows")
            console.log(userEmail)
            res.status(200).json({ userEmail })
        } catch (error) {
            console.error("Ошибка при получении ID пользователя:", error)
            res.status(500).json({ error: "Ошибка сервера" })
        }
    } else {
        res.status(405).end()
    }
}
