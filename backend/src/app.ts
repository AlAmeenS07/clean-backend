
import express from "express"
import { connectDB } from "./config/db"
import authRoutes from "./routes/authRoutes"
import vehicleRoutes from "./routes/vehicleRoutes"
import cookieParser from "cookie-parser"
import { startRentalExpiryJob } from "./Jobs/rentalExpiryJob"

const app = express()

app.use(express.json())
app.use(cookieParser())

connectDB()

startRentalExpiryJob()

app.get("/" , (req , res)=>{
    res.send("Hello !")
})

app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/vehicles" , vehicleRoutes)

app.listen(5000 , ()=>{
    console.log(`Server running on port http://localhost:5000`)
})
