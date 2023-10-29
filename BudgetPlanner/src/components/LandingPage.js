import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button,Card ,Image} from 'react-bootstrap';
import bootstrap from 'bootstrap';
import '../styles/LandingPage.css'
const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Budget Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Home Section */}
      <Container fluid className="background-container">
      <h2 className="text-center display-5">Welcome to Budget Planner</h2>
      <p className="lead text-center">Track and manage your expenses with ease</p>

      <div className="text-center mt-3">
        <Button variant="primary" href='/login'>Login</Button>
        <Button variant="primary ms-4" href='/signup'>SignUp</Button>
      </div>
    </Container>
      {/* Services and Cards */}
      <Container className="mt-5">
        <h2 className="display-4 text-center">Our Services</h2>
        <Row xs={1} md={3}>
          <Col>
            <Card className="shadow">
              <Card.Img variant="top" src="https://play-lh.googleusercontent.com/EJPEdk8Jl0Qp1NZ_WpeGrMjcB0tKyF1ZDlHO_8785J-JAr7jqGRgoRwxCUptLhYQ2LQ=w3840-h2160-rw" />
              <Card.Body>
                <p className="card-text">Track your expenses in real-time and get insights into your spending habits.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow">
              <Card.Img variant="top" src="https://www.callcentrehelper.com/images/stories/2020/10/data-analysis-charts-760.png" />
              <Card.Body>
                <p className="card-text">Generate reports and analyze your financial data to make informed decisions.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow">
              <Card.Img variant="top" src="https://www.runpto.com/wp-content/uploads/2022/05/budget2-930x620.png" />
              <Card.Body>
                <p className="card-text">Create and manage budgets to achieve your financial goals.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* About section */}
      <Container className="mt-5">
      <h2 className="display-4 text-center">About Budget Planner</h2>
      <Row>
        <Col md={6}>
          <p className="lead mt-5">
            Budget Planner is a financial management company dedicated to helping individuals and businesses take control of their finances. 
            We provide comprehensive solutions for tracking expenses, generating financial reports, and creating and managing budgets.
            Our mission is to empower our clients with the tools and knowledge they need to achieve their financial goals.
          </p>
        </Col>
        <Col md={6}>
          <Image
            src="https://dfcm824dmlg8u.cloudfront.net/wp-content/uploads/2021/02/2002-experd.jpg"
            alt="Budget Planner Company"
            fluid
          />
        </Col>
      </Row>
    </Container>

      {/* Footer section */}
      <footer className="mt-5 text-bg-light p-3">
        <Container className="py-4">
          <Row>
            <Col md={4}>
              <h5>Contact Us</h5>
              <address>
                123 Main Street<br />
                City, State 12345<br />
                Email: info@example.com<br />
                Phone: (123) 456-7890
              </address>
            </Col>
            <Col md={4}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Follow Us</h5>
              <ul className="list-unstyled">
                <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                <li><a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="text-center py-3">
          &copy; 2023 Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
