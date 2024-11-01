import { Lesson } from '@/interfaces/ILesson'

interface LessonsListProps {
	lessons: Lesson[]
}

const LessonsList: React.FC<LessonsListProps> = ({ lessons }) => {
	return (
		<div>
			{lessons.map((lesson) => (
				<div key={lesson.id}>
					<h2>{lesson.title}</h2>
					<p>{lesson.description}</p>
					{lesson.videoUrl && (
						<div>
							<h3>Видео урок</h3>
							<a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
								{lesson.videoUrl}
							</a>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default LessonsList
