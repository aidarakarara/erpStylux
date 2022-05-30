import React, { useState } from "react";
import { Table } from "react-bootstrap";
//import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";

import Modale from "../../components/Modale";
import ilott from "src/components/DashAdminSvg/ilot.svg";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import "./indexDashboard.css";
export default function TableList({ ilots, suprimer, modiferIlot, showM }) {
  const [numero, setNumero] = useState(null);
  const [ilot_id, setIdilot] = useState(null);
  //Afficher le modale
  const afficheModale = (ilot) => {
    setNumero(ilot.numero);
    setIdilot(ilot.id);
    setModalShow(true);
  };
  //Modifer ilot

  const modifier = () => {
    modiferIlot(ilot_id, numero);
    setModalShow(false);
  };

  // Pour la suppression
  const confirmeDelete = (ilot) => {
    setNumero(ilot.id);

    setModalDeleteShow(true);
    //nitifer
  };

  //supprimer dans la base de donnée
  const supprimer = () => {
    setModalDeleteShow(false);
    //notifier
    const num_ilot = numero;
    suprimer(num_ilot);
  };

  // La notification de

  const [modalShow, setModalShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  return (
    <Page title="Liste des ilots - Admin" className="indexDashbord">
      <div
        className="row justify-content-center"
        style={{ marginTop: "-60px" }}
      >
        <div className=" indexDashbord2 col-xs-10 col-sm-10 col-md-10">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #5d5357, #2c2e20)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(108 120 132 / 60%)",
            }}
          >
            <h2 class="titre" >Liste des ilots</h2>
          </div>{" "}
          <Bbtn
            style={{ width: "30%" }}
            variant="secondary"
            onClick={() => showM()}
          >
            Ajouter un ilot
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
           
            <div className="row">
            {ilots &&
              ilots.map((ilot) => (
                <div
                  key={ilot.id}
                  className="col-sm-6 mt-2"
                  style={{ marginBottom: 6 }}
                >
                  <>
                    <div
                      className="card pt-3"
                      style={{
                        backgroundColor: "transparent",
                        boxShadow:
                          "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(108 120 132 / 60%)",
                        alignItems: "center",
                       
                      }}
                    >
                      <h1 align="center" style={{ textAlign: "center" }}>
                        Ilot N° {ilot.numero}
                      </h1>
                      {/*<Link to={`/admin/ilots/${ilot.id}/pompes`}>
                  <img src={ilott} alt="" srcset="" width="150px" />
              </Link>*/}

                      <img src={ilott} alt="" srcSet="" width="150px" />

                      <div className="card-body center">
                        <Bbtn
                          onClick={() => afficheModale(ilot)}
                          type="button"
                          variant="info"
                          className="mx-2"
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
                  </>
                </div>
              ))}
              </div>
          </tr>
        </div>
      </div>
      <Modale
        titre="Modification de l'ilot"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Body>
          <div className="row">
            <div className="col">
              <input
                type="number"
                className={`form-control`}
                placeholder="Numéro Ilot"
                aria-label="Numéro Ilot"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
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
        titre="Suppression de l'ilot "
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      >
        <Modal.Body>
          <h3 align="center">Voulez vous supprimer l'ilot ?</h3>
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
