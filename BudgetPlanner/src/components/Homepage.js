import React, { useState } from 'react';
import { Container, Button, Jumbotron } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import Navbar from './Navbar';
import '../styles/Homepage.css'
import HeroSection from './HeroSection';
import Footer from './Footer';

const Homepage = () => {
    const heroTitle = "Welcome to Budget Planner Website";
    const heroDescription = " Budget Planner is a financial management company dedicated to helping individuals and businesses take control of their finances. ";

    const [isAuthenticated, setIsAuthenticated] = useState(true); // Assuming user is logged in for the sake of this example
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login page after logout
    }

    if (!isAuthenticated) {
        return null; // Or you can return a redirect component to ensure navigation
    }

    return (
        <Container fluid>
            <Navbar />
            {/* <Button variant="link" onClick={handleLogout} style={{ float: 'right' }}>Logout</Button> Logout button */}
            <Container fluid className="homepage">
                <div className="custom-container">
                    <h1 className="title text-center">Welcome to Budget Planner</h1>
                    <p className="description text-center">
                        Helping you take control of your finances.
                    </p>
                </div>
            </Container>
            <Footer />
        </Container>
    );
}

export default Homepage;
