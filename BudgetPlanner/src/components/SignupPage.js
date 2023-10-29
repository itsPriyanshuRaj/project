import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Using the hook
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/home');
        console.log('New Registration successful');
      } else {
        // Handle registration errors
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
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

  return (
    <div className="gradient-background">
    <Container className="border border-secondary w-50">
      <h3 className="display-4 text-center">Sign Up for BudgetPlanner</h3>
      <p className="lead text-center">Create your account</p>

      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group className="form-floating">
          <Form.Control type="text" id="username" placeholder="Username"  name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}/>
          <Form.Label htmlFor="username">Username</Form.Label>
        </Form.Group>

        <Form.Group className="form-floating mt-2">
          <Form.Control type="email" id="email" placeholder="name@example.com" name="email"
                                required
                                value={formData.email}
                                onChange={handleChange} />
          <Form.Label htmlFor="email">Email address</Form.Label>
        </Form.Group>

        <Form.Group className="form-floating mt-2">
          <Form.Control type="password" id="password" placeholder="Password"  name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}/>
          <Form.Label htmlFor="password">Password</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-2'>
          Sign Up
        </Button>
      </Form>

      <p><a href="/login" className="text-decoration-none">Already have an account? Login here</a></p>
      <p><a href="/" className="text-decoration-none">Back to Home</a></p>
    </Container>
  </div>
  );
}

export default SignupPage;
