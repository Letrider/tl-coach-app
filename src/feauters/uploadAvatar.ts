import axios from 'axios'

export const uploadAvatar = (file: File) => {
	const formData = new FormData()
	formData.append('avatar', file, file.name) // Правильно указываем имя поля файла

	console.log('Отправка данных на сервер:', formData, file, file.name)

	axios.post('/api/upload', formData)

		.then(response => {
			console.log('Успешная загрузка аватара:', response.data)
		})
		.catch(error => {
			console.error('Ошибка загрузки аватара:', error)
		})
		.finally(() => {
			console.log('Запрос завершен')
		})
}