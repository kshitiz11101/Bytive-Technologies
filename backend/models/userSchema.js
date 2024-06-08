import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import validator from "validator";
const userSchema=new mongoose.Schema({
    name: { type: String, required: [true, "Name is Required!"] },
    email: { type: String, required: [true, "Email is Required!"],unique:true, validate:validator.isEmail},
    password:{type: String,required:[true, "Password is Required!"],minlength: [6, "Password length should be greater than 6 character"],select:true},
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

userSchema.methods.createJWT=async function(){
    return JWT.sign({userId:this.id},process.env.JWT_SECRET_KEY,{
        expiresIn:"1d"
    });
};
const User=mongoose.model('users',userSchema);
export default User;