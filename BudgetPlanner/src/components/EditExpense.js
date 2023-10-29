import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API requests

const EditExpense = ({ onEdit }) => {
  const [formData, setFormData] = useState({
    expenseName: '',
    expenseCategory: '',
    expenseAmount: 0,
    expenseDate: '',
  });

  // UseEffect to fetch data from the backend when the component mounts
  useEffect(() => {
    
    axios.get('/api/expense') 
      .then((response) => {
        const fetchedData = response.data; 
        setFormData(fetchedData); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditExpense = () => {
   
    axios.put('/api/expense', formData) 
      .then((response) => {
        
        onEdit(formData)
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <Container fluid>
      <Navbar />
      <Container className="edit-expense-container mt-5 shadow shadow-lg">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-4268366-3561009.png"
              alt="Expense"
              className="expense-image img-fluid"
            />
          </div>
          <div className="col-md-6 w-50">
            <h3 className="display-4 text-center">Edit Expense</h3>

            <Form className="mb-3">
              <Form.Group className="form-floating">
                <Form.Control
                  type="text"
                  id="expenseName"
                  name="expenseName"
                  placeholder="Expense Name"
                  value={formData.expenseName}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="expenseName">Expense Name</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mt-3">
                <Form.Control
                  type="text"
                  id="expenseCategory"
                  name="expenseCategory"
                  placeholder="Expense Category"
                  value={formData.expenseCategory}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="expenseCategory">Expense Category</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mt-3">
                <Form.Control
                  type="number"
                  id="expenseAmount"
                  name="expenseAmount"
                  placeholder="Expense Amount"
                  value={formData.expenseAmount}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="expenseAmount">Expense Amount</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mt-3">
                <Form.Control
                  type="date"
                  id="expenseDate"
                  name="expenseDate"
                  placeholder="Expense Date"
                  value={formData.expenseDate}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="expenseDate">Expense Date</Form.Label>
              </Form.Group>

              <Button
                variant="primary"
                type="button"
                className="mt-3"
                onClick={handleEditExpense}
              >
                Update Expense
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default EditExpense;
