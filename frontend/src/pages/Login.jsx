import React from 'react';
import { Form, Button, FloatingLabel, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-image">
      <Card className="card-glass w-25">
        <h1 className="text-dark text-center py-2 ">Connexion</h1>
        <Form className="px-4 py-2">
          <FloatingLabel controlId="formUsername" label="Nom d'utilisateur">
            <Form.Control type="text" placeholder="Enter username" />
          </FloatingLabel>

          <FloatingLabel controlId="formPassword" label="Mot de passe">
            <Form.Control type="password" placeholder="Enter password" />
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
