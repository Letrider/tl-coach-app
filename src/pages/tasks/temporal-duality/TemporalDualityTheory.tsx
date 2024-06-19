import { TemporalDualityIdentities_Theory } from '@/constants/data'
import React from 'react'
import "./TemporalDualityTheory.css"

const TheoryLesson: React.FC = () => {
  return (
    <div className="theory-lesson">
      {TemporalDualityIdentities_Theory.map((lesson: any, index: number) => (
        <div key={index} className="lesson">
          <h2>Урок {lesson.lessonNumber}.</h2>
          <h3>{lesson.title}</h3>
          <p><strong>Цель урока:</strong> {lesson.objective}</p>
          <div className="content-lesson">
            {lesson.content.map((paragraph: any, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {/* <div className="video">
            <YouTubeVideo videoId={lesson.videoId} /> 
          </div> */}
        </div>
      ))}
    </div>
  )
}

export default TheoryLesson
