import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'

interface FileNextApiRequest extends NextApiRequest {
  file: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}

const upload = multer({ dest: 'clientdata/avatars', limits: { fileSize: 10 * 1024 * 1024 } })

export default function handler(req: FileNextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.method)
    upload.single('avatar')(req as any, res as any, (err: any) => {
      if (err instanceof multer.MulterError) {
        console.error("[POST => 500] Ошибка Multer: ", err.message)
        return res.status(500).json({ message: 'Ошибка Multer при загрузке файла: ' + err.message })
      } else if (err) {
        console.error("[POST => 500] Ошибка сервера: ", err.message)
        return res.status(500).json({ message: 'Ошибка сервера при загрузке файла: ' + err.message })
      }

      if (!req.file) {
        console.error("Файл не был загружен")
        return res.status(400).json({ message: 'Файл не был загружен' })
      }

      console.log("Файл успешно загружен:", req.file)
      res.status(200).json({ message: 'Файл успешно загружен', filePath: req.file.path })
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Метод ${req.method} не поддерживается`)
  }
}