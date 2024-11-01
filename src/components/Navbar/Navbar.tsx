import Link from "next/link"
import { useState } from "react"

// STYLES
import "@/styles/reset.css"
import "./Navbar.css"
import { useAuth } from "@/providers/AuthContext"

export default function Navbar(): React.JSX.Element {
    const [isAdmin, setIsAdmin] = useState(false)
    const { isLogged } = useAuth()

    return (
        <div className='navbar'>
            <div className='navbar-logotype'>TL COACH</div>
            <ul>
                <li><Link href="/home">Главная</Link></li>
                <li><Link href="/about-us">О нас</Link></li>
                <li><Link href="/tasks">Задачи</Link></li>
                <li><Link href="/check-formula">Проверить формулу</Link></li>
                <li><Link href="/feedbacks">Отзывы</Link></li>
                <li><Link href="/contacts">Контакты</Link></li>
                {isLogged
                    ? <li><Link href="/dashboard">Личный кабинет</Link></li>
                    : <li><Link href="/signin">Войти</Link></li>
                }
                {isAdmin && <li><Link href="/admin-panel">Админ панель</Link></li>}
            </ul>
        </div>
    )
}
