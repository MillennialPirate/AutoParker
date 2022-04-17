import React from 'react';
import './static/styles.css';
import SignUpImg from './static/images/SignUp.svg';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
class SignUp extends React.Component {
    render() {
        return (
            <div>
                <div className='navigation'>
                    <Navbar expand="lg">
                        <Container>
                            <Navbar.Brand href="#home" className='title'>ProPark</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    <Nav.Link href="#home" style={{ fontSize: '1.25rem' }}>Admin</Nav.Link>
                                    <Nav.Link href="#link" style={{ fontSize: '1.25rem' }}>Customers</Nav.Link>
                                    <Nav.Link href="#contact" style={{ fontSize: '1.25rem' }}>Contact Us</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div className='signup'>
                    <div className='heading'>
                        <h1>Admin Sign Up</h1>
                    </div>
                    <div className='middleImg'>
                        <img src={SignUpImg} />
                    </div>
                    <main class="form-signin">
                        <form>
                            <div class="form-floating">
                                <input type="email1" class="form-control adm" id="floatingPassword" placeholder="Password"/>
                                    <label for="floatingPassword">Email</label>
                            </div>
                            <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                                    <label for="floatingPassword">Password</label>
                            </div>
                            <button class="w-100 btn btn-lg btn-dark" type="submit">Sign Up</button>
                            <div className='footer'>
                                <p class="mt-5 mb-3 text-muted">&copy; 2022–2030</p>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        )
    }
}
export default SignUp;