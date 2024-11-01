import UserDataUploader from "@/components/UserDataUploader/UserDataUploader"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { parseCookies, destroyCookie } from "nookies"
import Input from "@/components/UI/Input/input"
import Link from "next/link"
import { useAuth } from "@/providers/AuthContext"

export default function Dashboard(): React.JSX.Element {
    const { isLogged, setIsLogged } = useAuth()
    const [userEmail, setUserEmail] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [telephone, setTelephone] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        const cookies = parseCookies()
        console.log('cookies', cookies)
        const token = cookies.token

        if (token) {
            setIsLogged(true)
            axios.get(`/api/user`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    const { email, firstName, lastName, telephone } = response.data
                    setUserEmail(email)
                    setFirstName(firstName || "Нет данных")
                    setLastName(lastName || "Нет данных")
                    setTelephone(telephone || "Не привязан")
                })
                .catch(error => {
                    console.error("Ошибка загрузки данных пользователя:", error)
                })
        } else {
            setIsLogged(false) // Если токен отсутствует, сбрасываем статус 
            router.push("/signin") // Перенаправляем на страницу входа
        }
    }, [router, setIsLogged])

    const handleUpdateButtonClick = () => {
        if (userEmail) {
            axios.put(`/api/user?email=${userEmail}`, {
                firstName,
                lastName,
                telephone,
            })
                .then(response => {
                    const { firstName, lastName, telephone } = response.data
                    setFirstName(firstName || "Не привязан")
                    setLastName(lastName || "Не привязан")
                    setTelephone(telephone || "Не привязан")
                    setSuccessMessage("Данные успешно обновлены")
                    router.reload()
                })
                .catch(error => {
                    console.error("Ошибка загрузки данных пользователя:", error)
                })
        }
    }

    const handleExit = () => {
        destroyCookie(null, "token")
        setIsLogged(false) // Сбрасываем статус авторизации
        router.reload() // Перезагружаем страницу
    }

    return (
        <div className="personal-account">
            <div className="account-info">
                {!isLogged ? (
                    <div>Вы не авторизованы</div>
                ) : (
                    <>
                        <div className="account-info_header">
                            <UserDataUploader isLogged={isLogged} />
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
