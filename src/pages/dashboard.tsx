import axios from 'axios'
import { useState, useEffect } from 'react'
import jsCookie from 'js-cookie'
import UserDataUploader from "@/components/UserDataUploader/UserDataUploader"
import { useAuth } from "@/providers/AuthContext"
import Input from '@/components/UI/Input/input'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Dashboard() {
    const { isLogged, setIsLogged, logout } = useAuth()
    const [userEmail, setUserEmail] = useState("Нет данных")
    const [firstName, setFirstName] = useState("Нет ")
    const [lastName, setLastName] = useState("данных")
    const [telephone, setTelephone] = useState("Нет данных")
    const [successMessage, setSuccessMessage] = useState("")
    const router = useRouter()

    useEffect(() => {
        const token = jsCookie.get('token')

        if (!token) {
            setIsLogged(false)
            router.replace("/signin")
            return
        }

        axios.get('/api/user', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const { email, firstName, lastName, telephone } = response.data
                setUserEmail(email)
                setFirstName(firstName || "Нет данных")
                setLastName(lastName || "Нет данных")
                setTelephone(telephone || "Нет данных")
            })
            .catch(() => {
                jsCookie.remove("token")
                setIsLogged(false)
                router.replace("/signin")
            })
    }, [router, setIsLogged])


    const handleUpdateButtonClick = () => {
        axios.put(`/api/user`, { firstName, lastName, telephone })
            .then(response => {
                const { firstName, lastName, telephone } = response.data
                setFirstName(firstName || "Нет данных")
                setLastName(lastName || "Нет данных")
                setTelephone(telephone || "Нет данных")
                setSuccessMessage("Данные успешно обновлены")
            })
            .catch(() => {
                console.error("Ошибка обновления данных пользователя")
            })
    }

    const handleExit = () => {
        logout()
        router.reload()
    }

    return (
        <div className="personal-account">
            <div className="account-info">
                {!isLogged ? (
                    <div>Вы не авторизованы</div>
                ) : (
                    <>
                        <div className="account-info_header">
                            <UserDataUploader isLogged={isLogged} userFullname={`${firstName} ${lastName}`} />
                        </div>
                        <div className="account-info_main">
                            <div className="account-info_main-content">
                                <div className="account-info_main-content_header">
                                    <h1>Мой аккаунт</h1>
                                    <ul>
                                        <li><button className="update-account" onClick={handleUpdateButtonClick}>Обновить</button></li>
                                        <li><Link href="/stats"><button className="update-account">Статистика</button></Link></li>
                                        <li><button onClick={handleExit} className="update-account">Выйти</button></li>
                                    </ul>
                                </div>
                                <h1 style={{ color: "green" }}>{successMessage}</h1>
                                <h2>Просмотрите и отредактируйте сведения о себе</h2>
                                <div className="line"></div>

                                <h1 className="personal-information">Личная информация</h1>
                                <div className="email-info">
                                    <span>Электронная почта для входа: </span>
                                    <code>{userEmail}</code>
                                    <h4>*Адрес эл. почты, используемый для входа, нельзя изменить</h4>
                                </div>

                                <div className="account-info_main-content_main">
                                    <div className="row-content">
                                        <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}>Имя</Input>
                                        <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}>Фамилия</Input>
                                    </div>
                                    <div className="row-content">
                                        <Input type="email" value={userEmail} readOnly>Эл. почта *</Input>
                                        <Input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)}>Телефон</Input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}