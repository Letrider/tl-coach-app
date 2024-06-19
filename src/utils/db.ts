import pg from "pg"

interface User {
  id?: number
  firstName?: string
  lastName?: string
  telephone?: string
  email?: string
}

export const pool = new pg.Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5433,
  database: "tl_coach",
})


export async function query(text: string, params?: any[]) {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start

  console.log('[PG]: Запрос выполнен', 
    {  
        text, 
        duration, 
        rows: res.rowCount 
    }
  )
    
  return res
} 

export async function getUserFullName(userId: number): Promise<string | null> {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT name, lastname FROM users WHERE id = $1', [userId])
    client.release()
    
    if (result.rows.length > 0) {
      const { first_name, last_name } = result.rows[0]
      return `${first_name} ${last_name}`
    } 
    
    else {
      return null
    }

  } catch (error) {
    console.error('[PG]: Error fetching user full name:', error)
    return null
  }
}

export async function getUserByEmail(email: string) {
  const client = await pool.connect()

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      // Если результат пустой, возвращаем null или сообщение об ошибке
      return null
    }
    const { name, lastname, telephone } = result.rows[0]
    return { name, lastname, telephone, email }
  } finally {
    client.release()
  }
}

export async function updateUserByEmail(
  email: string,
  updatedUserData: any
): Promise<User | null> {
  try {
    const client = await pool.connect()

    const { firstName, lastName, telephone } = updatedUserData

    // Формируем SQL-запрос для обновления данных пользователя
    const query = `
      UPDATE users
      SET 
        name = $1,
        lastname = $2,
        telephone = $3
      WHERE email = $4
      RETURNING *
    `

    // Выполняем запрос с использованием подготовленного выражения
    const result = await client.query(query, [
      firstName,
      lastName,
      telephone,
      email,
    ])

    client.release()

    // Проверяем, были ли обновлены данные пользователя
    if (result.rows.length === 0) {
      console.error('Пользователь не найден')
      return null
    }

    // Возвращаем обновленного пользователя
    const { name, lastname, telephone: userTelephone } = result.rows[0]
    return { firstName: name, lastName: lastname, telephone: userTelephone }
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error)
    return null
  }
}

export async function getUserTasks(email: string) {
  try {
    const client = await pool.connect()

    // Формируем SQL-запрос для получения заданий пользователя
    const query = `
      SELECT id, name, description, deadline, created_at, updated_at, results, email
      FROM tasks
      WHERE email = $1
    `

    // Выполняем запрос с использованием подготовленного выражения
    const result = await client.query(query, [email])

    client.release()

    // Возвращаем массив заданий пользователя
    return result.rows
  } catch (error) {
    console.error('Ошибка при получении заданий пользователя:', error)
    return null
  }
}
