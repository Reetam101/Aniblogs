const express = require('express')
// import { getPosts, addPost, getSinglePost, updatePost, deletePost, getLatestPosts, getAllCategories, setCategories } from '../controllers/postsController.js'
// import { protect } from '../middleware/authMiddleware.js'
// import { upload } from '../middleware/multerMiddleware.js'
const { getPosts, addPost, getSinglePost, updatePost, deletePost, getLatestPosts,
  getAllCategories, setCategories } = require('../controllers/postsController')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/multerMiddleware')
const router = express.Router()

router.route("/")
  .get(getPosts)
  .post(protect, upload.single('file'), addPost)
router.route("/latest").get(protect, getLatestPosts)
router.route("/all-categories").get(protect, getAllCategories)
router.route("/set-category").post(protect, setCategories)
router.route("/:id")
  .get(getSinglePost)
  .put(protect, upload.single('file'), updatePost)
  .delete(protect, deletePost)

module.exports = router;