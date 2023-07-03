// import { db } from '../config/db.js'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const duplicate = await User.findOne({ where: { name } })
  if (duplicate) {
    return res.status(409).json({ message: 'User already exists' })
  }
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = await User.create({
    name,
    email,
    "password": hashedPassword
  })
  if (user) {
    res.status(201).json({ message: `New user ${name} created` })
  } else {
    res.status(400).json({ message: 'Invalid user data recieved' })
  }
}


const loginUser = async (req, res) => {
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).json("Please fill out all the fields")
  }
  try {
    const user = await User.findOne({
      where: { name }
    })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    // console.log(user)
    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Wrong username or password' })
    }
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET)
    const plainUser = user.get({ plain: true })
    delete plainUser['password']
    // console.log(plainUser)
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000
    }).status(200).json(plainUser)
  } catch (error) {
    return res.status(500).json(error)
  }

}

const logoutUser = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json({ message: "User logged out successfully" })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}