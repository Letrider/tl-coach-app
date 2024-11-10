import mongoose, { Document, Schema } from 'mongoose'

interface UserSchema extends Document {
    name: string
    lastName: string
    email: string
    telephone: string
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true }
})

const UserModel = mongoose.model<UserSchema>('User', userSchema)

export default UserModel