"use client"
import { useAuth } from "@/providers/AuthContext"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

import Link from "next/link"

import "@/styles/main.css"
import "@/styles/reset.css"

import Button from "@/components/UI/Button/button"
import Input from "@/components/UI/Input/input"
import axios from 'axios'


export default function Login(): React.JSX.Element {
    const { isLogged, setIsLogged } = useAuth()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string>("")
    const router = useRouter()


    const handler = async (e: any) => {
        e.preventDefault()
        if (!email || !password) {
            setError("Введите email и пароль")
            return
        }
        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                setIsLogged(true)
                localStorage.setItem("isLogged", JSON.stringify(isLogged))
                localStorage.setItem("userEmail", email)  // Сохраняем email при успешном входе
                router.push("/dashboard")
                setTimeout(() => {
                    router.reload()
                })

            } else {
                throw new Error("Ошибка при авторизации")
            }

        } catch (error) {
            console.error(error)
            setError("Неверный email или пароль")
        }
    }

    useEffect(() => {
        if (isLogged) {
            localStorage.setItem("isLogged", JSON.stringify(isLogged))
        }
    }, [isLogged])

    return (
        <div className="page-static">
            <form className="form-body" onSubmit={handler}>
                <div className="form-container">
                    <div className="form-auth_label">Авторизация</div>
                    <div className="form-auth_inputs">
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            required
                        >Почта</Input>

                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            required
                        >Пароль</Input>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <Button type="submit">Войти</Button>
                    <h1>Нет аккаунта? <Link href="/signup">Зарегистрироваться</Link></h1>
                </div>
            </form>
        </div>
    )
}
