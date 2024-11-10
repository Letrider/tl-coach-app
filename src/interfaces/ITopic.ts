export interface ITopic {
	id: number
	title: string
	description: string
	tests: {
		question: string
		options: {
			text: string
			isCorrect: boolean
		}[]
	}[]
	theory: {
		lessonNumber: number
		title: string
		objective: string
		content: string[]
	}[]
}
