const { Post, Tag, PostTag, User } = require('../models')

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Tag,
          through: {
            model: PostTag,
            attributes: [] // Exclude join table attributes from the result
          }
        }
      ]
    });
    return res.status(200).json({ data: posts, message: 'success' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}

const getSinglePost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findOne({
      where: { post_id: id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] }
        },
        {
          model: Tag,
          through: {
            model: PostTag,
            attributes: [] // Exclude join table attributes from the result
          }
        }
      ]
    })

    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json(error.message)
  }

}

const getLatestPosts = (req, res) => {
  return res.send('getLatestPosts')
}

const addPost = async (req, res) => {
  const { title, content } = req.body
  // console.log(userId)
  try {
    const post = await Post.create({
      title,
      content,
      "userId": req.user.user_id,
      "image": req.file.path
    })
    console.log(post)
    const tags = JSON.parse(req.body.tags)
    // console.log(typeof tags)
    const tagIds = tags.map(tag => tag.value)
    const fetched_tags = await Tag.findAll({
      where: {
        tag_id: tagIds,
      },
    });
    await post.addTags(fetched_tags);
    return res.status(201).json({ data: post, message: 'Post created successfully' })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

const updatePost = (req, res) => {
  // update post
  return res.send('updated')
}

const deletePost = (req, res) => {
  return res.send('delete')

}

const getAllCategories = (req, res) => {
  return res.send('get all categories')
}

const setCategories = (req, res) => {
  return res.send('set categories')
}

module.exports = {
  getPosts,
  getSinglePost,
  getLatestPosts,
  addPost,
  updatePost,
  deletePost,
  getAllCategories,
  getLatestPosts,
  setCategories
}