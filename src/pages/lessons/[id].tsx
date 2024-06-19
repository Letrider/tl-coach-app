import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import './lessons-theory.css'

const LessonPage: React.FC = () => {
    const router = useRouter()
    const { id } = router.query
    const [lesson, setLesson] = useState<any[]>([])

    useEffect(() => {
        if (id) {
            axios.get(`/api/lessons/${id}`)
                .then(response => {
                    setLesson(response.data)
                    console.log(response.data, 'data')
                })
                .catch(error => {
                    console.error('Ошибка при загрузке урока:', error)
                })
        }
    }, [id])

    if (!lesson) {
        return <div>Загрузка...</div>
    }

    return (
        <div className="theory-lesson">
            {lesson.map((lesson: any, index: number) => (
                <div key={index} className="lesson">
                    <h2>Урок {lesson.id}.</h2>
                    <h3>{lesson.name}</h3>
                    <p><strong>Цель урока:</strong></p>
                    <div className="content-lesson">
                        {lesson.description}
                    </div>
                </div>
            ))}
            {/* {
                lesson ?

                    lesson.map((lesson: any, index: number) => {
                        return (
                            <div>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${lesson.youtube_url}`}
                                    title="YouTube video player"
                                    allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )

                    })
                    : null
            } */}
        </div>
    )
}

export default LessonPage
