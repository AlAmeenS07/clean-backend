
import mongoose from "mongoose";


export const connectDB = async () : Promise<void>=>{
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/mieten-rent-db");

        console.log("Mongodb connected on 27017")
        
    } catch (error : any) {
        console.log("Db connection failed" , error.messsage)
    }
}