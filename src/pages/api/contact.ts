import { sendEmail } from '@/utils/sendEmail'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, address, subject, message } = req.body

    try {
      await sendEmail('<Ваша-почта>@domain.ru', subject, `
        Имя: ${name}
        Эл. почта: ${email}
        Телефон: ${phone}
        Адрес: ${address}
        Сообщение: ${message}
      `)
      res.status(200).json({ message: 'Почта отправлена успешно' })
    } catch (error) {
      console.error('Ошибка отправки письма:', error)
      res.status(500).json({ message: 'Ошибка отправки письма' })
    }
  } else {
    res.status(405).json({ message: 'Метод не разрешен' })
  }
}
