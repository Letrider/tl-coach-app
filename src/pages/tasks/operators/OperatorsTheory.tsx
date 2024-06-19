import YouTubeVideo from '@/components/YoutubeVideo/YoutubeVideo'
import { TemporalOperators_Theory } from '@/constants/data'
import Image from 'next/image'
import React from 'react'
import "./OperatorsTheory.css"

const TemporalOperators: React.FC = () => {
  return (
    <div className="theory-lesson">
      {TemporalOperators_Theory.map((lesson: any, index: number) => (
        <div key={index} className="lesson">
          <h2>Урок {lesson.lessonNumber}.</h2>
          <h3>{lesson.title}</h3>
          <p><strong>Цель урока:</strong> {lesson.objective}</p>
          <div className="content-lesson">
            {lesson.content.map((paragraph: any, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
            <Image src="/images/Operators.png" alt="operators" />
          </div>
          <div className="video">
            <YouTubeVideo videoId={lesson.videoId} /> {/* Передайте videoId компоненту YouTubeVideo */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TemporalOperators
