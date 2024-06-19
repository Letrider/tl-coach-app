'use client'

import TopicSelector from '@/components/TopicSelector/TopicSelector'
import { Topic } from '@/interfaces/ITopic'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'



const AdminPanel: NextPage = () => {
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

	return (
		<div className='admin-panel-static'>
			<div className='admin-panel-content'>
				<div className='admin-panel-content_header'>
					<h1>Админ панель</h1>
					<TopicSelector onSelect={setSelectedTopic} />
				</div>
				{selectedTopic && (
					<motion.div
						initial={{ opacity: 0, transform: 'translate(100%)' }}
						animate={{ opacity: 1, transform: 'none' }}
						transition={{ duration: 0.8 }}
						className='admin-panel-content_create-buttons'
					>
						<Link
							className='admin-panel-content_create-button'
							href={`/admin-panel/create_test/${selectedTopic.id}`}
						>
							Создать тест
						</Link>
						<Link
							className='admin-panel-content_create-button'
							href={`/admin-panel/create_theory/${selectedTopic.id}`}
						>
							Создать урок
						</Link>
					</motion.div>
				)}
			</div>
		</div>
	)
}

export default AdminPanel
