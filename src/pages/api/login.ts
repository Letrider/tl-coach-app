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

  try {
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email])

    if (rows.length === 0) {
      return res.status(HttpStatus.Unauthorized).json({ message: 'Пользователь не был найден' })
    }

    const user = rows[0]
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(HttpStatus.Unauthorized).json({ message: 'Invalid credentials' })
    }

    const secret = process.env.JWT_SECRET as string
    if (!secret) throw new Error("[LH] Токен не был найден")

    const token = sign({ userId: user.id }, secret, { expiresIn: '1h' })

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`)
    return res.status(HttpStatus.Success).json({ message: 'Login successful' })

  } catch (error) {
    console.error(error)
    return res.status(HttpStatus.InternalServerError).json({ message: 'An error occurred' })
  }
}
