import React, { useState } from 'react';
import { Container, Row, Form, Table } from 'react-bootstrap';
import "./taskprogress.css"
import { activityData } from '../../data/data';
const items = activityData;

const TaskProgress = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search here
  };

  const filteredItems = items.filter((item) => (
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) //||
    //item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //item.lastCollected.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  return (
    <Container id="listing">
      <Row>
        <Form onSubmit={handleFormSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form>
      </Row>
      <div style={{ overflowX: 'visible' }}>
        <Row>
          <div style={{ overflow: 'auto', height: '400px' }}>
            <Table striped bordered hover>
              <thead style={{ backgroundColor: '#f8f9fa', position: 'sticky', top: 0 }}>
                <tr>
                  <th>ID</th>
                  <th>Route ID</th>
                  <th>Vehicle ID</th>
                  <th>Employee ID</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.routeId}</td>
                    <td>{item.vehicleId}</td>
                    <td>{item.employeesId.map((item)=>(" " + item))}</td>
                    <td>{item.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Row>
      </div>
    </Container>
  );
};

export default TaskProgress;
