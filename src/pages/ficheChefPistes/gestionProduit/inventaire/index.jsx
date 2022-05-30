import React, { useState, useEffect } from "react";
import Cartes from "./partials/cartes";
import api from "src/api/api";
import Pagination from "react-js-pagination";
import { Button as Bbtn } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Page from "src/components/Page";
import Loader from "src/components/loader";
import { Link } from "react-router-dom";
import ModaleDetailProduit from "../../gestionProduit/produits/modales/modaleDetailProduit";
import "./inventaire.css";
const MesCartes = [
  {
    total: 49,
    titre: "total produits",
    details: [1, 2, 500],
  },
  {
    total: 23,
    titre: "Entrees",
    details: [1, 2, 500],
  },
  {
    total: 26,
    titre: "Sortie",
    details: [1, 2, 500],
  },
  {
    total: 26,
    titre: "Sortie",
    details: [1, 2, 500],
  },
];
export default function Inventaire(...props) {
  /*  const [produits, setProduits] = useState(null);
  const [categories, setCategories] = useState([]);
  const [inventaires, setInventaires] = useState([]);
  const [produitsFiltre, setProduitsFiltre] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  //modal
  const [showModalDetailProduit, setShowModalDetailProduit] = useState(false);
  const [selectDetailProduit, setSelectDetailProduit] = useState(false);

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
    api.get("api/inventaires").then((res) => setInventaires(res.data));
  }, []);

  //Gerer Modal Detail Produit
  function handleSelectDetailProduit(data) {
    setSelectDetailProduit(data);
    setShowModalDetailProduit(true);
  } */

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [approuve, setApprouve] = useState(false);
  const [date_inv, setDateInv] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const [tabinventaires, setTabinventaires] = useState([]);
  const [loading, setLoading] = useState(false);

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
      (approuve == "" && date_inv == "") ||
      approuve == null ||
      date_inv == null
    ) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = {
        approuve: false,
        date_inv: date_inv,
      };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/tabinventaires", data)
          .then((response) => {
            notifier();
            handleClose(true);
          })
          .catch((err) => console.log(err));
        notifier();
      });
      setApprouve(false);
      setDateInv(null);
      setInvalid(false);
    }
  };
  //fin ajouter

  useEffect(() => {
    api.get("api/tabinventaires").then((res) => setTabinventaires(res.data));
    setLoading(false);
  }, []);

  return (
    /*  <div className="container-fluid m-2 card">
      <div className="row m-2 p-3 justify-content-end">
        <Link to="/chefpistes/Inventaire/ListeInventaire">
          <a type="button" className="btn btn-success p-2 monBtn">
            Etat des stocks
          </a>
        </Link>
      </div>
      
      <div className="row">
        {MesCartes.map((carte, index) => (
          <Cartes carte={carte} key={index} />
        ))}
      </div>
      

      <h2 className="titre-dash mt-3">Liste des Produits</h2>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="row my-3">
            <div className="col-8">
              <button
                class="btn btn-outline-secondary youtube"
                onClick={() => handleCherche("tous")}
              >
                Tous
              </button>
              {categories &&
                categories.map((categorie, index) => (
                  <button
                    key={index}
                    class="btn btn-outline-secondary mx-2 youtube"
                    onClick={() => handleCherche(categorie?.id)}
                  >
                    {categorie?.nom}
                  </button>
                ))}
            </div>
            <div className="input-group col-4 justify-content-end">
              <div className="form-outline">
                <input
                  type="search"
                  className="form-control"
                  placeholder="search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    search(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <table className="table table-hover table-bordered monTableau">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th style={{ textAlign: "left" }}>Nom produit</th>
                <th>Prix unitaire</th>
                <th>Qte réelle</th>
                <th>Qte théorique</th>
                <th>Action</th>
               
              </tr>
            </thead>
            <tbody>
              {produitsFiltre &&
                produitsFiltre.map((produit) => (
                  <tr key={produit.id}>
                    <td style={{ textAlign: "left" }}>{produit?.nom}</td>
                    <td>{produit?.pu}</td>
                    <td>{produit?.qte_reel}</td>
                    <td>{produit?.qte_theorique}</td>
                    <td className="py-1">
                      <button
                        type="button"
                        className="btn btn-primary monBtnCat p-1 "
                        onClick={() => handleSelectDetailProduit(produit)}
                      >
                        DETAILS
                      </button>
                      <ModaleDetailProduit
                        produit={selectDetailProduit}
                        show={showModalDetailProduit}
                        modifier={true}
                        onHide={() => setShowModalDetailProduit(false)}
                      />{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="row justify-content-center">
            <table>
              <div>
                <Pagination
                  activePage={
                    produits?.current_page ? produits?.current_page : 0
                  }
                  itemsCountPerPage={
                    produits?.per_page ? produits?.per_page : 0
                  }
                  totalItemsCount={produits?.total ? produits?.total : 0}
                  onChange={(pageNumber) => {
                    fetchData(pageNumber);
                  }}
                  pageRangeDisplayed={10}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="Début"
                  lastPageText="Fin"
                />
              </div>
            </table>
          </div>
        </div>
      )}
    </div> */
    <div>
      <Page title="Liste des inventaires" className="indexDashbord">
        <div
          className="row justify-content-center"
          style={{ marginTop: "10px" }}
        >
          <div className=" indexDashbord2 col-xs-7 col-sm-7 col-md-7">
            <div
              style={{
                fontSize: 30,
                background: "linear-gradient(60deg, #ef5350, #e53935)",
                color: "white",
                textAlign: "center",
                margin: "auto",
                width: "75%",
                marginBottom: "15px",
                marginTop: "-35px",
                boxShadow:
                  "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(244 67 54 / 40%)",
              }}
            >
              <span>Liste des inventaires</span>
            </div>{" "}
            <Bbtn
              style={{ width: "200px", marginBottom: "10px" }}
              variant="secondary"
              onClick={handleShow}
            >
              Faire un inventaire
            </Bbtn>
            <table size="sm" className="table table-responsive-lg" hover>
              <thead
                style={{
                  background: "linear-gradient(60deg, #ef5350, #e53935)",
                  color: "white",
                }}
              >
                <tr>
                  <th
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    #
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    Date inventaire
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    Etat
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabinventaires &&
                  tabinventaires.map((inv, index) => (
                    <tr
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                      key={index}
                    >
                      <Link to="/chefpistes/Inventaire/ListeInventaire">
                        <td>F.{inv.id}</td>
                      </Link>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {inv.date_inv}
                      </td>

                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {inv.approuve == 0 ? (
                          <badge
                            className="badge badge-warning text-ligh badge-sm p-1"
                            style={{ borderRadius: "50px" }}
                          >
                            non approuvé
                          </badge>
                        ) : (
                          <badge
                            className="badge badge-success text-ligh badge-sm p-1"
                            style={{ borderRadius: "50px" }}
                          >
                            {" "}
                            approuvé
                          </badge>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Page>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "300px" }}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'un inventaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="col-lg">
            <label>Date d'enregistrement</label>
            <input
              /*  style={{ width: "200px" }} */
              type="date"
              name="date_inv"
              className={`form-control text-center ${
                invalid ? "is-invalid" : ""
              }`}
              onChange={(e) => setDateInv(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => addEntree()}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
