import Link from "next/link"
import { useEffect, useState } from "react"

// STYLES
import "@/styles/reset.css"
import styles from "./navbar.module.css"

export default function Navbar(): React.JSX.Element {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isLoggedIn = localStorage.getItem("isLogged") === "true"
            setIsLogged(isLoggedIn)
        }
    }, [isLogged])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdmin = localStorage.getItem('userEmail') === "dyachkovalk@mail.ru"
            setIsAdmin(isAdmin)
        }
    }, [isAdmin])

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>TL COACH</div>
            <ul>
                <li><Link href="/home">Главная</Link></li>
                <li><Link href="/about-us">О нас</Link></li>
                <li><Link href="/tasks">Задачи</Link></li>
                <li><Link href="/check-formula">Проверить формулу</Link></li>
                <li><Link href="/feedbacks">Отзывы</Link></li>
                <li><Link href="/contacts">Контакты</Link></li>
                {isLogged
                    ? (
                        <>
                            <li><Link href="/dashboard">Личный кабинет</Link></li>
                        </>
                    )
                    : <li><Link href="/signin">Войти</Link></li>
                }
                {isAdmin
                    ? (
                        <li><Link href="/admin-panel">Админ панель</Link></li>
                    )
                    : null
                }
            </ul>
        </div>
    )
}
