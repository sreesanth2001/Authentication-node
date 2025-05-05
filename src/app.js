import express from "express"
import cookieParser from "cookie-parser"
import cors from  "cors"
import morgan from "morgan"
import authRoutes from "./routes/authRoutes.js"
import crypto from "crypto"

const app =express()

app.use(cors())
app.use(cookieParser())
app.use(morgan())
app.use(express.json())
app.use("/api/v1/auth",authRoutes)

//generate secretkey
 
const key = crypto.randomBytes(64).toString("hex")
 console.log(key)
app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})
// app.get("/sreesanth",(req,res)=>{
//     res.send("<h1>developer</h1>")
// })
// app.get("/express",(req,res)=>{
//     res.send("<h1>application framework</h1>")
// })
export default app