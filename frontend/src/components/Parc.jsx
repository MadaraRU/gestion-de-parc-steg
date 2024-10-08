import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  FloatingLabel,
  Form,
  Table,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParc } from '../hooks/useParc';
import { useAddModal, useUpdateModal } from '../hooks/useModal';
import { useState } from 'react';
import { useEffect } from 'react';

const Parc = () => {
  const { parcs, isLoading, error, addParc, deleteParc, updateParc } =
    useParc();

  // handle add modal and update modal
  const { isOpenUpdate, hideUpdate, showUpdate } = useUpdateModal();
  const { isOpenAdd, hideAdd, showAdd } = useAddModal();

  // handle add parc
  const [reference, setReference] = useState('');
  const [departement, setDepartement] = useState('');
  const [nombre_de_place, setNombreDePlace] = useState();

  const addParcHandler = (e) => {
    e.preventDefault();

    if (!reference || !departement || !nombre_de_place) return;

    addParc.mutate({
      reference,
      departement,
      nombre_de_place,
    });

    hideAdd();
    setReference('');
    setDepartement('');
    setNombreDePlace();
  };

  // handle update parc
  const [referenceUpdate, setReferenceUpdate] = useState();
  const [departementUpdate, setDepartementUpdate] = useState();
  const [nombreDelPlaceUpdate, setNombreDePlaceUpdate] = useState();

  const [currentParc, setCurrentParc] = useState();

  const updateParcHandler = (e) => {
    e.preventDefault();

    updateParc.mutate({
      parcId: currentParc?.id,
      values: {
        reference: referenceUpdate || currentParc?.reference,
        departement: departementUpdate || currentParc?.departement,
        nombre_de_place: nombreDelPlaceUpdate || currentParc?.nombre_de_place,
      },
    });

    hideUpdate();
    setReferenceUpdate();
    setDepartementUpdate();
    setNombreDePlaceUpdate();
  };

  useEffect(() => {
    if (addParc.isSuccess) {
      toast.success('Parc Ajouter!', {
        position: 'top-center',
      });
    }
  }, [addParc.isSuccess]);

  useEffect(() => {
    if (deleteParc.isSuccess) {
      toast.success('Parc Supprimer!', {
        position: 'top-center',
      });
    }
  }, [deleteParc.isSuccess]);

  useEffect(() => {
    if (updateParc.isSuccess) {
      toast.success('Parc Modifier!', {
        position: 'top-center',
      });
    }
  }, [updateParc.isSuccess]);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Gestion De Parc: </h2>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button onClick={showAdd}>
              <FontAwesomeIcon icon={faPlus} /> Ajouter Parc
            </Button>
          </Col>
        </Row>
        <Row className="mx-5 px-5 my-5 py-3">
          <Col className="mx-5 px-5">
            <Table striped bordered hover responsive>
              <thead className="bg-primary text-white text-center ">
                <th className="py-2">Id</th>
                <th className="py-2">Reference</th>
                <th className="py-2">Departement</th>
                <th className="py-2">Nombre de Place</th>
                <th className="py-2">Voiture</th>
                <th className="py-2">Action</th>
              </thead>
              <tbody className="text-center">
                {parcs?.map((parc) => {
                  return (
                    <tr key={parc.id}>
                      <td className="pt-4">{parc.id}</td>
                      <td className="pt-4">{parc.reference}</td>
                      <td className="pt-4">{parc.departement}</td>
                      <td className="pt-4">{parc.nombre_de_place}</td>
                      <td className="pt-4">
                        <Link to={`${parc.id}/voiture`}>voir voiture</Link>
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          className="mx-2"
                          onClick={() => {
                            showUpdate();
                            return setCurrentParc(parc);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deleteParc.mutate(parc.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {parcs?.length === 0 && (
              <p className="text-center">Pas de parc disponible</p>
            )}
          </Col>
        </Row>
      </Container>

      {/* add modal */}
      <Modal show={isOpenAdd} onHide={hideAdd}>
        <Form onSubmit={addParcHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Parc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="formReference" label="Reference">
              <Form.Control
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="formDepartement" label="Departement">
              <Form.Control
                type="text"
                value={departement}
                onChange={(e) => setDepartement(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formNombreDePlace"
              label="Nombre De Place"
            >
              <Form.Control
                type="number"
                step={1}
                min={1}
                value={nombre_de_place}
                onChange={(e) => setNombreDePlace(e.target.value)}
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
        <Form onSubmit={updateParcHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier Parc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="formReferenceUpdate" label="Reference">
              <Form.Control
                type="text"
                value={referenceUpdate}
                onChange={(e) => setReferenceUpdate(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formDepartementUpdate"
              label="Departement"
            >
              <Form.Control
                type="text"
                value={departementUpdate}
                onChange={(e) => setDepartementUpdate(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="formNombreDePlaceUpdate"
              label="Nombre De Place"
            >
              <Form.Control
                type="number"
                step={1}
                value={nombreDelPlaceUpdate}
                onChange={(e) => setNombreDePlaceUpdate(e.target.value)}
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

export default Parc;
