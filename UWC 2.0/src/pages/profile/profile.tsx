import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useAuthContext, AuthContextType } from '../../components/auth/context';
import "./profile.css"

const UserProfile: React.FC = () => {
  const { currentUser } = useAuthContext() as AuthContextType;
  return (
    <Card>
      <Card.Body>
        <Card.Text>User Profile</Card.Text>
        <ListGroup>
          <ListGroupItem>
            ID: <strong> {currentUser?.id}</strong>
          </ListGroupItem>
          <ListGroupItem>
            Name: <strong> {currentUser?.lastName + " " + currentUser?.firstName}</strong>
          </ListGroupItem>
          <ListGroupItem>
            Username: <strong> {currentUser?.username}</strong>
          </ListGroupItem>
          <ListGroupItem>
            Birthday: <strong> {currentUser?.birthDate}</strong>
          </ListGroupItem>
          <ListGroupItem>
            Email: <strong> {currentUser?.email}</strong>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;