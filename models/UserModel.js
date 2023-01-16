import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('User', userSchema);
export default User;