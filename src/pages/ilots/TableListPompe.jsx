import React, { useState } from "react";
import { Table } from "react-bootstrap";
//import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";

import { Grid, Button, Container, Stack, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import Modale from "../../components/Modale";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function TableList({
  pompes,
  suprimerPome,
  modifierPompe,
  ilots,
}) {
  const [numero, setNumero] = useState(null);
  const [ilot, setIlot] = useState(null);
  const [id, setId] = useState(null);
  const [pompe, setPompe] = useState(null);
  //Afficher le modale
  const afficheModale = (data) => {
    setNumero(data.numero);
    setIlot(data.ilot_id);
    setId(data.id);
    setModalShow(true);
  };
  //Modifer la pompe

  const modifier = () => {
    setModalShow(false);
    modifierPompe(id, { ilot_id: ilot, numero });
  };

  // Pour la suppression
  const confirmeDelete = (data) => {
    setPompe(data);
    setModalDeleteShow(true);
    //nitifer
  };

  //supprimer dans la base de donnée
  const supprimer = () => {
    setModalDeleteShow(false);
    //notifier
    suprimerPome(pompe);
  };
  // La notification de

  const [modalShow, setModalShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  return (
    <Page title="Liste des Pompes">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          {ilots &&
            ilots.map((ilot) => (
              <Typography key={ilot.id} variant="h4" gutterBottom>
                Ilot N° {ilot.numero}
              </Typography>
            ))}
          <Button variant="contained" onClick={() => setModalShow(true)}>
            Ajouter
          </Button>
        </Stack>
      </Container>
      {/*  <div className="row">
        <Table className="table" striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Numero</th>
              <th scope="col">Ilot</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {pompes.map((pompe) => (
              <tr key={pompe.id} style={{ cursor: "pointer" }}>
                <td>{`Pompe ${pompe.numero}`}</td>
                <td>{`Ilot n° ${pompe.ilot_id}`}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <Bbtn
                    onClick={() => afficheModale(pompe)}
                    type="button"
                    variant="info"
                    //startIcon={}
                  >
                    <Icon icon={pencilIcon} />
                  </Bbtn>
                  <Bbtn
                    onClick={() => confirmeDelete(pompe)}
                    type="button"
                    variant="danger"
                    //startIcon={}
                  >
                    <Icon icon={deleteIcon} />
                  </Bbtn>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modale
          titre="Modifier une Pompe"
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <Modal.Body>
            <div className="row">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Numéro Pompe"
                  aria-label="Numéro Pompe"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
              <div className="col">
                <select
                  className="form-control"
                  onChange={(e) => setIlot(e.target.value)}
                  value={ilot}
                >
                  <option value="">Ilots</option>
                  {ilots &&
                    ilots.map((il) => (
                      <option key={il.id} value={il.id}>
                        ilot {il.numero}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Bbtn onClick={modifier} variant="success">
              Sauvegarder
            </Bbtn>
          </Modal.Footer>
                    </Modale>

        <Modale
          titre="Supprimer une Pompe"
          show={modalDeleteShow}
          onHide={() => setModalDeleteShow(false)}
        >
          <Modal.Body>
            <h5>Vouller vous vraiment supprimer la pompe ?</h5>
          </Modal.Body>
          <Modal.Footer>
            <Bbtn onClick={supprimer} variant="danger">
              Supprimer
            </Bbtn>
          </Modal.Footer>
        </Modale>
      </div>*/}

      <div className="row">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {pompes &&
          pompes.map((pompe) => (
            <div
              key={pompe.id}
              className="col-sm-4"
              style={{ marginBottom: 6, textAlign: "center", margin: "auto" }}
            >
              <div className="card">
                <h1 align="center" style={{ textAlign: "center" }}>
                  {`Pompe ${pompe.numero}`}
                </h1>
                <Link
                  to={`/admin/ilots/${pompe.ilot_id}/pompes/${pompe.id}/pistolets`}
                >
                  <>
                    <img
                      src="https://cdn.pixabay.com/photo/2013/07/12/16/32/gasoline-pump-151115_960_720.png"
                      className="card-img-top-center"
                      alt="..."
                      height="250px"
                      style={{ width: "70%", margin: "auto" }}
                    />
                  </>
                </Link>
                <div className="card-body center">
                  <Bbtn
                    onClick={() => afficheModale(ilot)}
                    type="button"
                    variant="info"
                    //startIcon={}
                  >
                    <Icon icon={pencilIcon} />
                  </Bbtn>
                  <Bbtn
                    onClick={() => confirmeDelete(ilot)}
                    type="button"
                    variant="danger"
                    //startIcon={}
                  >
                    <Icon icon={deleteIcon} />
                  </Bbtn>
                </div>
              </div>
            </div>
          ))}

        {/* <Modale
          titre="Ajouter une Pompe"
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <Modal.Body>
            <div className="row">
              <div className="col">
                <input
                  type="number"
                  className={`form-control}`}
                  placeholder="Numéro Pompe"
                  aria-label="Numéro Pompe"
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
              <div className="col">
                <select
                  className={`form-control`}
                  onChange={(e) => setIlot(e.target.value)}
                >
                  <option value="">Ilots</option>
                  {ilots &&
                    ilots.map((il) => (
                      <option key={il.id} value={il.id}>
                        ilot {il.numero}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Bbtn onClick={addPompe} variant="success">
              Sauvegarder
            </Bbtn>
          </Modal.Footer>
        </Modale>*/}

        <Modale
          titre="Modifier une Pompe"
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <Modal.Body>
            <div className="row">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Numéro Pompe"
                  aria-label="Numéro Pompe"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
              <div className="col">
                <select
                  className="form-control"
                  onChange={(e) => setIlot(e.target.value)}
                  value={ilot}
                >
                  <option value="">Ilots</option>
                  {ilots &&
                    ilots.map((il) => (
                      <option key={il.id} value={il.id}>
                        ilot {il.numero}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Bbtn onClick={modifier} variant="success">
              Sauvegarder
            </Bbtn>
          </Modal.Footer>
        </Modale>

        <Modale
          titre="Supprimer une Pompe"
          show={modalDeleteShow}
          onHide={() => setModalDeleteShow(false)}
        >
          <Modal.Body>
            <h5>Vouller vous vraiment supprimer la pompe ?</h5>
          </Modal.Body>
          <Modal.Footer>
            <Bbtn onClick={supprimer} variant="danger">
              Supprimer
            </Bbtn>
          </Modal.Footer>
        </Modale>
      </div>
    </Page>
  );
}
