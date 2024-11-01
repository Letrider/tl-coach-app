import { NextApiRequest, NextApiResponse } from 'next'
import { verify, JwtPayload } from 'jsonwebtoken'
import { getUserByEmail } from "@/utils/db"
import cookie from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const cookies = cookie.parse(req.headers.cookie || '')
        const token = cookies.token

        if (!token) {
            return res.status(401).json({ error: 'Токен аутентификации не был найден' })
        }

        try {
            const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload

            if (typeof decoded === 'object' && 'userId' in decoded) {
                const user = await getUserByEmail(decoded.userId)
                if (user) {
                    res.status(200).json({ firstName: user.name, lastName: user.lastname, telephone: user.telephone })
                } else {
                    res.status(404).json({ error: 'Пользователь не был найден' })
                }
            } else {
                throw new Error('Невалидный токен')
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
