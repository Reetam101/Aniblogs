import express from 'express'
import { getPosts, addPost, getSinglePost, updatePost, deletePost, getLatestPosts, getAllCategories, setCategories } from '../controllers/postsController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/multerMiddleware.js'
const router = express.Router()

router.route("/")
  .get(getPosts)
  .post(protect, upload.single('file'), addPost)
router.route("/latest").get(protect, getLatestPosts)
router.route("/all-categories").get(protect, getAllCategories)
router.route("/set-category").post(protect, setCategories)
// router.route("/get-post-id").get(protect, getPostId)
router.route("/:id")
  .get(getSinglePost)
  .put(protect, upload.single('file'), updatePost)
  .delete(protect, deletePost)

export default router