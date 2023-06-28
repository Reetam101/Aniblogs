import express from 'express'
import dotenv from 'dotenv'
import postsRoute from './routes/postsRoute.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import cookieParser from "cookie-parser"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.use("/api/uploads", express.static('uploads'))
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postsRoute)
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})