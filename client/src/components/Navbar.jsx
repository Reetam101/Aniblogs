import React, { useContext } from 'react'
import Logo from '../img/logo.png'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../context/authContext';
import { LinkContainer } from 'react-router-bootstrap'

const NavbarComponent = () => {
  const { currentUser, logout } = useContext(AuthContext)

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer className='text-decoration-none' to='/'>
          <Navbar.Brand><img style={{ borderRadius: '50px' }} height="50" src={Logo} alt="" /></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <NavDropdown data-bs-theme="dark" bg="secondary" title="categories" id='categories'>
              <LinkContainer className='text-decoration-none' to={{ pathname: "/", search: "cat=top10s" }}>
                <NavDropdown.Item>
                  ANIME TOP 10S
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer className='text-decoration-none' to={{ pathname: "/", search: "cat=reviews" }}>
                <NavDropdown.Item>
                  REVIEWS
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer className='text-decoration-none' to={{ pathname: "/", search: "cat=upcoming" }}>
                <NavDropdown.Item>
                  UPCOMING ANIME
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer className='text-decoration-none' to={{ pathname: "/", search: "cat=seasonal" }}>
                <NavDropdown.Item>
                  SEASONAL
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer className='text-decoration-none' to={{ pathname: "/", search: "cat=action" }}>
                <NavDropdown.Item>
                  ACTION
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            {
              currentUser ? (
                <>
                  <LinkContainer className='text-decoration-none' to='/profile'>
                    <Nav.Link>
                      {currentUser?.name}
                    </Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer className='text-decoration-none' to='/login'>
                    <Nav.Link>
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer className='text-decoration-none' to='/register'>
                    <Nav.Link>
                      Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )
            }

            <LinkContainer className='text-decoration-none' to='/write'>
              <Nav.Link>
                Write
              </Nav.Link>
            </LinkContainer>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default NavbarComponent