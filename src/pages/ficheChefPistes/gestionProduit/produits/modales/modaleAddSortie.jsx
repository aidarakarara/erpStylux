import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import api from "src/api/api";

export default function ModalAddSortie({ produit, sortie, ...props }) {
  const [invalid, setInvalid] = useState(false);
  const [produit_id, setProduitId] = useState(null);
  const [date_sortie, setDateSortie] = useState(null);
  const [quantite, setQuantite] = useState(null);
  const [prix, setPrix] = useState(null);
  const [produits, setProduits] = useState(null);

  //notification
  const notifier = (data = "Ajout d'une sortie réussie !!!") =>
    toast.success(data, {
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
    if (sortie) {
      setPrix(sortie?.prix);
      setProduitId(sortie?.produit_id);
      setQuantite(sortie?.quantite);
      setDateSortie(sortie?.date_sortie);
    } else {
      setPrix(produit?.pu);
      setProduitId(produit?.id);
    }
    // api.get("api/produits").then((res) => setProduits(res.data));
  }, [produit, sortie]);

  //modifier
  const updateSortie = () => {
    if (
      (produit_id == "" && date_sortie == "" && quantite == "" && prix == "") ||
      produit_id == null ||
      date_sortie == null ||
      quantite == null ||
      prix == null
    ) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = {
        produit_id: produit_id,
        date_sortie: date_sortie,
        quantite: quantite,
        prix: prix,
      };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .put(`api/sorties_m/${sortie.id}`, data)
          .then((response) => {
            notifier("modifier reussi rerhnk;hv,n");
            props.onHide();
          })
          .catch((err) => console.log(err));
      });
      setProduitId(null);
      setDateSortie(null);
      setQuantite(null);
      setPrix(null);
      setInvalid(false);
    }
  };
  //fin modifier
  
  //supprimer
  const deleteSortie = () => {
    if (
      (produit_id == "" && date_sortie == "" && quantite == "" && prix == "") ||
      produit_id == null ||
      date_sortie == null ||
      quantite == null ||
      prix == null
    ) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = {
        produit_id: produit_id,
        date_sortie: date_sortie,
        quantite: quantite,
        prix: prix,
      };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .delete(`api/sorties_m/${sortie.id}`, data)
          .then((response) => {
            notifier("modifier reussi rerhnk;hv,n");
            props.onHide();
          })
          .catch((err) => console.log(err));
      });
      setProduitId(null);
      setDateSortie(null);
      setQuantite(null);
      setPrix(null);
      setInvalid(false);
    }
  };
  //fin supprimer

  //ajouter sortie
  const addSortie = async () => {
    if (
      (produit_id == "" && date_sortie == "" && quantite == "" && prix == "") ||
      produit_id == null ||
      date_sortie == null ||
      quantite == null ||
      prix == null
    ) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = {
        produit_id: produit_id,
        date_sortie: date_sortie,
        quantite: quantite,
        prix: prix,
      };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/sorties_m", data)
          .then((response) => {
            notifier();
            props.onHide();
          })
          .catch((err) => console.log(err));
      });
      setProduitId(null);
      setDateSortie(null);
      setQuantite(null);
      setPrix(null);
      setInvalid(false);
    }
  };
  //fin ajouter

  return (
    <div>
    <ToastContainer
        position="top-right"
        style={{ marginTop: "50px" }}
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
            <h2 className="titre-dash">sortie : {produit && produit?.nom}</h2>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <div className="form-row">
              {/* <div className="col">
                <label>Produit</label>
                <input
                  required
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Rempli automatiquement"
                  value={produit_id}
                  onChange={(e) => setProduitId(e.target.value)}
                />
              </div> */}

              <div className="col">
                <label>Date de sortie</label>
                <input
                  required
                  autoComplete="off"
                  type="date"
                  className="form-control"
                  value={date_sortie}
                  onChange={(e) => setDateSortie(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row mt-2">
              <div className="col">
                <label>Prix </label> 
                <input
                  required
                  autoComplete="off"
                  type="number"
                  className="form-control"
                  placeholder="Remplir"
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
                  name="quantite"
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
          onClick={() => (props?.modifier ? updateSortie() : addSortie())}
        >
          {props?.modifier ? "Modifier" : "Enregistrer"}
        </button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}
