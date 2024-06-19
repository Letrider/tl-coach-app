import Link from "next/link"
import { useState } from "react"

import "@/styles/main.css"
import "@/styles/reset.css"

import Button from "@/components/UI/Button/button"
import Input from "@/components/UI/Input/input"

interface FormState {
    email: string
    login: string
    name: string
    lastname: string
    password: string
    telephone: string
}

interface FormErrors {
    email: string
    login: string
    name: string
    lastname: string
    password: string
    telephone: string
}

export default function Register(): React.JSX.Element {
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const [formData, setFormData] = useState<FormState>({
        email: "",
        login: "",
        name: "",
        lastname: "",
        password: "",
        telephone: "",
    })
    
    const [formValidations, setFormValidations] = useState({
        isValidPhone: true,
        isValidEmail: true,
        isValidPassword: true,
    })

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: "",
        login: "",
        name: "",
        lastname: "",
        password: "",
        telephone: "",
    })

    const validatePhone = (phone: string): boolean => {
        const pattern = /^\+?[7-8](?:[0-9]?){10}$/
        return pattern.test(phone)
    }

    const validateEmail = (email: string): boolean => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return pattern.test(email)
    }

    const validatePassword = (password: string): boolean => {
        return password.length >= 6
    }

    const handleChange = (field: string, value: string) => {

        setFormData({ ...formData, [field]: value })

        switch (field) {
            case "telephone":
                const isValidPhone = validatePhone(value)
                setFormValidations({ ...formValidations, isValidPhone })
                setFormErrors({ ...formErrors, telephone: isValidPhone ? "" : "Неверный формат телефона" })
                break
            case "email":
                const isValidEmail = validateEmail(value)
                setFormValidations({ ...formValidations, isValidEmail })
                setFormErrors({ ...formErrors, email: isValidEmail ? "" : "Неверный формат электронной почты" })
                break
            case "password":
                const isValidPassword = validatePassword(value)
                setFormValidations({ ...formValidations, isValidPassword })
                setFormErrors({ ...formErrors, password: isValidPassword ? "" : "Пароль должен содержать не менее 6 символов" })
                break
            default:
                break
        }
    }

    const handler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isValidData =
            formValidations.isValidPhone &&
            formValidations.isValidEmail &&
            formValidations.isValidPassword

        if (!isValidData) {
            console.error("Форма заполнена неверно.")
            return
        }

        fetch('/api/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                login: formData.login,
                password: formData.password,
                name: formData.name,
                lastname: formData.lastname,
                telephone: formData.telephone,
            })
        })
        .then(response => {
            if (response.ok) {
                setRegistrationSuccess(true)
                return response.json()
            }
            throw new Error('Сетевая ошибка при попытке зарегистрироваться')
        })
        .then(data => {
            console.log('Регистрация успешна:', data)

        })
        .catch((error) => {
            console.error('Ошибка при регистрации:', error)
        })      
    }

    return (
        <div className="page-static">
            {
            registrationSuccess ? 
                (
                <form className="form-body">
                    <div className="success-container">
                        <div>
                            <h1>Вы успешно зарегистрировались </h1>
                            <i className="fas fa-check green"></i>
                        </div>
                        <Link href="/signin">Войти в аккаунт</Link>
                    </div>
                </form>            
                ) : (
                <form className="form-body" onSubmit={handler}>
                    <div className="form-container">
                        <div className="form-auth_label">Регистрация</div>
                        <div className="form-auth_inputs">
                            <div className="row-content">
                                <Input
                                    type="text"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value)}
                                    value={formData.name}
                                    required
                                >Имя</Input>

                                <Input
                                    type="text"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("lastname", e.target.value)}
                                    value={formData.lastname}
                                    required
                                >Фамилия</Input>
                            </div>
                            <Input
                                type="tel"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("telephone", e.target.value)}
                                value={formData.telephone}
                                error={formErrors.telephone}
                                required
                            >Телефон</Input>

                            <Input
                                type="text"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("login", e.target.value)}
                                value={formData.login}
                                error={formErrors.login}
                                required
                            >Логин</Input>

                            <Input
                                type="email"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
                                value={formData.email}
                                error={formErrors.email}
                                required
                            >Почта</Input>
                            
                            <Input
                                type="password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)}
                                value={formData.password}
                                error={formErrors.password}
                                required
                            >Пароль</Input>
                        </div>
                        <Button type="submit">Зарегистрироваться</Button>
                        <h1>Уже есть аккаунт? <Link href="/signin">Войти</Link></h1>
                    </div>
                </form>
            )}
        </div>
    )
}

