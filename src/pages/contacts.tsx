import axios from 'axios'
import React, { useState } from "react"

// STYLES
import "@/styles/main.css"
import "@/styles/reset.css"

export default function Contacts(): React.JSX.Element {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        message: '',
    })
    const [submitSuccess, setSubmitSuccess] = useState(false) // Состояние для отображения успешной отправки
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Создаем новый объект с данными для запроса
        const requestData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            subject: formData.subject,
            message: formData.message,
        }

        try {
            const response = await axios.post('/api/contact', requestData) // Отправляем форму на backend
            setSubmitSuccess(true) // Устанавливаем состояние успешной отправки
        } catch (error) {
            console.error('[Contacts] Ошибка отправки на почту: ', error)
        }
    }

    return (
        <div className="contacts">
            <div className="contacts-container">
                <div className="content_header">
                    <h1>СВЯЖИТЕСЬ С НАМИ</h1>
                    <div className="contacts-info">
                        <p>TLcoach@mail.ru</p>
                        <p>8(917)219-62-38</p>
                        <p>Instagram: @TLcoach</p>
                        <p>TikTok: @TLcoach</p>
                        <p>ВКонтакте: @TLcoach</p>
                    </div>
                </div>
                <form className="forma" onSubmit={handleSubmit}>
                    {submitSuccess ? (
                        <span style={{ color: "green", fontFamily: "Play", fontSize: "32px" }}>Письмо успешно отправлено!</span>
                    ) : (
                        <>
                                            <div className="row">
                        <div className="column">
                            <h3>Имя *</h3>
                            <div className="row_border"><input type="text" value={formData.name} name="name" placeholder="Введите свое имя" onChange={handleChange} required /></div>
                        </div>
                        <div className="column">
                            <h3>Эл. почта *</h3>
                            <div className="row_border"><input type="text" value={formData.email} name="email" placeholder="Добавьте эл. почту" onChange={handleChange} required /></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <h3>Телефон *</h3>
                            <div className="row_border"><input type="text" value={formData.phone} name="phone" placeholder="Добавьте номер телефона" onChange={handleChange} required /></div>
                        </div>
                        <div className="column">
                            <h3>Адрес</h3>
                            <div className="row_border"><input type="text" value={formData.address} name="address" placeholder="Добавьте адрес" onChange={handleChange} required /></div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="column">
                            <h3>Тема сообщения *</h3>
                            <div className="column_border"><input type="text" value={formData.subject} name="subject" placeholder="Укажите тему" onChange={handleChange} required /></div>
                        </div>
                        <div className="column">
                            <h3>Сообщение *</h3>
                            <div className="column_message"><input value={formData.message} name="message" placeholder="Добавьте сообщение..." onChange={handleChange} required /></div>
                        </div>
                    </div>
                    <div className="button"><button type="submit">Отправить</button></div>
                        </>
                    ) }
                </form>
            </div>
        </div>
    )
}
