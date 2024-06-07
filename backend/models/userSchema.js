import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    likes: { type: Number, default: 0 }
});

const User=mongoose.model('users',userSchema);
export default User;