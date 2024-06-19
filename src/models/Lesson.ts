import mongoose, { Schema } from 'mongoose'

const LessonSchema = new Schema({
  id: String,
  title: String,
  content: String,
})

export default mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema)
