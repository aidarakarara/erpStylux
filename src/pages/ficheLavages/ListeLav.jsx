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
    <Page title="Liste des fiches" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "10px" }}>
        <div className=" indexDashbord2 col-xs-8 col-sm-10 col-md-10">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #26c6da, #00acc1)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 40%)",
            }}
          >
            <span>Liste des fiches "Lavages"</span>
          </div>{" "}
          <Bbtn
            style={{ width: "30%" }}
            variant="secondary"
            onClick={afficheModale}
          >
            Attribuer une fiche
          </Bbtn>
          <div
            className=" col-xs-1 col-sm-6 col-md-1 "
            style={{ padding: "1px" }}
          >
            {" "}
          </div>
          <tr style={{ paddingTop: "10px" }}>
            {" "}
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
            <Table className="table" hover>
              <thead
                style={{
                  background: "linear-gradient(60deg, #26c6da, #00acc1)",
                  color: "white",
                }}
              >
                <tr>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Numero
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Date
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Pompiste
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Etat
                  </th>
                </tr>
              </thead>
              <tbody>
                {" "}
                <tr>
                  <td scope="col" style={{ textAlign: "center" }}>
                    001
                  </td>
                  <td scope="col" style={{ textAlign: "center" }}>
                    11/10/21
                  </td>
                  <td scope="col" style={{ textAlign: "center" }}>
                    Malang
                  </td>
                  <td scope="col" style={{ textAlign: "center" }}>
                    vu/non vu
                  </td>
                </tr>
                <tr>
                  <td scope="col" style={{ textAlign: "center" }}>
                    002
                  </td>
                  <td scope="col" style={{ textAlign: "center" }}>
                    11/10/21
                  </td>
                  <td scope="col" style={{ textAlign: "center" }}>
                    Malang
                  </td>
                  <td scope="col" style={{ textAlign: "center" }}>
                    vu/non vu
                  </td>
                </tr>
              </tbody>
            </Table>
          </tr>
        </div>
      </div>

      <Modale
        titre="Fiche de Lavages"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Body>
          <div className="row">
            <div className="col">
              <label>Date d'enregistrement</label>
              <input
                type="date"
                className="form-control"
                placeholder="Date d'enregistrement"
                aria-label="Date d'enregistrement"
              />
            </div>
            <div className="col">
              <label>Pompiste</label>
              <input
                type="text"
                className="form-control"
                placeholder="pompe 2"
                aria-label="pompe 2"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Bbtn variant="success">Sauvegarder</Bbtn>
        </Modal.Footer>
      </Modale>
    </Page>
  );
}
