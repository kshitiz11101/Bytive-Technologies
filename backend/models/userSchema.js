import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema=new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:{type: String,required:true},
    phone: { type: String, required: true },
    website: { type: String, required: true },
   
});
userSchema.pre("save", async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  };
const User=mongoose.model('users',userSchema);
export default User;