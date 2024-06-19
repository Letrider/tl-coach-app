import { getUserByEmail, updateUserByEmail } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userEmail = req.query.email as string

        if (!userEmail) {
            return res.status(400).json({ error: 'Email пользователя не найден в localStorage' })
        }

        try {
            const fullName = await getUserByEmail(userEmail) // Передаем email в функцию getUserByEmail
            if (fullName) {
                const firstName = fullName.name
                const lastName = fullName.lastname
                const telephone = fullName.telephone

                res.status(200).json({ firstName, lastName, telephone })

            } else {
                res.status(404).json({ error: 'Пользователь не найден' })
            }
        } catch (error) {
            console.error('Ошибка получения данных о пользователе: ', error)
            res.status(500).json({ error: 'Ошибка сервера' })
        }

    } else if (req.method === 'PUT') {
        // Логика для обновления данных пользователя
        const { email } = req.query
        const { firstName, lastName, telephone } = req.body
        try {
            const updatedUserData = await updateUserByEmail(email as string, { firstName, lastName, telephone })
            if (updatedUserData) {
                res.status(200).json(updatedUserData)
            } else {
                res.status(404).json({ error: 'Пользователь не найден' })
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя:', error)
            res.status(500).json({ message: 'Ошибка при обновлении данных пользователя' })
        }
    } else {
        res.setHeader('Allow', ['PUT'])
        res.status(405).end(`Метод ${req.method} не поддерживается, используйте PUT`)
    }
}
