// Компонент еще не подключен

import axios from 'axios'
import imageCompression from 'browser-image-compression'
import Image from 'next/image'
import React, { useState } from 'react'

function ImageUploader(): JSX.Element {
    const [image, setImage] = useState<File | null>(null)

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null
        if (!file) {
            return
        }
        // Опции сжатия
        const options: any = {
            maxSizeMB: 100,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }

        try {
            const compressedFile = await imageCompression(file, options)
            setImage(compressedFile)

            const formData = new FormData()
            formData.append('image', compressedFile)
            await axios.post('/api/upload', formData)

            console.log('Изображение успешно загружено и сжато:', compressedFile)
        } catch (error) {
            console.error('Ошибка сжатия или загрузки:', error)
        }
    }

    return (
        <>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <Image src={URL.createObjectURL(image)} alt="avatar" className="user-card_avatar-image" />}
        </>
    )
}

export default ImageUploader
