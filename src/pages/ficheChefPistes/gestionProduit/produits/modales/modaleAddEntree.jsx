import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import api from "src/api/api";

export default function ModalAddEntree({ produit, entree, ...props }) {
  const [invalid, setInvalid] = useState(false);
  const [produit_id, setProduitId] = useState(null);
  const [prix, setPrix] = useState(null);
  const [date_entre, setDateEntre] = useState(null);
  const [quantite, setQuantite] = useState(null);
  const [produits, setProduits] = useState(null);

  //notification
  const notifier = () =>
    toast.success("Ajout d'une entrée réussie !!!", {
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

  useEffect(() => {
    if (entree) {
      setPrix(entree?.prix);
      setProduitId(entree?.produit_id);
      setQuantite(entree?.quantite);
      setDateEntre(entree?.date_entre);
    } else {
      setPrix(produit?.pu);
      setProduitId(produit?.id);
    }
  }, [produit, entree]);

  //modifier categorie
  const updateEntree = async () => {
    if (
      (produit_id == "" && prix == "" && date_entre == "" && quantite == "") ||
      produit_id == null ||
      prix == null ||
      date_entre == null ||
      quantite == null
    ) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = {
        produit_id: produit_id,
        prix: prix,
        date_entre: date_entre,
        quantite: quantite,
      };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .put(`api/entres_m/${entree.id}`, data)
          .then((response) => {
            notifier();
            props.onHide();
          })
          .catch((err) => console.log(err));
      });
      setProduitId(null);
      setPrix(null);
      setDateEntre(null);
      setQuantite(null);
      setInvalid(false);
    }
  };
  //fin ajouter

  //ajouter categorie
  const addEntree = async () => {
    if (
      (produit_id == "" && prix == "" && date_entre == "" && quantite == "") ||
      produit_id == null ||
      prix == null ||
      date_entre == null ||
      quantite == null
    ) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = {
        produit_id: produit_id,
        prix: prix,
        date_entre: date_entre,
        quantite: quantite,
      };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/entres_m", data)
          .then((response) => {
            notifier("Modification de la sortie réussie !");
            props.onHide();
          })
          .catch((err) => console.log(err));
      });
      setProduitId(null);
      setPrix(null);
      setDateEntre(null);
      setQuantite(null);
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
          {props?.modifier ? (
            <h2 className="titre-dash">Modification</h2>
          ) : (
            <h2 className="titre-dash">Entrée : {produit && produit?.nom}</h2>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <div className="form-row">
              {/*  <div className="col">
                <label>Produit </label>
                <input
                  required
                  disabled
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  value={produit && produit?.nom}
                  //   placeholder=" Remplir Nom prodruit séléctionné"
                  //  name="produit_id"
                  // value={produit_id}
                  // onChange={(e) => setProduitId(e.target.value)}
                />
              </div> */}
              <div className="col">
                <label>Date d'entrée </label>
                <input
                  required
                  autoComplete="off"
                  type="date"
                  className="form-control"
                  value={entree?.date_entre}
                  onChange={(e) => setDateEntre(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row mt-2">
              <div className="col">
                <label>Prix</label>
                <input
                  required
                  autoComplete="off"
                  type="number"
                  className="form-control"
                  placeholder="Remplir le prix"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
              </div>
              <div className="col">
                <label>Quantité </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  placeholder="Remplir"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <button
          type="button"
          className="btn btn-primary monBtn"
          onClick={() => (props?.modifier ? updateEntree() : addEntree())}
        >
          {props?.modifier ? "Modifier" : "Enregistrer"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
