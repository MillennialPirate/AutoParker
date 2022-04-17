import React from 'react';
import './static/styles.css';
import Queue from './static/images/Queue.svg';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
class Home extends React.Component
{
    render()
    {
        return (
            <div>
                <div className='navigation'>
                    <Navbar expand="lg">
                        <Container>
                            <Navbar.Brand href="#home" className='title'>ProPark</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="#home" style={{fontSize:'1.25rem'}}>Admin</Nav.Link>
                                <Nav.Link href="#link" style={{fontSize:'1.25rem'}}>Customers</Nav.Link>
                                <Nav.Link href="#contact" style={{fontSize:'1.25rem'}}>Contact Us</Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div className='introduction'>
                    <div className='introTitle'>
                        <h1>Finding a parking has<br/> never been easier!</h1>
                    </div>
                    <div className='explanation'>
                        <p>ProPark helps in automating your parking allotment. With ProPark bid adieu to long queues of cars waiting for one empty slot!</p>
                    </div>
                    <div className='bottomImage'>
                        <img src = {Queue}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;