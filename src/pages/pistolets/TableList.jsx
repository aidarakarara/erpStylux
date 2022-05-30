import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
//import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";

import { Button } from "@material-ui/core";
import Modale from "../../components/Modale";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "../../components/Page";
import "./indexDashboard.css";
import api from "src/api/api";

export default function TableList({
  pistolets,
  deletePistol,
  updatePistol,
  showM,
}) {
  const [invalidI, setInvalidI] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const [numero, setNumero] = useState();
  const [prix, setPrix] = useState(null);
  const [carburant, setCarburant] = useState(null);
  const [pompeId, setPompeId] = useState(null);
  const [pistolet_id, setPistoletId] = useState();
  const [indexE, setindexE] = useState(null);
  const [indexM, setindexM] = useState(null);
  const [nom, setNom] = useState(null);
  const [pompes, setPompes] = useState([]);

  useEffect(() => {
    api.get("api/pompes").then((res) => setPompes(res.data));
  }, []);
  //Afficher le modale
  const afficheModale = (pistolet) => {
    setPistoletId(pistolet.id);
    setNumero(pistolet.numero);
    setPrix(pistolet.prix);
    setNom(pistolet.nom);
    setCarburant(pistolet.carburant);
    setPompeId(pistolet.pompe_id);
    setindexE(pistolet.indexE);
    setindexM(pistolet.indexM);
    setModalShow(true);
  };
  //Modifer la pompe

  const modifier = () => {
    const upPistolet = {
      id: pistolet_id,
      numero,
      nom,
      prix,
      indexE,
      indexM,
      carburant,
      pompe_id: pompeId,
    };
    updatePistol(upPistolet);
    setModalShow(false);
    notifier();
  };

  // Pour la suppression
  const confirmeDelete = (pistolet) => {
    setPistoletId(pistolet.id);
    setModalDeleteShow(true);
    //nitifer
  };

  //supprimer dans la base de donnée
  const supprimer = () => {
    setModalDeleteShow(false);
    //notifier
    deletePistol(pistolet_id);

    toast.warn(`Pistolet a été Suprimer`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // La notification de

  const notifier = () =>
    toast.success(`Pistolet a été modifiée`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [modalShow, setModalShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  return (
    <Page title="Liste des pistolets - Admin" className="indexDashbord">
      <div
        className="row justify-content-center"
        style={{ marginTop: "-60px" }}
      >
        <div className=" indexDashbord2 col-xs-12 col-sm-12 col-md-12">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ffa726, #fb8c00)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 60%)",
            }}
          >
            <h2 class="titre" >Liste des pistolets</h2>
          </div>{" "}
          <Bbtn
            style={{ width: "200px" }}
            variant="secondary"
            onClick={() => showM()}
          >
            Ajouter un pistolet
          </Bbtn>
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
          <table size="sm" className="table table-responsive" hover>
            <thead
              style={{
                background: "linear-gradient(60deg, #ffa726, #fb8c00)",
                color: "white",
              }}
            >
              <tr>
                <th style={{ textAlign: "center", width: "100px" }}>Numéro</th>
                <th style={{ textAlign: "center", width: "100px" }}>Nom</th>
                <th style={{ textAlign: "center", width: "100px" }}>
                  Carburant
                </th>
                <th style={{ textAlign: "center", width: "100px" }}>Prix</th>
                <th style={{ textAlign: "center", width: "200px" }}>
                  Index électronique
                </th>
                <th style={{ textAlign: "center", width: "200px" }}>
                  Index mécanique
                </th>
                <th style={{ textAlign: "center", width: "100px" }}>Pompe</th>
                <th style={{ textAlign: "center", width: "200px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pistolets.map((pistolet) => (
                <tr key={pistolet.id} style={{ cursor: "pointer" }}>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    {pistolet.numero}
                  </td>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    {pistolet.nom}
                  </td>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    {pistolet.carburant}
                  </td>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    {pistolet.prix}
                  </td>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    {pistolet.indexE}
                  </td>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    {pistolet.indexM}
                  </td>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    {pistolet.pompe_id}
                  </td>
                  <td style={{ textAlign: "center", cursor: "default" }}>
                    <Bbtn
                      onClick={() => afficheModale(pistolet)}
                      type="button"
                      variant="info"
                      className="mx-2"
                      //startIcon={}
                    >
                      <Icon icon={pencilIcon} />
                    </Bbtn>
                    <Bbtn
                      onClick={() => confirmeDelete(pistolet)}
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
        titre="Modifier un Pistolet"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Body>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className={`form-control ${invalid ? "is-invalid" : ""}`}
                placeholder="Numéro Pistolet"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="col">
              <select
                className={`form-control ${invalidI ? "is-invalid" : ""}`}
                onChange={(e) => setCarburant(e.target.value)}
                value={carburant}
              >
                <option value="">Carburant</option>
                <option value="super">Super</option>
                <option value="gasoil">Gasoil</option>
              </select>
            </div>
            <div className="col">
              <input
                value={prix}
                type="number"
                className={`form-control ${invalid ? "is-invalid" : ""}`}
                placeholder="Prix"
                onChange={(e) => setPrix(e.target.value)}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <input
                type="number"
                value={indexE}
                className={`form-control ${!indexE ? "is-invalid" : ""}`}
                placeholder="Indexe Electronique"
                onChange={(e) => setindexE(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="number"
                value={indexM}
                className={`form-control ${!indexM ? "is-invalid" : ""}`}
                placeholder="index Mecanique"
                onChange={(e) => setindexM(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className={`form-control`}
                placeholder="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <select
                className={`form-control ${invalidI ? "is-invalid" : ""}`}
                onChange={(e) => setPompeId(e.target.value)}
                value={pompeId}
              >
                <option value="">Pompes</option>
                {pompes.map((pompe) => (
                  <option key={pompe.id} value={pompe.id}>
                    {pompe.numero}
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
        titre="Supprimer Pistolet"
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      >
        <Modal.Body>
          <h5>Vouller vous vraiment supprimer la Pistolet ?</h5>
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
