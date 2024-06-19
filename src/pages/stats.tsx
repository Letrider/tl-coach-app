import UserDataUploader from "@/components/UserDataUploader/UserDataUploader"
import axios from 'axios'
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import "@/styles/main.css"
import "@/styles/reset.css"

import Link from 'next/link'

export default function Stats(): React.JSX.Element {
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [userEmail, setUserEmail] = useState<string>("")
    const [taskStatistics, setTaskStatistics] = useState<{
        excellent: number
        good: number
        satisfactory: number
        unsatisfactory: number
    } | null>(null)
    const router = useRouter()

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLogged") === "true"
        const userEmailIn = localStorage.getItem("userEmail")!
        setIsLogged(isLoggedIn)
        setUserEmail(userEmailIn)

        if (!isLoggedIn) {
            router.push("/signin")
        }
    }, [router])

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchTaskStatistics(userEmail)
            } catch (error) {
                console.error("Ошибка при получении ID пользователя:", error)
            }
        }

        if (userEmail) {
            fetchData()
        }
    }, [userEmail])

    const fetchTaskStatistics = async (email: string) => {
        try {
            const response = await axios.get(`/api/getTaskStatistics?email=${email}`)
            const taskStats = response.data
            setTaskStatistics(taskStats)
        } catch (error) {
            console.error("Ошибка при получении статистики заданий:", error)
        }
    }

    return (
        <div className="personal-account">
            <div className="account-info">
                {!isLogged ? (
                    <div className="account-info_header">Вы не авторизованы</div>
                ) : (
                    <>
                        <div className="account-info_header">
                            <UserDataUploader isLogged={isLogged} />
                        </div>
                        <div className="account-info_main">
                            <div className="account-info_main-content">
                                <div className="account-info_main-content_header">
                                    <h1>Моя статистика</h1>
                                    <Link href="/dashboard"><button className="update-account">Назад</button></Link>
                                </div>
                                <div className="line"></div>
                                <div className='stats'>
                                    {/* <div className="diagram"></div> */}
                                    {taskStatistics && (
                                        <span className="test-stats">
                                            Задания, выполненные на &quot;отлично&quot; - {taskStatistics.excellent}%
                                            <br />
                                            Задания, выполненные на &quot;хорошо&quot; - {taskStatistics.good}%
                                            <br />
                                            Задания, выполненные на &quot;удовлетворительно&quot; - {taskStatistics.satisfactory}%
                                            <br />
                                            Задания, выполненные на &quot;неудовлетворительно&quot; - {taskStatistics.unsatisfactory}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
