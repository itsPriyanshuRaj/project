import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container fluid style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
            <Container>
                <p className="text-center mb-0">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </Container>
        </Container>
    );
}

export default Footer;