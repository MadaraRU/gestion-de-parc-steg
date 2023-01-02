import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, Button, FloatingLabel, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';

import { useLogin } from '../hooks/useLogin';
import useToast from '../hooks/useToast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const loginHandler = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
  }, [error]);

  return (
    <div className="d-flex justify-content-center bg-image my-5 py-5">
      <Card className="card-glass w-25">
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
