import React from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const Register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-image">
      <Card className="card-glass w-25">
        <h1 className="text-dark text-center py-2 ">Inscription</h1>
        <Form className="px-4 py-2">
          <FloatingLabel controlId="formFullname" label="Nom et prénom">
            <Form.Control type="text" placeholder="Enter fullname" />
          </FloatingLabel>
          <FloatingLabel controlId="formUsername" label="Nom d'utilisateur">
            <Form.Control type="text" placeholder="Enter username" />
          </FloatingLabel>
          <FloatingLabel controlId="formEmail" label="Email">
            <Form.Control type="text" placeholder="Enter Email" />
          </FloatingLabel>
          <FloatingLabel controlId="formPassword" label="Mot de passe">
            <Form.Control type="password" placeholder="Enter password" />
          </FloatingLabel>
          <Button className="my-3 w-100" variant="primary" type="submit">
            S'inscrire
          </Button>

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
