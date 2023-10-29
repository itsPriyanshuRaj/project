import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = () => {
    const title = "Budget Planner";
    // const handleLogout = () => {
    //     setIsAuthenticated(false);
    //     navigate('/login'); // Redirect to login page after logout
    // }
    const navLinks = [
        { href: "/home", text: "Home" },
        { href: "/add", text: "Add Expense" },
        { href: "/dash", text: "Dashboard" },
        { href: "/profile", text: "Profile" },
        { href: "/", text: "logout" }

    ];


    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Navbar.Brand href="#home" className="font-weight-bold">{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {navLinks.map(link => (
                        <Nav.Link key={link.href} href={link.href} className="mx-2">
                            {link.text}
                        </Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;
