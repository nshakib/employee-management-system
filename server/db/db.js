import mongoose from "mongoose";

const connetToDatabase = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.error(error);
    }
}

export default connetToDatabase