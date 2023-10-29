// HeroSection.js

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HeroSection = ({ title, description }) => {
    return (
        <Container>
            <Row className="align-items-center justify-content-center" style={{ height: '500px' }}>
                <Col md={6} className="text-center">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <Button variant="primary">Learn More</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default HeroSection;
