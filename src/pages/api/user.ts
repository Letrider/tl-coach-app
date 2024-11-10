import { NextApiRequest, NextApiResponse } from 'next'
import { verify, JwtPayload } from 'jsonwebtoken'
import { getUserById } from "@/utils/db"
import cookie from 'cookie'
import { HttpStatus } from '@/constants/methods'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        const cookies = cookie.parse(req.headers.cookie || '')
        const token = cookies.token

        if (!token) {
            return res.status(HttpStatus.Unauthorized).json({ error: 'Токен аутентификации не был найден' })
        }

        try {
            const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload
            const userId = decoded.userId

            if (!userId) {
                return res.status(HttpStatus.Unauthorized).json({ error: 'Невалидный токен' })
            }

            const user = await getUserById(userId)
            if (user) {
                res.status(HttpStatus.Success).json({
                    firstName: user.name,
                    lastName: user.lastname,
                    telephone: user.telephone,
                    email: user.email,
                    token
                })
            } else {
                res.status(HttpStatus.NotFound).json({ error: 'Пользователь не был найден' })
            }
        } catch (error) {
            console.error('Ошибка верификации токена:', error)
            res.status(HttpStatus.Unauthorized).json({ error: 'Невалидный токен' })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(HttpStatus.MethodNotAllowed).end(`Method ${req.method} not allowed`)
    }
}
