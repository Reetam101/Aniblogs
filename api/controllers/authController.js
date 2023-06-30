import { db } from '../config/db.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const registerUser = (req, res) => {
  // check if user already exists
  if (req.body.username && req.body.email && req.body.password) {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) {
        return res.status(400).json(err)
      }
      if (data.length) {
        return res.status(409).json("User already exists")
      }

      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)

      const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
      const values = [
        req.body.username,
        req.body.email,
        hashedPassword
      ]

      db.query(q, [values], (err, data) => {
        if (err) return res.status(400).json(err)
        return res.status(201).json("User registered successfully!")
      })
    })
  } else {
    return res.status(400).json("Please fill all the fields")
  }
}

export const loginUser = (req, res) => {
  // const { username, password} = req.body

  if (!req.body.username || !req.body.password) {
    return res.status(400).json("Please fill out all the fields")
    // throw new Error()
  }
  else {
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
      if (err) {
        return res.status(400).json(err)
        // console.log(err)
        // throw new Error(err)
      }
      if (data.length === 0) {
        return res.status(404).json("User not found")
        // throw new Error("User not found")
      }

      const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

      if (!isPasswordCorrect) {
        return res.status(401).json("Wrong username or password")
        // throw new Error("Wrong username or password")
      }
      const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET)
      const { password, ...other } = data[0]
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000
      }).status(200).json(other)
    })
  }

}

export const logoutUser = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User logged out successfully")
}