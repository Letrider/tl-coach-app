import { sendEmail } from '@/utils/sendEmail'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, address, subject, message } = req.body

    try {
      // Отправляем письмо
      await sendEmail('dyachkovalk@mail.ru', subject, `
        Имя: ${name}
        Эл. почта: ${email}
        Телефон: ${phone}
        Адрес: ${address}
        Сообщение: ${message}
      `)
      res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ message: 'Failed to send email' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
