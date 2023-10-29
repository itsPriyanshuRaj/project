import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Login.css'

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        navigate('/home');
        console.log('Registration successful');
      } else {
        // Handle registration errors
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Network error:', error);
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  // const handleLogin = () => {
  //     // Make a POST request to the Flask backend
  //     axios.post('http://127.0.0.1:3000/login', {
  //         username: username,
  //         password: password,
  //     })
  //         .then(response => {
  //             // Handle the response from the Flask backend
  //             if (response.data.message === 'Welcome!') {
  //                 setMessage('Login successful. Welcome!');
  //                 navigate('/home');
  //             } else {
  //                 setMessage('Invalid credentials. Please try again.');
  //             }
  //         })
  //         .catch(error => {
  //             console.error('Error:', error);
  //         });
  // };

  return (
    <div className="gradient-background">
      <Container className="border border-secondary mt-5 w-50">
        <h3 className="display-4 text-center">Welcome to BudgetPlanner</h3>
        <p className="lead text-center">Please Login to your account</p>

        <Form className="mb-3" onSubmit={handleSubmit}>
          <Form.Group className="form-floating">
            <Form.Control type="username" id="floatingInput" placeholder="username" name="username" required
              value={formData.username}
              onChange={handleChange} />
            <Form.Label htmlFor="floatingInput">Username</Form.Label>
          </Form.Group>

          <Form.Group className="form-floating mt-2">
            <Form.Control type="password" id="floatingPassword" placeholder="Password" name="password"
              required
              value={formData.password}
              onChange={handleChange} />
            <Form.Label htmlFor="floatingPassword">Password</Form.Label>
          </Form.Group>

          <Button variant="primary" type="submit" className='mt-2 text-center'>
            Login
          </Button>
        </Form>

        <p><a href="/signup" className="text-decoration-none">New User? Register here</a></p>
        <p><a href="/" className="text-decoration-none">Back to Home</a></p>
      </Container>
    </div>
  );
}

export default LoginPage;
