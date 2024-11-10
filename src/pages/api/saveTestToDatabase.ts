import { ITopic } from '@/interfaces/ITopic'
import { pool } from '@/utils/db'

export async function saveTopicToDatabase(topicData: ITopic): Promise<ITopic> {
	const client = await pool.connect()
	try {
		const { title, description } = topicData
		const query = 'INSERT INTO topics (title, description) VALUES ($1, $2) RETURNING *'
		const values = [title, description]
		const result = await client.query(query, values)
		return result.rows[0]
	} finally {
		client.release()
	}
}