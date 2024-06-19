import "@/styles/main.css"
import "@/styles/reset.css"
import axios from 'axios'
import Image from 'next/image'
import Link from "next/link"
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"

export default function Boolean(): React.JSX.Element {
    const [lessons, setLessons] = useState<any[]>([])
    const [tests, setTests] = useState<any>([])

    const router = useRouter()
    const TOPIC_ID = 2

    useEffect(() => {
        axios.get(`/api/lessons?id=${TOPIC_ID}`)
            .then(response => {
                setLessons(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error('Ошибка при загрузке уроков:', error)
            })
    }, [])

    const handleLessonClick = (lessonId: number) => {
        router.push(`/lessons/${lessonId}`)
    }

    useEffect(() => {
        axios.get(`/api/tests?id=${TOPIC_ID}`)
            .then(response => {
                setTests(response.data)
                console.log(response.data, 'tests')
            })
            .catch(error => {
                console.error('Ошибка при загрузке тестов:', error)
            })
    }, [])

    const handleTestClick = (testId: number) => {
        router.push(`/tests/${testId}`)
    }

    return (
        <div className="container-true_false">
            <div className="container">
                <div className="content-true_false">
                    <h1>ГРАММАТИКА</h1>
                    <div className="content-theory">
                        <Image src="/images/ikonki/059puzzle_101543.svg" width={1000} height={1000} alt="PUZZLE" />
                        <div>Теория</div>
                    </div>
                    <div className="content-practice-lessons">
                        <div><Link href="./grammar/GrammarTheory">Урок №1</Link></div>
                        {lessons.map((lesson: any) => (
                            <div key={lesson.id} onClick={() => handleLessonClick(lesson.id)}>
                                <a>{lesson.name}</a>
                            </div>
                        ))}
                    </div>
                    <div className="line"></div>
                    <div className="content-practice">
                        <Image src="/images/ikonki/022write_101538.svg" width={1000} height={1000} alt="WRITE" />
                        <div>Практика</div>
                    </div>
                    <div className="content-practice-lessons">
                        <div><Link href="/grammar/GrammarTest">Пройти тест</Link></div>
                        {tests.map((test: any) => (
                            <div style={{ cursor: 'pointer' }} key={test.id} onClick={() => handleTestClick(test.id)}>
                                <a>{test.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
