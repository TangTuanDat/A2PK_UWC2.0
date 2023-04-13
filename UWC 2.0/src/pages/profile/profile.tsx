import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useAuthContext, AuthContextType } from '../../components/auth/context';
import "./profile.css"
const UserProfile: React.FC = () => {
  const { currentUser } = useAuthContext() as AuthContextType;

  return (
    <Container className="mt-5">
    <Row>
      <Col xs={12} md={3} className="d-flex justify-content-center">
        <Image src={currentUser?.avatar} roundedCircle className="profile-avatar" />
      </Col>
      <Col xs={12} md={9}>
        <h2>Name: {currentUser?.lastName + " " + currentUser?.firstName}</h2>
        <h4 className="text-muted">{currentUser?.username}</h4>
        <Button variant="primary">Edit Profile</Button>
      </Col>
    </Row>
  </Container>
  );
};

export default UserProfile;