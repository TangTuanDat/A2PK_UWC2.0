import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigation } from "react-router-dom";
import { validateLogin } from "../../components/Auth/auth";
import localforage from "localforage";

import { Container, Form, Button } from "react-bootstrap";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission here
    const user = { username: username, password: password }
    const logged = validateLogin(user);
    if (logged) {
      localforage.setItem("userID", logged);
      navigate("/");
    }
    else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container>
      <h1>UWC 2.0</h1>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
