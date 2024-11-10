
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { query } from "@/utils/db"
import { HttpStatus } from '@/constants/methods'

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, login, name, lastname, telephone } = req.body
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await query(
      'INSERT INTO users(email, password, login, name, lastname, telephone) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [email, hashedPassword, login, name, lastname, telephone]
    )
    return res.status(HttpStatus.Success).json(result.rows[0])
  } catch (error) {
    console.error(error)
    return res.status(HttpStatus.InternalServerError).json({ message: 'Something went wrong' })
  }
}