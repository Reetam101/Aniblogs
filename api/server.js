const express = require('express')
const dotenv = require('dotenv')
const postsRoute = require('./routes/postsRoute')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const cookieParser = require('cookie-parser')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const { sequelize } = require('./models')

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

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`)
    });
  })
  .catch((err) => {
    console.log(err);
  });
