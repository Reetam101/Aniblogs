import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";

const Menu = ({ currPost, category }) => {
  const [posts, setPosts] = useState([])


  console.log(posts)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${category}`)
        // const merged = mergeCategories(res.data).sort((a, b) => new Date(b.date) - new Date(a.date))
        const filtered_posts = res.data.sort((a, b) => new Date(b.date) - new Date(a.date)).filter(post => post.post_id !== currPost)
        setPosts(filtered_posts)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
    console.log(posts)
  }, [category, currPost])


  return (
    <Row>
      <h1 className="text-center">Similar category blogs</h1>
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