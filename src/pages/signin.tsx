"use client"
import { ChangeEvent, useEffect, useState } from "react"
import axios from 'axios'
import { useAuth } from "@/providers/AuthContext"
import { useRouter } from "next/router"
import Link from "next/link"

// styles
import "@/styles/main.css"
import "@/styles/reset.css"

// components
import Button from "@/components/UI/Button/button"
import Input from "@/components/UI/Input/input"

export default function Login(): React.JSX.Element {
    const { isLogged, login } = useAuth()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const router = useRouter()

    if (isLogged) {
        router.push('/dashboard')
    }

    const handler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

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
                const { token } = response.data

                login()
                router.replace("/dashboard")
            } else {
                throw new Error("Ошибка при авторизации")
            }
        } catch (error) {
            console.error(error)
            setError("Неверный email или пароль")
        }
    }

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
                            autoComplete='email'
                            required
                        >Почта</Input>

                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            autoComplete='billing new-password'
                            required
                        >Пароль</Input>
                    </div>
                    {error && <p style={{ color: "red", marginTop: 0 }}>{error}</p>}
                    <Button type="submit">Войти</Button>
                    <h1>Нет аккаунта? <Link href="/signup">Зарегистрироваться</Link></h1>
                </div>
            </form>
        </div>
    )
}
