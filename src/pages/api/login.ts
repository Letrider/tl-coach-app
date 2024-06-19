import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { query } from "@/utils/db"
import { HttpStatus } from '@/constants/methods'



export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  
  if (req.method !== 'POST') {
    return res.status(HttpStatus.MethodNotAllowed).json({ message: 'Разрешены только запросы POST' })
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

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET не определен")
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    

    return res.status(HttpStatus.Success).json({ token })

  } catch (error) {
    console.error(error)

    return res.status(HttpStatus.InternalServerError).json({ message: 'Что-то пошло не так' })
  }
}
