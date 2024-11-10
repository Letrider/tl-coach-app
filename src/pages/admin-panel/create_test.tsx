// pages/create/create_lesson.tsx
import CreateLessonForm from '@/components/CreateLessonForm/CreateLessonForm'
import { ITopic } from '@/interfaces/ITopic'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CreateLesson = () => {
  const router = useRouter()
  const { topicId } = router.query
  const [topic, setTopic] = useState<ITopic | null>(null)

  useEffect(() => {
    if (topicId) {
      axios.get(`/api/lesson?id=${topicId}`).then((response: AxiosResponse<any, any>) => {
        setTopic(response.data)
        console.log(response.data)
      })
    }
  }, [topicId])

  const handleCreateLesson = async (lessonData: any) => {
    try {
      const response = await axios.post('/api/lessons/create', lessonData)
      console.log(response, 'ответ в CreateLesson')
    } catch (error) {
      console.error('Не удалось создать урок:', error)
    }
  }

  if (!topic) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Создание теста для темы: {topic.title}</h1>
      <CreateLessonForm onSubmit={handleCreateLesson} />
    </div>
  )
}

export default CreateLesson
