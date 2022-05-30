import React, { useState } from "react";
import { Table } from "react-bootstrap";
//import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import Modale from "../../components/Modale";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "../../components/Page";
import "./indexDashboard.css";

export default function TableList({
  pompes,
  suprimerPome,
  modifierPompe,
  ilots,
  showM,
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
    <Page title="Liste des pompes - Admin" className="indexDashbord">
      <div
        className="row justify-content-center"
        style={{ marginTop: "-30px" }}
      >
        <div className=" indexDashbord2 col-xs-10 col-sm-10 col-md-10">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #66bb6a, #43a047)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 60%",
            }}
          >
            <h2 className="titre">Liste des pompes</h2>
          </div>{" "}
          <Bbtn
            style={{ width: "200px" }}
            variant="secondary"
            onClick={() => showM()}
          >
            Ajouter une pompe
          </Bbtn>
          <div
            className=" col-xs-1 col-sm-6 col-md-1 "
            style={{ padding: "1px" }}
          >
            {" "}
          </div>{" "}
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
          <table size="sm" className="table table-responsive-lg" hover>
            <thead
              style={{
                background: "linear-gradient(60deg, #66bb6a, #43a047)",
                color: "white",
              }}
            >
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Numéro
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Ilot
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pompes.map((pompe) => (
                <tr key={pompe.id} style={{ cursor: "pointer" }}>
                  <td
                    style={{ textAlign: "center", cursor: "default" }}
                  >{`Pompe ${pompe.numero}`}</td>
                  <td
                    style={{ textAlign: "center", cursor: "default" }}
                  >{`Ilot n° ${pompe.ilot_id}`}</td>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    <Bbtn
                      onClick={() => afficheModale(pompe)}
                      type="button"
                      variant="info"
                      className="mx-2"
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
          </table>
        </div>
      </div>
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
    </Page>
  );
}
