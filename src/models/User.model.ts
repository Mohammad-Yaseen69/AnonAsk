import mongoose, { Schema, Document } from "mongoose"

interface User extends Document {
    username: string,
    email: string,
    password: string,
    fullName: string;
    isReceivingFeedback: boolean;
    isVerified: boolean;
    
}   

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    isReceivingFeedback: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.models.User || mongoose.model<User>("User", UserSchema)

export default User