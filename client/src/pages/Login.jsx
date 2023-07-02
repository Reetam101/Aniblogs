import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Form, Card, Col, Container, Row, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [inputs, setInputs] = useState({
    name: "",
    password: ""
  })

  const navigate = useNavigate()

  const [error, setError] = useState(null)

  const { login, currentUser } = useContext(AuthContext)
  console.log("currentUser: " + currentUser)
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data, {
        position: 'bottom-center'
      })
    }
  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col className='p-5 d-flex flex-column justify-content-center align-items-center' lg={12}>

          <Card style={{ width: '20rem' }}>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="name" onChange={handleChange} type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" onChange={handleChange} type="password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Button onClick={handleSubmit} variant="primary">Login</Button>

                </Form.Group>
                <p className='text-muted'>Don't have an account ? <Link to="/register">Register</Link></p>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login