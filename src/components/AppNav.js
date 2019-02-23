import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Auth from '../containers/Auth/Auth';

const AppNav = (props) => {

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Recip-Ez</Navbar.Brand>
            <Auth />
        </Navbar>
    )
}

export default AppNav;