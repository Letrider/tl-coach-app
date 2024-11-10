import topics from '@/constants/data'
import { ITopic } from '@/interfaces/ITopic'
import { useState } from 'react'
import './TopicSelector.css'

interface TopicSelectorProps {
	onSelect: (topic: ITopic) => void
}

export default function TopicSelector({ onSelect }: TopicSelectorProps) {
	const [activeTopicId, setActiveTopicId] = useState<number | null>(null)

	const handleClick = (topic: ITopic) => {
		setActiveTopicId(topic.id)
		onSelect(topic)
	}

	return (
		<div className="topic-selector">
			<h2>Выберите тему</h2>
			<ul>
				{topics.map(topic => (
					<li
						key={topic.id}
						onClick={() => handleClick(topic)}
						className={activeTopicId === topic.id ? 'activeTopic' : ''}
					>
						{topic.title}
					</li>
				))}
			</ul>
		</div>
	)
}
