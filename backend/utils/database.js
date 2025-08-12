import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Successfully Connected");
        
    } catch (error) {
        console.log(error)
        
    }
}
export default dbConnection