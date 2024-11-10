import { NextApiRequest, NextApiResponse } from 'next'
import { verify, JwtPayload } from 'jsonwebtoken'
import { getUserById } from "@/utils/db"
import cookie from 'cookie'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        const cookies = cookie.parse(req.headers.cookie || '')
        const token = cookies.token

        if (!token) {
            return res.status(401).json({ error: 'Токен аутентификации не был найден' })
        }

        try {
            const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload
            const userId = decoded.userId

            if (!userId) {
                return res.status(401).json({ error: 'Невалидный токен' })
            }

            const user = await getUserById(userId)
            if (user) {
                res.status(200).json({
                    firstName: user.name,
                    lastName: user.lastname,
                    telephone: user.telephone,
                    email: user.email,
                    token
                })
            } else {
                res.status(404).json({ error: 'Пользователь не был найден' })
            }
        } catch (error) {
            console.error('Ошибка верификации токена:', error)
            res.status(401).json({ error: 'Невалидный токен' })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}
