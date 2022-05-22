import React,{Component} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class Navigation extends Component {
    render() {
        return(
                <Navbar bg='dark' expand='lg'>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav>
                            <Link  to="/home" className='d-inline p-2 bg-dark text-white' style={{textDecoration: "none"}}>Home</Link>
                            <Link to="/department" className='d-inline p-2 bg-dark text-white' style={{textDecoration: "none"}}>Department</Link>
                            <Link to="/employee" className='d-inline p-2 bg-dark text-white' style={{textDecoration: "none"}}>Employee</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}