// DEPENDECIES
import { useState } from "react"
import Link from "next/link"

// STYLES
import "@/styles/reset.css"
import "@/styles/main.css"

// UI
import Input from "@/components/UI/Input/input"
import Button from "@/components/UI/Button/button"

interface FormState {
    email: string
    password: string
}


export default function Login(): React.JSX.Element {
    const [isLogined, setIsLogined] = useState(false)
    const [email, setEmail] = useState("")


    return (
        <div className="page-static">
            <form className="form-body">
                <div className="form-container">
                    <div className="form-auth_label">Вспомнить пароль</div>
                    <div className="form-auth_inputs">
                        <Input onChange={(e: any) => setEmail(e.target.value)} type="email" value={email} required>Почта</Input>
                    </div>
                    <Button type="submit">Вспомнить</Button>
                    <h1>Нет аккаунта? <Link href="/signup">Зарегистрироваться</Link></h1>
                </div>
            </form>
        </div>
    )
}