import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { Button as Bbtn } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modale from "src/components/Modale";
import Page from "src/components/Page";
import "./indexDashboard.css";
export default function TableList({ users, supprimer, showM, restaurer }) {
  const [id, setId] = useState(null);
  //Afficher le modale
  const afficheModale = () => {
    setModalShow(true);
  };
  //Modifer la pompe

  const modifier = () => {
    setModalShow(false);
    notifier();
  };

  // Pour la suppression
  const confirmeDelete = (pid) => {
    setId(pid);
    setModalDeleteShow(true);
    //nitifer
  };
  // Pour la restauration
  const confirmeRestore = (pid) => {
    setId(pid);
    setModalRestoreShow(true);
    //nitiferhandleRestorer
  };
  //supprimer dans la base de donnée
  const handleSupprimer = () => {
    setModalDeleteShow(false);
    //notifie
    supprimer(id);
  };
  //restaurer dans la base de donnée
  const handleRestorer = () => {
    setModalRestoreShow(false);
    //notifie
    restaurer(id);
  };
  // La notification de

  const notifier = () =>
    toast.success(`user a été modifiée`, {
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
  const [modalRestoreShow, setModalRestoreShow] = useState(false);
  return (
    <Page title="Liste des employes - Admin" className="indexDashbord">
      <div
        className="row justify-content-center"
        style={{ marginTop: "-60px" }}
      >
        <div className="indexDashbord2 col-xs-10 col-sm-10 col-md-10">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #606c88, #3f4c6b)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(72 85 115 / 40%)",
            }}
          >
            <h2  className='titre' >Liste des utilisateurs</h2>
          </div>{" "}
          <Bbtn
            style={{ width: "200px" }}
            variant="secondary"
            onClick={() => showM()}
          >
            Ajouter un utilisateur
          </Bbtn>
          <div
            classNameName=" col-xs-1 col-sm-6 col-md-1 card-body "
            style={{ padding: "1px" }}q
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
                background: "linear-gradient(60deg, #3f4c6b, #606c88, #3f4c6b)",
                color: "white",
              }}
            >
              <tr>
                <th style={{ textAlign: "center"}}>
                  Numéro
                </th>
                <th style={{ textAlign: "center" }}>
                  Nom
                </th>
                {/*  <th style={{ textAlign: "center" }} scope="col">
                    Email
                  </th> */}
                <th style={{ textAlign: "center"}}>
                  Rôle
                </th>
                <th style={{ textAlign: "center"}}>
                  Etat
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td style={{ textAlign: "center", cursor: "default" }}>
                      {user.id}
                    </td>
                    <td style={{ textAlign: "center", cursor: "default" }}>
                      {user.name}
                    </td>
                    {/* <td style={{ textAlign: "center", cursor: "default" }}>
                        {user.email}
                      </td> */}
                    <td style={{ textAlign: "center", cursor: "default" }}>
                      <span className="badge rounded-pill p-2 bg-warning text-dark">
                        {user.role.nom}
                      </span>
                    </td>
                    {user.deleted_at ? (
                      <td style={{ textAlign: "center", cursor: "default" }}>
                        {/* <Bbtn
                            type="button"
                            variant="info"
                            onClick={() => confirmeRestore(user.id)}
                          >
                            <Icon icon={pencilIcon} />
                          </Bbtn> */}
                        <>
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              checked={false}
                              className="custom-control-input"
                              id={`switch${user.id}`}
                              onChange={() => confirmeRestore(user.id)}
                            />
                            <label
                              className="custom-control-label badge badge-warning"
                              htmlFor={`switch${user.id}`}
                            >
                              désactivé
                            </label>
                          </div>
                        </>
                      </td>
                    ) : (
                      <td style={{ textAlign: "center", cursor: "default" }}>
                        <>
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={`switch${user.id}`}
                              checked={true}
                              onChange={() => confirmeDelete(user.id)}
                            />
                            <label
                              className="custom-control-label badge badge-success"
                              htmlFor={`switch${user.id}`}
                            >
                              actif
                            </label>
                          </div>
                        </>
                        {/* <Bbtn
                            type="button"
                            variant="danger"
                            onClick={() => confirmeDelete(user.id)}
                          >
                            <Icon icon={deleteIcon} />
                          </Bbtn> */}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modale
        titre="Supprimer  un utilisateur"
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      >
        <Modal.Body>
          <p>Voulez-vous désactiver l'utilisateur ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Bbtn variant="danger" onClick={handleSupprimer}>
            Oui! Désactiver
          </Bbtn>
        </Modal.Footer>
      </Modale>
      <Modale
        titre="Résactiver  un utilisateur"
        show={modalRestoreShow}
        onHide={() => setModalRestoreShow(false)}
      >
        <Modal.Body>
          <p>Voulez-vous activer l'utilisateur ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Bbtn variant="success" onClick={handleRestorer}>
            Oui! Activer
          </Bbtn>
        </Modal.Footer>
      </Modale>
    </Page>
  );
}
