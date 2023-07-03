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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        console.log("result data ", res.data)
        setPost(res.data)
        console.log(currentUser)
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
    // <h1>Hello</h1>
    <Container className='mt-5'>
      <Row>
        <Col lg={9} md={12} className='p-2 d-flex flex-column'>
          <Container>
            <img className='img-fluid' src={`http://localhost:8000/api/${post?.image}`} alt="..." />
          </Container>
          <Container>
            <Row>
              <Col>
                <span className='mt-3 d-flex align-items-center' style={{ gap: '20px' }}>
                  <img style={{ width: '50px', borderRadius: '50%', border: '1px solid violet' }} src={post?.user?.profile_img} alt="" />
                  <h5>{post?.user?.name}</h5>
                </span>
                <p className='text-muted'>Posted {moment(post?.createdAt).fromNow()}</p>
              </Col>
            </Row>
            {currentUser?.user_id === post?.userId && currentUser?.user_id !== undefined && (
              <Row className='d-flex flex-row align-items-center'>
                <Col lg={1} md={12} xs={12}>
                  <Link to={`/update/${post.post_id}`} state={post}>
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
                  __html: DOMPurify.sanitize(post?.content),
                }}
              ></p>
            </Col>
            <Col>
              {post?.Tags?.map(tag => <Badge key={tag.tag_id} style={{ marginRight: '5px' }} bg='dark'>{tag.tag_name}</Badge>)}
            </Col>
          </Row>
        </Col>
        {/* <Col lg={3} md={12} className='px-3' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 8px" }}>
          <Menu currPost={post.post_id} category={post?.category} />
        </Col> */}
      </Row>
    </Container>
  )
}

export default Single