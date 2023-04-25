import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useAuthContext, AuthContextType } from '../../components/auth/context';
import "./profile.css"

const UserProfile: React.FC = () => {
  const { currentUser } = useAuthContext() as AuthContextType;
  return (
    <Form id = "userprofile">
      <Form.Group as={Row} className="mb-3" controlId="readOnly">
        <Form.Label column>
          ID:
        </Form.Label>
        <Col xxl="auto">
          <Form.Control plaintext readOnly defaultValue= {currentUser?.id}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="readOnly">
        <Form.Label column>
          Name:
        </Form.Label>
        <Col xxl="auto">
          <Form.Control plaintext readOnly defaultValue= {currentUser?.lastName + " " + currentUser?.firstName}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="readOnly">
        <Form.Label column>
          Birthday:
        </Form.Label>
        <Col xxl="auto">
          <Form.Control plaintext readOnly defaultValue= {currentUser?.birthDate}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="readOnly">
        <Form.Label column>
          Email:
        </Form.Label>
        <Col xxl="auto">
          <Form.Control type="email" plaintext readOnly defaultValue = {currentUser?.email} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column>
          Password:
        </Form.Label>
        <Col xxl="auto">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default UserProfile;