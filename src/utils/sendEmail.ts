import nodemailer from 'nodemailer'

// Настройки SMTP от mail.ru
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true, // используйте SSL
  auth: {
    user: 'dyachkovalk@mail.ru',
    pass: '66zUP8cHfG2CFBihxzrW',
  },
})

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: 'dyachkovalk@mail.ru',
      to,
      subject,
      text,
    })
    console.log('Email sent: ', info.messageId)
    return info.messageId
  } catch (error) {
    console.error('Error sending email: ', error)
    throw error
  }
}
