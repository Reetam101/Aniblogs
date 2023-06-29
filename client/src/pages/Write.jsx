import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, InputGroup, Row, Form, Stack, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import CreatableReactSelect from "react-select/creatable"
import { AuthContext } from '../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ]
}

const Write = () => {
  // const state = useLocation().state
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('')
  const [img, setImg] = useState(null)
  const [category, setCategory] = useState('')
  const allCategories = [
    {
      cat_id: 1,
      category_name: "action"
    },
    {
      cat_id: 2,
      category_name: "isekai"
    },
    {
      cat_id: 3,
      category_name: "romance"
    },
    {
      cat_id: 4,
      category_name: "top10s"
    },
  ]

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate("/")
    }
  }, [navigate, currentUser])


  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('desc', value)
      formData.append('file', img)
      formData.append('date', moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"))
      formData.append('category', category)
      const res1 = await axios.post("/posts", formData)
      navigate("/")
      console.log(res1.data)
    } catch (error) {
      console.log(error)
    }
    // try {
    //   state ? await axios.put(`/posts/${state.post_id}`, {
    //     title, desc: value, category_name
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  }
  const categoryChangeHandler = (e) => {
    console.log("e ", e)
    setCategory(e.label)
  }
  console.log("img:" + img)
  return (
    <Container className='my-5'>
      <Row>
        <Col lg={7} md={12} className='d-flex flex-column align-items-center justify-content-center'>
          <Stack gap={2}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Title"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </InputGroup>
            <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} style={{ height: "300px" }} />
          </Stack>

        </Col>
        <Col lg={5} md={12}>
          <Stack>
            <div className='col my-5'>
              <h5>Publish</h5>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control name="file" accept=".png, .jpg, .jpeg" onChange={e => setImg(e.target.files[0])} type="file" />
              </Form.Group>
            </div>
            <div className='col mt-3'>
              <h5>Category</h5>
              <CreatableReactSelect onChange={categoryChangeHandler} value={category.label}
                options={allCategories.map(cat => {
                  return { label: cat.category_name, value: cat.cat_id }
                })}
              />
            </div>
            <div className='col d-flex justify-content-end mt-5' style={{ gap: '20px' }}>
              <Button size="sm">Save as draft</Button>
              <Button size="sm" variant='outline-secondary'
                onClick={e => handleClick(e)}>Publish</Button>
            </div>
          </Stack>
        </Col>
      </Row>

    </Container>
  )
}

export default Write