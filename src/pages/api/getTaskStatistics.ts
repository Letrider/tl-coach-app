import { getUserTasks } from '@/utils/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query

    if (email === 'undefined') {
        return res.status(500).json({ error: "ID undefined" })
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Не указан ID пользователя" })
    }

    try {
        const tasks = await getUserTasks(email)
        console.log(tasks, "tasks")

        const taskStatistics = {
            excellent: tasks?.filter((task) => task.results === "Отлично").length,
            good: tasks?.filter((task) => task.results === "Хорошо").length,
            satisfactory: tasks?.filter((task) => task.results === "Удовлетворительно").length,
            unsatisfactory: tasks?.filter((task) => task.results === "Неудовлетворительно").length,
        }

        res.json(taskStatistics)
    } catch (error) {
        console.error("Ошибка при получении данных из базы данных:", error)
        res.status(500).json({ error: "Ошибка при получении данных из базы данных" })
    }
}
