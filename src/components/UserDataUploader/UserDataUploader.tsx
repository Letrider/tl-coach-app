import axios from "axios"
import Image from 'next/image'
import React, { useEffect, useState } from "react"

interface UserDataUploaderProps {
    isLogged: boolean
}

export default function UserDataUploader({ isLogged }: UserDataUploaderProps): React.JSX.Element {
    const [avatar, setAvatar] = useState<File | null>(null)
    const [fullName, setFullName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (isLogged) {
            const userEmail = localStorage.getItem("userEmail")
            if (!userEmail) {
                setError("Вы не авторизованы")
                setLoading(false)
                return
            }

            axios.get(`/api/user?email=${userEmail}`)
                .then(response => {
                    const { firstName, lastName } = response.data
                    setFullName(`${firstName} ${lastName}`)
                })
                .catch(error => {
                    console.error('Ошибка загрузки данных пользователя:', error)
                    setError('Ошибка загрузки данных пользователя')
                })
                .finally(() => setLoading(false))
        }
    }, [isLogged])

    const uploadAvatar = (file: File) => {
        const formData = new FormData()
        formData.append('avatar', file, file.name) // Правильно указываем имя поля файла
        
        console.log('Отправка данных на сервер:', formData, file, file.name)
        
        axios.post('/api/upload', formData)
        
            .then(response => {
                console.log('Успешная загрузка аватара:', response.data)
            })
            .catch(error => {
                console.error('Ошибка загрузки аватара:', error)
            })
            .finally(() => {
                console.log('Запрос завершен')
            })
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            console.log("Выбран файл:", file) // Добавляем отладочный вывод
            setAvatar(file)
            uploadAvatar(file) // Вызываем функцию uploadAvatar после установки состояния avatar
        }
    }

    if (!isLogged) {
        return <div>Вы не авторизованы</div>
    }

    if (loading) {
        return <div>Загрузка данных...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="user-card">
            <div className="user-card_logo">
                <label className="btn-upload">
                    <svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.0995 5H7.85381C7.36215 5 6.89062 5.19531 6.54297 5.54297C6.19531 5.89062 6 6.36215 6 6.85381V23.5381C6 24.0297 6.19531 24.5012 6.54297 24.8489C6.89062 25.1966 7.36215 25.3919 7.85381 25.3919H30.0995C30.5911 25.3919 31.0627 25.1966 31.4103 24.8489C31.758 24.5012 31.9533 24.0297 31.9533 23.5381V6.85381C31.9533 6.36215 31.758 5.89062 31.4103 5.54297C31.0627 5.19531 30.5911 5 30.0995 5ZM11.5614 8.70761C11.9281 8.70761 12.2865 8.81634 12.5913 9.02003C12.8962 9.22373 13.1338 9.51326 13.2741 9.852C13.4144 10.1907 13.4511 10.5635 13.3796 10.9231C13.3081 11.2827 13.1315 11.613 12.8723 11.8723C12.613 12.1315 12.2827 12.3081 11.9231 12.3796C11.5635 12.4511 11.1907 12.4144 10.852 12.2741C10.5133 12.1338 10.2237 11.8962 10.02 11.5913C9.81634 11.2865 9.70761 10.9281 9.70761 10.5614C9.70761 10.0698 9.90292 9.59824 10.2506 9.25058C10.5982 8.90292 11.0698 8.70761 11.5614 8.70761ZM28.2457 21.6842H9.70761V19.8304L13.4152 16.1228L15.269 17.9766L22.6842 10.5614L28.2457 16.1228V21.6842Z" fill="white"/></svg>
                    <input type="file" name="avatar" accept="image/*" onChange={handleAvatarChange} />
                </label>
                {avatar && <Image src={URL.createObjectURL(avatar)} alt="avatar" className="user-card_avatar-image" />}
            </div>
            <h1 className="user-card_username">{fullName ? fullName : "Ошибка загрузка данных.."}</h1>
        </div>
    )
}
