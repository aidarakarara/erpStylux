import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";

import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import "./ficheAccessoire.css";
import { Table, Form } from "react-bootstrap";
import api from "../../api/api";
import Tr from "./Tr";
import ischefpiste from "./useIsChefpistes";
import isApprouve from "./useIsApprouve";

export default function Ficheaccessoire() {
  // var today = new Date().toLocaleDateString();

  let { date } = useParams();
  const [produits, setProduits] = useState(null);
  const updateInputAccessoire = (index) => (e) => {
    let newArr = [...accessoires];
    let prop = e.target.name;
    newArr[index][prop] = e.target.value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    SetAccessoires(newArr); // ??
  };

  const [accessoires, SetAccessoires] = useState([
    {
      produit: "",
      ouverture: 0,
      entrant: 0,
      fermeture: 0,
      prixunitaire: 0,
      date_accessoire: date,
    },
  ]);
  useEffect(() => {
    {
      /* tabaccs &&
        tabaccs?.map((t) => { */
      api
        .get(`api/accessoire-date/${date}`)
        .then((res) => SetAccessoires(res.data));
      /* }); */
    }
  }, []);

  function addLine() {
    var line = {
      produit: "",
      ouverture: 0,
      entrant: 0,
      fermeture: 0,
      prixunitaire: 0,
      date_accessoire: date,
    };
    SetAccessoires([...accessoires, line]);
  }

  function deleteLine(ligne_id, lavage) {
    if (!accessoire.id) {
      SetAccessoires(
        accessoires.filter((accessoire, index) => index != ligne_id)
      );
    } else {
      api.delete(`api/accessoires/${accessoire.id}`).then((res) => {
        SetAccessoires(
          accessoires.filter((accessoire, index) => index != ligne_id)
        );
      });
    }
    handleClose();
    suppr(true);
  }

  function notifier() {
    toast.success("Sauvegarde accessoire réussie", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const erorMsg = () =>
    toast.error("Vous devez  renseigner les tous le champs", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  function saveAll() {
    api.get("sanctum/csrf-cookie").then((response) => {
      accessoires.map((accessoire) => {
        if (accessoire.id) {
          api
            .put(`api/accessoires/${accessoire.id}`, accessoire)
            .then((res) => console.log("accessoires Faits"));
        } else {
          api
            .post("api/accessoires", accessoire)
            .then((res) => console.log("accessoires Faits"));
        }
      });
      notifier();
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [id, setId] = useState(null);
  const [accessoire, setAccessoire] = useState(null);
  function handleShow(i, d) {
    setAccessoire(d);
    setId(i);
    setShow(true);
  }
  function suppr() {
    toast.warning("Fait !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function montantparligne(index) {
    var ligne = accessoires[index];
    var somme = 0;
    somme =
      (parseInt(ligne.ouverture) +
        parseInt(ligne.entrant) -
        parseInt(ligne.fermeture)) *
      parseInt(ligne.prixunitaire);
    return somme;
  }

  function montanttotal() {
    let total = 0;
    accessoires &&
      accessoires.map((_, index) => {
        total += montantparligne(index);
      });
    return total;
  }

  const [params, setParams] = useState(useParams());
  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour} - ${mois} - ${d.getFullYear()}`;
  }
  useEffect(() => {
    api.get("api/produits").then((res) => setProduits(res.data));
  }, []);
  return (
    <div className="ficheAccessoire p-5">
      <ToastContainer
        style={{ marginTop: "60px" }}
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
      <div className="entete-fiche">
        <div className="info-stylux">
          <img src="/images/logo_ok.jpg" style={{ margin: "auto" }} />
          <div>Km 12 Route de Rufisque / Thiaroye sur mer</div>
          <div>NINEA : 006984604 - RC:SN DKR.2018.A.23163</div>
          <div>Tél : 77 577 89 05</div>
        </div>
        <Table bordered className="info-jour" size="sm">
          <tbody>
            <tr>
              <th> DATE </th>
              <td> {formatdate(date)} </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="center">
        <h2>
          <strong> FICHE ACCESSOIRE </strong>
        </h2>
      </div>

      <table
        className="table table-hover table-bordered table-responsive-lg"
        style={{ marginTop: 20 }}
      >
        <thead className="center">
          <tr>
            <th style={{ width: "22%" }}> DESIGNATIONS </th>
            <th> OUVERTURE </th>
            <th> ENTRANT </th>
            <th> TOTAL </th>
            <th> FERM </th>
            <th> VENTE </th>
            <th> PRIX UNITAIRE</th>
            <th style={{ width: "200px" }}> MONTANT TOTAL </th>
          </tr>
        </thead>

        <tbody className="center">
          {accessoires &&
            accessoires.map((acc, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: "middle" }} name="poste">
                  <input
                    name="produit"
                    type="text"
                    autoComplete="off"
                    className="form-control text-center"
                    placeholder="saisir produit"
                    value={acc.produit}
                    onChange={updateInputAccessoire(index)}
                  />

                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control text-center"
                    type="number"
                    name="ouverture"
                    required
                    value={acc.ouverture}
                    onChange={updateInputAccessoire(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control text-center"
                    type="number"
                    name="entrant"
                    required
                    value={acc.entrant}
                    onChange={updateInputAccessoire(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    disabled
                    className="form-control text-center"
                    type="number"
                    name="total"
                    value={Number(acc.ouverture) + Number(acc.entrant)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control text-center"
                    type="number"
                    name="fermeture"
                    required
                    value={acc.fermeture}
                    onChange={updateInputAccessoire(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control text-center"
                    disabled
                    type="number"
                    name="vente"
                    value={
                      Number(acc.ouverture) +
                      Number(acc.entrant) -
                      Number(acc.fermeture)
                    }
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control text-center"
                    type="text"
                    name="prixunitaire"
                    value={acc.prixunitaire}
                    onChange={updateInputAccessoire(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    disabled
                    className="form-control text-center"
                    type="number"
                    name="mt"
                    value={
                      Number(acc.prixunitaire) *
                      (Number(acc.ouverture) +
                        Number(acc.entrant) -
                        Number(acc.fermeture))
                    }
                  />
                  <span></span>
                </td>
                {ischefpiste() ? null : (
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn  del-btn m-1"
                      onClick={() => handleShow(index, acc)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          <tr>
            <td colSpan={7}> MONTANT TOTAL ACCESSOIRES</td>
            <td className="form-control text-center"> {montanttotal()} FCFA</td>
          </tr>
        </tbody>
      </table>

      {ischefpiste() ? null : (
        <tfooter>
          <button
            className="btn btn-info m-1"
            title="Ajouter"
            onClick={addLine}
          >
            Ajouter
          </button>

          <button className="btn btn-success m-2" onClick={saveAll}>
            Sauvegarder
          </button>
        </tfooter>
      )}
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
          <Button variant="danger" onClick={() => deleteLine(id, accessoire)}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
