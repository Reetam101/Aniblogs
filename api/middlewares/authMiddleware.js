import jwt from 'jsonwebtoken'
import { db } from '../config/db.js'

const protect = (req, res, next) => {
  let token
  token = req.cookies.access_token
  console.log(token)
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)

    // req.user = await User.findById(decoded.userId).select("-password")
    const q = "SELECT `id`, `username`, `email`, `img` FROM users WHERE id = ?"
    db.query(q, [decoded.id], (err, data) => {
      if (err) {
        res.status(401)
        throw new Error('Not authorized, invalid token')
      }
      req.user = data[0]
      next()
    })
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}

export { protect }