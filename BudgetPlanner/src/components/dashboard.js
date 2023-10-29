import React, { useState } from 'react';
import { Container, Table, Pagination, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import '../styles/dashboard.css'
function DashboardPage() {
  const rows = Array.from({ length: 15 }, (_, i) => `Row ${i + 1}`);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleRows = rows.slice(startIndex, endIndex);


  return (
    <Container fluid>
      <Navbar />
      <div className="gradient-background">
        <Container>
          <h1 className='text-center display-5'>Dashboard</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Expense Name</th>
                <th>Expense Amount</th>
                <th>Expense Category</th>
                <th>Payment Mode</th>
                <th>Expense Date</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, index) => (
                <tr key={index}>
                  <td>{row}</td>
                  <td>{row}</td>
                  <td>{row}</td>
                  <td>{row}</td>
                  <td>{row}</td>
                  <td>
                    <Button variant="success" href='/edit'>Edit</Button>
                  </td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>

              ))}
            </tbody>
          </Table>

          {rows.length > itemsPerPage && (
            <Pagination>
              {Array.from({ length: Math.ceil(rows.length / itemsPerPage) }, (_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Container>
      </div>

    </Container>

  );
}

export default DashboardPage;
