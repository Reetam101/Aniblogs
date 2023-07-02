const express = require('express')
// import { loginUser, registerUser, logoutUser } from '../controllers/authController.js'
const {
  loginUser,
  registerUser,
  logoutUser
} = require('../controllers/authController')
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)

module.exports = router