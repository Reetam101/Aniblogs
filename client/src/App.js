import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom"
// import './style.scss'
import Register from './pages/Register'
import Login from './pages/Login'
import Write from './pages/Write'
import Home from './pages/Home'
import Single from './pages/Single'
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Update from "./pages/Update"

import { Container, Row, Col } from 'react-bootstrap'


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:id",
        element: <Single />
      },
      {
        path: "/write",
        element: <Write />
      },
      {
        path: '/update/:id',
        element: <Update />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
])

function App() {
  return (
    // <div className="app">
    //   <div className="container">
    //     <RouterProvider router={router} />
    //   </div>
    // </div>
    <RouterProvider router={router} />
  );
}



export default App;
