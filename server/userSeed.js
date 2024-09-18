import User from "./models/User.js"
import bcrypt from "bcrypt"
import connetToDatabase from "./db/db.js"

const userRegister = async () =>{
    connetToDatabase()
    try{
        const hashPassword = await bcrypt.hash("admin",10)
        const newUser = new User({
            name: "Admin",
            email:"admin@example.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch(error){

    }
}

userRegister(); 