'use client'

import UserDataUploader from "@/components/UserDataUploader/UserDataUploader"
import axios from "axios"
import Router, { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import "@/styles/main.css"
import "@/styles/reset.css"

import Input from "@/components/UI/Input/input"
import Link from 'next/link'

export default function Dashboard(): React.JSX.Element {
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [userEmail, setUserEmail] = useState("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [telephone, setTelephone] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const router = useRouter()

    const handleUpdateButtonClick = () => {
        // Отправить запрос на обновление данных
        if (userEmail) {
            axios.put(`/api/user?email=${userEmail}`, {
                firstName: firstName,
                lastName: lastName,
                telephone: telephone // Добавляем номер телефона в тело запроса
            })
                .then((response): any => {
                    const { firstName, lastName, telephone } = response.data
                    setFirstName(`${firstName || "Не привязан"}`)
                    setLastName(`${lastName || "Не привязан"}`)
                    setTelephone(`${telephone || "Не привязан"}`)
                    router.reload()
                    setSuccessMessage("Данные успешно обновлены") // Устанавливаем сообщение об успешном обновлении данных
                })
                .catch(error => {
                    console.error('Ошибка загрузки данных пользователя:', error)
                })
        }
    }

    useEffect(() => {
        // Check if the user is logged in using client-side storage
        const isLoggedIn = localStorage.getItem("isLogged") === "true"
        const userEmailIn = localStorage.getItem("userEmail")!
        setIsLogged(isLoggedIn)
        setUserEmail(userEmailIn)

        axios.get(`/api/user?email=${userEmailIn}`) // Обновление данных пользователя с использованием актуального userEmailIn
            .then(response => {
                const { firstName, lastName, telephone } = response.data
                setFirstName(`${firstName ? firstName : "Нет данных"}`)
                setLastName(`${lastName ? lastName : "Нет данных"}`)
                setTelephone(`${telephone ? telephone : "Не привязан"}`)
            })
            .catch(error => {
                console.error('Ошибка загрузки данных пользователя:', error)
            })
    }, [isLogged, router, userEmail]) // Добавление userEmail в зависимости useEffect

    const handleExit = () => {
        localStorage.clear()
        setTimeout(() => {
            Router.reload()
        }, 500)
    }
    return (
        <div className="personal-account">
            <div className="account-info">
                {!isLogged ? (
                    <div>
                        Вы не авторизованы
                    </div>
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
                                        {/* <li><button className="reset-account" onClick={handleResetButtonClick}>Сбросить</button></li> */}
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
                                        <Input type="text" value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}>Имя</Input>
                                        <Input type="text" value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}>Фамилия</Input>
                                    </div>
                                    <div className="row-content">
                                        <Input type="email" value={userEmail} readOnly>Эл. почта *</Input>
                                        <Input type="tel" value={telephone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value)}>Телефон</Input>
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
