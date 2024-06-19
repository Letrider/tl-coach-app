import { pool } from '@/utils/db'

export async function saveLessonToDatabase(lessonData: any): Promise<any> {
	const client = await pool.connect()
	try {
		const { title, description, topicId } = lessonData
		const query = 'INSERT INTO lessons (title, description, topic_id) VALUES ($1, $2, $3) RETURNING *'
		const values = [title, description, topicId]
		const result = await client.query(query, values)
		return result.rows[0]
	} finally {
		client.release()
	}
}
