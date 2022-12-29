import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const signUpHandler = async (e) => {
    e.preventDefault();

    await signup(fullname, username, email, password);
  };

  return (
    <div className="d-flex justify-content-center bg-image my-5 py-5">
      <Card className="card-glass w-25">
        <h1 className="text-dark text-center py-2 ">Inscription</h1>
        <Form className="px-4 py-2" onSubmit={signUpHandler}>
          <FloatingLabel controlId="formFullname" label="Nom et prénom">
            <Form.Control
              type="text"
              placeholder="Enter fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="formUsername" label="Nom d'utilisateur">
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="formEmail" label="Email">
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Button
            className="my-3 w-100"
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            S'inscrire
          </Button>
          {error && <p>{error}</p>}

          <Row className="py-3">
            <Col>
              Vous avez déjà un compte? <Link to={'/login'}>Se connecter</Link>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
