import multer from 'multer'
import { db } from '../config/db.js'
import { v4 as uuidv4 } from 'uuid';


export const getPosts = (req, res) => {

  // const q = req.query.cat ? `SELECT p.post_id, p.title, p.desc, p.date, p.img, c.category_name FROM posts p JOIN categories c ON p.cat_id = c.cat_id WHERE c.category_name = ?` : `SELECT p.post_id, p.title, p.desc, p.date, p.img, c.category_name  FROM posts p JOIN post_categories pc ON p.post_id = pc.p_id JOIN categories c ON pc.c_id = c.cat_id`

  const q = req.query.cat ? `SELECT * FROM posts WHERE category = ?` : `SELECT * FROM posts`


  db.query(q, [req.query.cat], (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    }
    return res.status(200).json(data)
  })
}

export const getSinglePost = (req, res) => {
  // const q = `SELECT u.id, u.username, u.img AS user_img, p.post_id, p.title, p.desc, p.img AS post_img, p.date, c.category_name FROM users u JOIN posts p ON u.id = p.user_id JOIN post_categories pc ON p.post_id = pc.p_id JOIN categories c ON pc.c_id = c.cat_id WHERE p.post_id = ?`
  const q = `SELECT u.id, u.username, u.img AS user_img, p.post_id, p.title, p.desc, p.img AS post_img, p.date, p.category FROM users u JOIN posts p ON u.id = p.user_id WHERE p.post_id = ?`

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.status(200).json(data)
  })

}

export const getLatestPosts = (req, res) => {
  const q = `SELECT * FROM posts WHERE category = ?`
  console.log(req.body.category)
  db.query(q, [req.body.category], (err, data) => {
    if (err) {
      console.log(err)
      throw new Error(err)
    }
    console.log("similar: " + data)
    return res.status(200).json(data)
  })
}

export const addPost = (req, res) => {
  // const q = `INSERT INTO posts(post_id, title, desc, img, date, user_id) VALUES (?)`
  const q = 'INSERT INTO posts(`title`, `desc`, `img`, `date`, `user_id`, `category`) VALUES (?, ?, ?, ?, ?, ?)'
  console.log(req.user.id)
  console.log("filename: " + req.file)
  const values = [
    req.body.title,
    req.body.desc,
    req.file.path,
    req.body.date,
    req.user.id,
    req.body.category
  ]
  console.log(values)

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err)
    }
    console.log("result data: ", data)
    return res.status(201).json("Post created")
  })

  // const q2 = "INSERT INTO post_categories(``)"
  // db.query()
}

export const updatePost = (req, res) => {
  // update post

}

export const deletePost = (req, res) => {
  const postId = req.params.id
  console.log(req.user.id)
  const q = "DELETE FROM posts WHERE post_id = ? AND user_id = ?"

  db.query(q, [postId, req.user.id], (err, data) => {
    if (err) {
      console.log(err)
      return res.status(403).json("You can't delete this post")
    }

    return res.json("Post deleted successfully")
  })

}

export const getAllCategories = (req, res) => {
  const q = 'SELECT * FROM categories'

  db.query(q, (err, data) => {
    if (err) {
      console.log(err)
      res.json(err)
    }
    // console.log(data)
    return res.status(200).json(data)
  })
}

export const setCategories = (req, res) => {
  const q = 'INSERT INTO post_categories(`p_id`, `c_id`) VALUES(?, ?)'
  const category = req.body.category
  for (let i = 0; i < category.length; i++) {
    // console.log(category[i].value)
    db.query(q, [])
  }
}

// export const getPostId = (req, res) => {
//   const q = `SELECT post_id FROM posts WHERE title = ?`

//   db.query(q, [req.body.title], (err, data) => {
//     if (err) {
//       console.log(err)
//       res.status(500).json(err)
//     }
//     console.log("post_id ", data)
//     return res.status(200).json(data)
//   })
// }