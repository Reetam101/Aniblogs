import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'
import DOMPurify from 'dompurify'
import { toast } from 'react-toastify'

const Home = () => {
  const [posts, setPosts] = useState([])

  const category = useLocation().search


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${category}`)
        console.log(res.data.data)
        setPosts(res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      } catch (err) {
        // console.log(err)
        toast.error(err?.response?.data || err)
      }
    }

    fetchData();
  }, [category])

  return (
    <Container className='my-3'>
      <Row className='d-flex align-items-center justify-content-space-between'>
        {posts.length ? (
          posts?.map((post) => (
            <Col className="d-flex mt-5 align-items-center justify-content-center" lg={4} md={12} xs={12} key={post.post_id}>
              <Card style={{ maxWidth: '640px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                <Row>
                  <Col md={4} xs={2}>
                    <img src={`http://localhost:8000/api/${post.image}`} className="card-img" alt="..." />
                  </Col>
                  <Col md={8} xs={10}>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post.content.substring(0, 50)),
                        }}
                      ></Card.Text>
                      <Card.Text>
                        {post.Tags.map(tag => <Badge key={tag.tag_id} style={{ marginRight: '5px' }} bg='dark'>{tag.tag_name}</Badge>)}
                      </Card.Text>
                      <Link to={`/post/${post.post_id}`}>
                        <Button variant='primary' size="sm">Read more</Button>
                      </Link>
                      <Card.Text><small className="text-muted">Posted {moment(post?.createdAt).fromNow()}</small></Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (<>
          <h5>No blogs</h5>
        </>)}
      </Row>
    </Container>
  )
}

export default Home