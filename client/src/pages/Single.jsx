import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import Menu from '../components/Menu'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import { Pencil, Trash } from 'react-bootstrap-icons'
import DOMPurify from "dompurify";


const Single = () => {
  const [post, setPost] = useState([])
  const navigate = useNavigate()

  const location = useLocation()
  const { currentUser } = useContext(AuthContext)

  const postId = location.pathname.split("/")[2]

  function mergeCategories(posts_) {
    const mergedPosts = [];
    const mergedMap = new Map();
    if (posts_.length) {
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
    }

    return mergedPosts;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        console.log("result data ", res.data)
        setPost(res.data[0])
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col lg={9} md={12} className='p-2 d-flex flex-column'>
          <Container>
            <img className='img-fluid' src={`http://localhost:8000/api/${post?.post_img}`} alt="..." />
          </Container>
          <Container>
            <Row>
              <Col>
                <span className='mt-3 d-flex align-items-center' style={{ gap: '20px' }}>
                  <img style={{ width: '50px', borderRadius: '50%', border: '1px solid violet' }} src={post?.user_img} alt="" />
                  <h5>{post.username}</h5>
                </span>
                <p className='text-muted'>Posted {moment(post?.date).fromNow()}</p>
              </Col>
            </Row>
            {currentUser?.id === post?.id && currentUser?.id !== undefined && (
              <Row className='d-flex flex-row align-items-center'>
                <Col lg={1} md={12} xs={12}>
                  <Link to={`/write?edit=2`} state={post}>
                    <Button className='d-flex align-items-center' variant="primary" size="sm"><Pencil />Edit</Button>
                  </Link>
                </Col>
                <Col lg={1} md={12} xs={12}>
                  <Button onClick={handleDelete} className='d-flex align-items-center' variant='outline-danger' size='sm'><Trash />Delete</Button>
                </Col>
              </Row>
            )}
          </Container>
          <Row className='mt-5 d-flex flex-column px-3'>
            <Col>
              <h1>{post?.title}</h1>
            </Col>
            <Col>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
            </Col>
            <Col>
              <Badge bg='dark'>{post?.category}</Badge>
              {/* {post?.category_name?.split(",").map(cat_name => <Badge style={{ marginRight: '2px' }} bg='dark'>{cat_name}</Badge>)} */}
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={12} className='px-3' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 8px" }}>
          <Menu currPost={post.post_id} />
        </Col>
      </Row>
    </Container>
  )
}

export default Single