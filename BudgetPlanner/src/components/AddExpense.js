import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function AddExpense() {
  const [formData, setFormData] = useState({
    expenseName: '',
    expenseCategory: '',
    expenseAmount: '',
    expenseDate: '',
    paymentMode:'',
  });

  const navigate = useNavigate(); // Using the hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const response = await fetch('http://localhost:5000/addexpense',{
        method:'POST',
        header:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/dash'); // Redirect to dashboard page
        console.log('Data submitted successfully');
      } else {
        // Handle registration errors
        const errorData = await response.json();
        console.error('Data nahi gaya bhai', errorData);
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
    <Container fluid>
      <Navbar />
      <Container className="add-expense-container mt-5 shadow shadow-lg">

        <div className="row">
          <div className="col-md-6">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/001/829/925/small_2x/circulation-in-corporate-finance-proper-accounting-increase-investment-value-financial-turnover-in-currency-trading-system-of-exchanging-dollar-to-euro-money-changer-investment-consultant-advisor-free-vector.jpg"
              alt="Expense"
              className="expense-image img-fluid"
            />
          </div>
          <div className="col-md-6 w-50">
            <h3 className="display-4 text-center">Add Expense</h3>

            <Form className="mb-3" onSubmit={handleSubmit}>
              <Form.Group className="form-floating">
                <Form.Control type="text" id="expenseName" placeholder="Expense Name" name='expenseName'/>
                <Form.Label htmlFor="expenseName">Expense Name</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mt-3">
                <Form.Control type="text" id="expenseCategory" placeholder="Expense Category"  name='expenseCategory' required onChange={handleChange}/>
                <Form.Label htmlFor="expenseCategory">Expense Category</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mt-3">
                <Form.Control type="number" id="expenseAmount" placeholder="Expense Amount" name='expenseAmount' required onChange={handleChange}/>
                <Form.Label htmlFor="expenseAmount">Expense Amount</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mt-3">
                <Form.Control type="date" id="expenseDate" placeholder="Expense Date" name='expenseDate' required onChange={handleChange}/>
                <Form.Label htmlFor="expenseDate">Expense Date</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mt-3">
                <Form.Control type="text" id="paymentMode" placeholder="Payment Mode" name='paymentMode' required onChange={handleChange}/>
                <Form.Label htmlFor="paymentMode">Payment Mode</Form.Label>
              </Form.Group>

              {/* <Form.Group className="form-floating mt-3">
              <Form.Control type="time" id="expenseTime" placeholder="Expense Time" />
              <Form.Label htmlFor="expenseTime">Expense Time</Form.Label>
            </Form.Group> */}

              <Button variant="primary" type="submit" className='mt-3'>
                Add Expense
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </Container>

  );
};

export default AddExpense;
