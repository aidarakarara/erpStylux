import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "src/api/api";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTimes,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { identity } from "lodash";

export default function ModaleAddInventaire(props) {
  const [produit_id, setProduitId] = useState(null);
  const [qte_reelle, setQtereelle] = useState(null);
  const [date_inventaire, setDateInv] = useState(null);
  const [produits, setProduits] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const [entrees, setEntrees] = useState(null);
  const [categories, setCategories] = useState([]);
  const [produitsFiltre, setProduitsFiltre] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [showModalAddInventaire, setShowModalAddInventaire] = useState(false);
  function search(term = "") {
    const delayDebounceFn = setTimeout(() => {
      setloading(true);
      api.get(`api/produits?search=${term}`).then((res) => {
        setProduitsFiltre(res.data.data);
        setProduits(res.data);
        clearTimeout(delayDebounceFn);
        setloading(false);
      });
    }, 3000);
  }

  function handleCherche(term = null) {
    if (term === "tous") {
      setProduitsFiltre(produits.data);
    } else {
      setProduitsFiltre(
        produits.data.filter((produit) => produit?.categorie_id === term)
      );
    }
  }

  const fetchData = async (pageNumber = 1) => {
    setloading(true);
    api.get(`api/produits?page=${pageNumber}`).then((res) => {
      setProduitsFiltre(res.data.data);
      setProduits(res.data);
      setloading(false);
    });
  };

  useEffect(() => {
    fetchData();
    api.get("api/categories").then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    fetchData();
    api.get("api/entres_m").then((res) => setEntrees(res.data));
  }, []);
  //notification
  const notifier = () =>
    toast.success("Sauvegarde réussie !", {
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
  //ajouter inventaire
  const addEntree = async () => {
    if (
      (produit_id == "" && qte_reelle == "" && date_inventaire == "") ||
      produit_id == null ||
      qte_reelle == null ||
      date_inventaire == null
    ) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = {
        produit_id: produit_id,
        qte_reelle: qte_reelle,
        date_inventaire: date_inventaire,
      };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/inventaires", data)
          .then((response) => {
            props.onHide();
            notifier();
          })
          .catch((err) => console.log(err));
        notifier();
      });
      setProduitId(null);
      setQtereelle(null);
      setDateInv(null);
      setInvalid(false);
    }
  };
  //fin ajouter
  //Ajouter une ligne
  const [inventaires, setInventaires] = useState([
    {
      date_inventaire: date_inventaire,
      qte_reelle: 0,
      produit_id: "",
    },
  ]);
  function addLine() {
    var line = {
      produit_id: "",
      qte_reelle: null,
      date_inventaire: date_inventaire,
    };
    setInventaires([...inventaires, line]);
  }
  //supprimer une ligne
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [id, setId] = useState(null);
  const [inventaire, setInventaire] = useState(null);
  function handleShow(i, inv) {
    setInventaire(inv);
    setId(i);
    setShow(true);
  }
  function deleteLine(ligne_id, inventaire) {
    if (!inventaire.id) {
      setInventaires(
        inventaires.filter((inventaires, index) => index != ligne_id)
      );
    } else {
      api.delete(`api/inventaires/${inventaire.id}`).then((res) => {
        setInventaires(
          inventaires.filter((inventaire, index) => index != ligne_id)
        );
      });
    }
    handleClose();
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          <div className="row">
            <div className="col-8 titre-dash"> Inventaire du jour</div>
            <div className="col-4">
              <input
                style={{ width: "200px" }}
                type="date"
                name="date_inventaire"
                className={`browser form-control text-center ${
                  invalid ? "is-invalid" : ""
                }`}
                onChange={(e) => setDateInv(e.target.value)}
              />
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <table class="table table-hover table-responsive-lg">
            <thead style={{ background: "whitesmoke" }}>
              <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
                <th
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                  scope="col"
                >
                  #
                </th>

                <th
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                  scope="col"
                >
                  Nom du produit
                </th>
                <th
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                  scope="col"
                >
                  Quantité réelle
                </th>
                <th
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                  scope="col"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {inventaires &&
                inventaires.map((inventaire, index) => (
                  <tr
                    key={index}
                    style={{ textAlign: "left", verticalAlign: "middle" }}
                  >
                    <th
                      style={{ textAlign: "left", verticalAlign: "middle" }}
                      scope="row"
                    >
                      {index + 1}
                    </th>
                    <td
                      className="td-input border-dark border-bottom-0"
                      style={{ verticalAlign: "middle" }}
                    >
                      <input
                        name="produit_id"
                        list="browsers"
                        autoComplete="off"
                        className={`browser form-control text-center ${
                          invalid ? "is-invalid" : ""
                        }`}
                        id="browser"
                        placeholder="chercher ici"
                        onChange={(e) => setProduitId(e.target.value)}
                      />
                      <datalist id="browsers">
                        {produitsFiltre &&
                          produitsFiltre.map((p, index) => (
                            <option key={index} value={p?.id}>
                              {p?.nom}
                            </option>
                          ))}
                      </datalist>
                    </td>

                    <td
                      className="td-input border-dark border-bottom-0"
                      style={{
                        verticalAlign: "middle",
                        alignContent: "center",
                      }}
                    >
                      <input
                        style={{
                          fontSize: "18px",
                          width: "120px",
                          margin: "auto",
                        }}
                        autoComplete="off"
                        className={`form-control text-center ${
                          invalid ? "is-invalid" : ""
                        }`}
                        type="number"
                        name="qte_reelle"
                        onChange={(e) => setQtereelle(e.target.value)}
                      />
                    </td>

                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {" "}
                      <button type="button" className="btn  del-btn">
                        <FontAwesomeIcon
                          icon={faTimes}
                          onClick={() => handleShow(index, inventaire)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </form>
        <Modal
          style={{ margin: "50px" }}
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Voulez-vous vraiment effectuer ses changements ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Non
            </Button>
            <Button variant="danger" onClick={() => deleteLine(id, inventaire)}>
              Oui
            </Button>
          </Modal.Footer>
        </Modal>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => addLine()}
        >
          + Ligne
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addEntree()}
        >
          Enregistrer
        </button>
      </Modal.Footer>
    </Modal>
  );
}
