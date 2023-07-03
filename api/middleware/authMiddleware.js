const jwt = require('jsonwebtoken')
const { User } = require('../models')

const protect = async (req, res, next) => {
  let token
  token = req.cookies.access_token
  // console.log(token)
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded)
      const user = await User.findOne({ where: { user_id: decoded.id } })
      const plainUser = user.get({ plain: true })
      delete plainUser.password
      req.user = plainUser
      next()
    } catch (error) {
      console.log(error)
      return res.status(400).json(error.message)
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}

module.exports = { protect }