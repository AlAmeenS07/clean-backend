
import express from "express"
import { connectDB } from "./config/db"
import authRoutes from "./routes/authRoutes"

const app = express()

app.use(express.json())

connectDB()

app.get("/" , (req , res)=>{
    res.send("Hello !")
})

app.use("/api/v1/auth" , authRoutes)

app.listen(5000 , ()=>{
    console.log(`Server running on port http://localhost:5000`)
})
