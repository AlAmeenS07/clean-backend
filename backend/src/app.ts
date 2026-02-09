import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { connectDB } from "./config/db"
import authRoutes from "./routes/authRoutes"
import vehicleRoutes from "./routes/vehicleRoutes"
import cookieParser from "cookie-parser"
import { startRentalExpiryJob } from "./Jobs/rentalExpiryJob"


const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

connectDB()

startRentalExpiryJob()

app.get("/" , (req , res)=>{
    res.send("Hello !")
})

app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/vehicles" , vehicleRoutes)

app.listen(port , ()=>{
    console.log(`Server running on port http://localhost:${port}`)
})
