import mongoose from "mongoose";
const dbconnection=async()=>{
    try {
        const dbConnection=await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected');
    } catch (error) {
        console.log('error in connection');
        console.log(error);
    }
}
export default dbconnection;