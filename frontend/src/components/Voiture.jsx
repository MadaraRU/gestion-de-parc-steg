import {
  faArrowLeftLong,
  faPlus,
  faBuilding,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  ListGroup,
  Table,
  Badge,
  Form,
  FloatingLabel,
  Spinner,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAddModal, useReadModal, useUpdateModal } from '../hooks/useModal';
import { useOneParc } from '../hooks/useParc';
import { useVoiture } from '../hooks/useVoiture';

const Voiture = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const { parc, isLoading, error } = useOneParc(id);
  const { hideRead, isOpenRead, showRead } = useReadModal();

  useEffect(() => {
    if (!parc && !isLoading) {
      navigate('/', { replace: true });
    }
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, parc, isLoading]);

  // voiture handling

  const {
    voitures,
    isLoading: isLoadingCar,
    isFetching,
    error: isErrorCar,
    addVoiture,
    updateVoiture,
    deleteVoiture,
  } = useVoiture(id);

  const { showAdd, hideAdd, isOpenAdd } = useAddModal();
  const { showUpdate, hideUpdate, isOpenUpdate } = useUpdateModal();

  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [matricule, setMatricule] = useState('');

  // const [voitureId, setVoitureId] = useState('');

  const [marqueUpdate, setMarqueUpdate] = useState('');
  const [modelUpdate, setModelUpdate] = useState('');
  const [matriculeUpdate, setMatriculeUpdate] = useState('');

  const [currentVoiture, setCurrentVoiture] = useState();

  const addVoitureHandler = (e) => {
    e.preventDefault();

    if (!marque || !model || !matricule) return;

    addVoiture.mutate({
      marque,
      model,
      plaque: matricule,
    });

    hideAdd();
    setMarque('');
    setModel('');
    setMatricule('');
  };

  const updateVoitureHandler = (e) => {
    e.preventDefault();

    updateVoiture.mutate({
      voitureId: currentVoiture?.id,
      values: {
        marque: marqueUpdate || currentVoiture?.marque,
        model: modelUpdate || currentVoiture?.model,
        plaque: matriculeUpdate || currentVoiture?.plaque,
      },
    });

    hideUpdate();
    setMarqueUpdate('');
    setMatriculeUpdate('');
    setModelUpdate('');
  };

  if (isFetching) return <Spinner animation="grow" variant="primary" />;

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col>
            <button
              style={{
                background: 'transparent',
                border: 'hidden',
              }}
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} /> Retour au listes des
              parcs
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Gestion De Voiture:</h2>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button className="mx-1" onClick={showRead}>
              <FontAwesomeIcon icon={faBuilding} /> Voir Parc
            </Button>
            <Button
              onClick={showAdd}
              disabled={voitures.length === parc.nombre_de_place}
            >
              <FontAwesomeIcon icon={faPlus} /> Ajouter Voiture
            </Button>
          </Col>
        </Row>
        <Row className="mx-5 px-5 my-5 py-3">
          <Col className="mx-5 px-5">
            <Table striped bordered hover responsive>
              <thead className="bg-primary text-white text-center ">
                <th className="py-2">Id</th>
                <th className="py-2">Marque</th>
                <th className="py-2">Modele</th>
                <th className="py-2">Matricule</th>
                <th className="py-2">Action</th>
              </thead>
              <tbody className="text-center">
                {voitures?.map((voiture) => {
                  return (
                    <tr key={voiture.id}>
                      <td className="pt-4">{voiture.id}</td>
                      <td className="pt-4">{voiture.marque}</td>
                      <td className="pt-4">{voiture.model}</td>
                      <td className="pt-4">{voiture.plaque}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="mx-2"
                          onClick={() => {
                            showUpdate();
                            setCurrentVoiture(voiture);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteVoiture.mutate(voiture.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {voitures?.length === 0 && (
              <p className="text-center">Pas de voiture disponible</p>
            )}
          </Col>
        </Row>
      </Container>

      {/* voir parc modal */}
      <Modal show={isOpenRead} onHide={hideRead}>
        <Modal.Header closeButton>
          <Modal.Title>Details de parc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Reference</div>
              </div>
              <Badge bg="primary" pill className="fs-6">
                {parc?.reference}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Departement</div>
              </div>
              <Badge bg="primary" pill className="fs-6">
                {parc?.departement}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Nombre de place</div>
              </div>
              <Badge bg="primary" pill className="fs-6">
                {parc?.nombre_de_place}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Nombre de place disponible</div>
              </div>
              <Badge bg="primary" pill className="fs-6">
                {parc.nombre_de_place - voitures.length}
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideRead}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* add modal */}
      <Modal show={isOpenAdd} onHide={hideAdd}>
        <Form onSubmit={addVoitureHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Parc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="formMarque" label="Marque">
              <Form.Control
                type="text"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formModele" label="Modele">
              <Form.Control
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formMatricule" label="Matricule">
              <Form.Control
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideAdd}>
              Fermer
            </Button>
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* update modal */}
      <Modal show={isOpenUpdate} onHide={hideUpdate}>
        <Form onSubmit={updateVoitureHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier Voiture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="formMarqueUpdate" label="Marque">
              <Form.Control
                type="text"
                value={marqueUpdate}
                onChange={(e) => setMarqueUpdate(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formModelUpdate" label="Modele">
              <Form.Control
                type="text"
                value={modelUpdate}
                onChange={(e) => setModelUpdate(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formMatriculeUpdate" label="Matricule">
              <Form.Control
                type="text"
                value={matriculeUpdate}
                onChange={(e) => setMatriculeUpdate(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideUpdate}>
              Fermer
            </Button>
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Voiture;
