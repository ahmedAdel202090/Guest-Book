import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem,NavLink } from 'reactstrap';

class NavBar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                <Navbar expand="md" className='navbar-block'>
                    <NavbarBrand href="/" className='col-8'>GuestBook</NavbarBrand>
                    <Nav navbar className='col-4'>
                        <p className='m-auto'>hello,{this.props.user.name}</p>
                        <NavLink onClick={() => this.props.logout()} className='btn btn-danger m-auto'>Logout</NavLink>
                    </Nav>
                </Navbar>
            </>
        );
    }
}

export default NavBar;