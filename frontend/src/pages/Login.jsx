import React, { useState } from 'react';
import { Form, Button, FloatingLabel, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import Message from '../components/Message';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const loginHandler = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="d-flex justify-content-center bg-image my-5 py-5">
      <Card className="card-glass w-25">
        {error && <Message variant="danger">{error}</Message>}
        <h1 className="text-dark text-center py-2 ">Connexion</h1>
        <Form className="px-4 py-2" onSubmit={loginHandler}>
          <FloatingLabel controlId="formUsername" label="Nom d'utilisateur">
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="formPassword" label="Mot de passe">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
          <Button className="my-3 w-100" variant="primary" type="submit">
            S'identifier
          </Button>

          <Row className="py-3">
            <Col>
              Vous n'avez pas encore un compte? {''}
              <Link to={'/register'}>S'inscrire</Link>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
