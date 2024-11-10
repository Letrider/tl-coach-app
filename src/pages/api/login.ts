import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { query } from "@/utils/db"
import { HttpStatus } from '@/constants/methods'

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  if (req.method !== 'POST') {
    return res.status(HttpStatus.MethodNotAllowed).json({ message: 'Разрешен только POST запрос!' })
  }

  if (!email || !password) {
    return res.status(HttpStatus.BadRequest).json({ message: 'Пожалуйста, укажите email и пароль' })
  }

  try {
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email])

    if (rows.length === 0) {
      return res.status(HttpStatus.Unauthorized).json({ message: 'Пользователь не найден' })
    }

    const user = rows[0]

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(HttpStatus.Unauthorized).json({ message: 'Неверные учетные данные' })
    }

    const secret = process.env.JWT_SECRET as string
    if (!secret) throw new Error("JWT секрет не найден в переменных окружения")

    const token = sign({ userId: user.id }, secret)

    res.setHeader('Set-Cookie', `token=${token}; Path=/;`)

    return res.status(HttpStatus.Success).json({ message: 'Авторизация успешна', token })

  } catch (error) {
    console.error("Ошибка на сервере:", error)
    return res.status(HttpStatus.InternalServerError).json({ message: 'Произошла ошибка на сервере' })
  }
}
