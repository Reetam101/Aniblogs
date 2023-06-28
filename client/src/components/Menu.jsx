import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";

const Menu = ({ currPost }) => {
  const [posts, setPosts] = useState([])


  function mergeCategories(posts_) {
    const mergedPosts = [];
    const mergedMap = new Map();

    posts_.forEach(post => {
      if (mergedMap.has(post.post_id)) {
        const mergedPost = mergedMap.get(post.post_id);
        mergedPost.category_name = [mergedPost.category_name, post.category_name].join(",");
      } else {
        const mergedPost = { ...post };
        mergedMap.set(post.post_id, mergedPost);
        mergedPosts.push(mergedPost);
      }
    });

    return mergedPosts;
  }

  console.log(posts)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/posts/latest')
        const merged = mergeCategories(res.data).sort((a, b) => new Date(b.date) - new Date(a.date))
        const filtered_posts = merged.filter(post => post.post_id !== currPost)
        setPosts(filtered_posts)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [currPost])


  return (
    <Row>
      <h1 className="text-center">Latest Blogs</h1>
      {posts.map(post => (
        <Col lg={12} className="mt-5 d-flex flex-column align-items-center justify-content-center" key={post.id} style={{ gap: '10px' }}>
          <img style={{ width: '100%', height: '200px' }} className="rounded" src={`http://localhost:8000/api/${post.img}`} alt="" />
          <h6>{post.title}</h6>
          <Link to={`/post/${post.post_id}`}>
            <Button variant='primary' size="sm">Read more</Button>
          </Link>
        </Col>
      ))}
    </Row>
  )
}

export default Menu