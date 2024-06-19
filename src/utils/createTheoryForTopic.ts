import { pool } from './db'

interface TheoryData {
	topicid: number
	name: string
	description: string
	videoUrl?: string
}

export async function createTheoryForTopic({ topicid, name, description, videoUrl }: TheoryData) {
	const client = await pool.connect()
	try {
		const result = await client.query(
			'INSERT INTO lessons (name, description, topicid, youtube_url) VALUES ($1, $2, $3, $4) RETURNING *',
			[name, description, topicid, videoUrl || null] as any
		)

		return result.rows[0]
	} finally {
		client.release()
	}
}
