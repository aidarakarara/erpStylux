import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import api from "src/api/api";

export default function ModaleAddCategorie(props) {
  const [invalid, setInvalid] = useState(false);
  const [nom, setNom] = useState(null);

  //notification
  const notifier = () =>
    toast.success("Ajout d'un produit réussi !!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const erorMsg = () =>
    toast.error("Veuillez renseigner le champ !!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //fin notification

  //ajouter categorie
  const addCat = async () => {
    if (nom == "" || nom == null) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = { nom: nom };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/categories", data)
          .then((response) => {
            notifier();
          })
          .catch((err) => console.log(err));
      });

      props.onHide();
      setNom(null);
      setInvalid(false);
    }
  };
  //fin ajouter

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 className="titre-dash">Ajout d'une catégorie</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          required
          type="text"
          className={`form-control ${invalid ? "is-invalid" : ""}`}
          aria-label="Amount (to the nearest dollar)"
          placeholder="veuillez remplir le nom du catégorie"
          onChange={(e) => setNom(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <button
          onClick={() => addCat()}
          type="button"
          className="btn btn-primary monBtn"
        >
          Enregistrer
        </button>
      </Modal.Footer>
    </Modal>
  );
}
