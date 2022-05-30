import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { separateur } from "src/utils/formatNumber";
import "./depense.css";
import { faTimes, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import api from "src/api/api";
import { useParams } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";
import ispompiste from "./useIsPompiste";
import isApprouve from "./useIsApprouve";
import { ToastContainer, toast } from "react-toastify";

export default function Depense() {
  const [params, setParams] = useState(useParams());
  const [depenses, setDepenses] = useState([]);
  const [caisse, setCaisse] = useState(null);

  //Ajouter une ligne das le tableau reglements
  function addLine() {
    var line = { justificatif: "", montant: null, caisse_id: params.caisse };
    setDepenses([...depenses, line]);
  }
  /**
   * Calcul De totald
   * @returns integer
   */

  /**
   *  Un fonction qui de changer la valeur de chaque input dans le tableau rdepenses
   * @param {*} index
   * @returns  interger
   */
  /*  const updateInputDepense = (index) => (e) => {
    let newArr = [...depenses];
    let prop = e.target.name;
    newArr[index][prop] = e.target.value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    setDepenses(newArr); // ??
  }; */

  const updateInputDepense = (index) => (e) => {
    let newArr = [...depenses];
    let prop = e.target.name;
    let value = e.target.value;
    if (prop == "montant") {
      value = value.toLocaleString();
      value = value.replace(/ /g, "");
    }
    newArr[index][prop] = value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    setDepenses(newArr); // ??
  };

  /*  function totalDepense() {
    var total = depenses
      .map((item) => item.montant)
      .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);

    return total;
  } */

  function totalDepense() {
    var total = 0;
    depenses.map((item) => {
      total = total + parseFloat(item.montant);
    });
    return total;
  }

  const separateur = (nombre) => {
    if (nombre) {
      nombre = `${nombre}`;
      // nombre = nombre.toLocaleString();
      return nombre
        .replace(/ /g, "")
        .replace(/[^0-9.]+/, "")
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    }
    return "";
  };

  /**
   *  suprimer une ligne da le tableau Depenses et dans la Base de donnée
   * @param {int} ligne_id
   * @param {Object} bonClient
   * @return void
   */
  function deleteLine(ligne_id, depense) {
    if (!depense.id) {
      setDepenses(depenses.filter((_, index) => index != ligne_id));
    } else {
      api.delete(`api/depenses/${depense.id}`).then((res) => {
        setDepenses(depenses.filter((_, index) => index != ligne_id));
      });
    }
    handleClose();
  }

  /**
   * Enregistrer/Modifier tous les Depenses
   */

  function notifierD() {
    toast.success("Sauvegarde réussie", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function saveAll() {
    api.get("sanctum/csrf-cookie").then((response) => {
      depenses.map((depense) => {
        if (depense.id) {
          api
            .put(`api/depenses/${depense.id}`, depense)
            .then((res) => console.log("depenses Faites"));
        } else {
          api
            .post("api/depenses", depense)
            .then((res) => console.log("depenses Faites"));
        }
      });
      notifierD();
    });
  }

  /**
   * USEEFFECT
   */
  useEffect(() => {
    api.get(`api/caisses/${params.caisse}`).then((res) => {
      setCaisse(res.data.caisse);
      if (res.data.depenses.length == 0) {
        setDepenses([
          ...depenses,
          {
            justificatif: "",
            montant: null,
            caisse_id: params.caisse,
          },
        ]);
      } else {
        setDepenses(res.data.depenses);
      }
    });
  }, []);
  // FIN USEFFECT

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [id, setId] = useState(null);
  const [depense, setDepense] = useState(null);
  function handleShow(i, d) {
    setDepense(d);
    setId(i);
    setShow(true);
  }

  return (
    <div className="depenses">
      <ToastContainer
        style={{ marginTop: "40px" }}
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Table className="table-valeur" bordered hover size="sm">
        <thead>
          <tr>
            <th
              className="table-bordered-dark table-warning text-center  border-dark border-bottom-0"
              colSpan="3"
            >
              DEPENSES
            </th>
          </tr>
        </thead>
        <thead className="sous-titre table-bordered text-center">
          <tr>
            <th className="border-dark border-bottom-0">JUSTIFICATIF</th>
            <th className="border-dark border-bottom-0">MONTANTS</th>
          </tr>
        </thead>
        <tbody>
          {depenses &&
            depenses.map((depense, index) => (
              <tr key={index}>
                <td
                  className="td-input border-dark border-bottom-0"
                  style={{ verticalAlign: "middle" }}
                >
                  <select
                    style={{ fontSize: "18px" }}
                    autoComplete="off"
                    className="form-control"
                    name="justificatif"
                    onChange={updateInputDepense(index)}
                    value={depense.justificatif}
                    disabled={
                      ispompiste() && !isApprouve(caisse && caisse.approuve)
                        ? false
                        : true
                    }
                  >
                    <option selected>---</option>
                    <option value="Baie">Baie</option>
                    <option value="Groupe">Groupe</option>
                    <option value="Transport">Transport</option>
                    <option value="Véhicule Fonctionnaire">
                      Véhicule Fonctionnaire
                    </option>
                    <option value="Personnel - Quinzaine et autres">
                      Personnel - Quinzaine et autres
                    </option>
                    <option value="R. DIOP">R. DIOP</option>
                    <option value="Personnel - Prêts">Personnel - Prêts</option>
                    <option value="Entretien et Pharmacie">
                      Entretien et Pharmacie
                    </option>
                    <option value="Accessoires">Accessoires</option>
                    <option value="Frais Banque">Frais Banque</option>
                    <option value="Chèque versement anticipé">
                      Chèque versement anticipé
                    </option>
                    <option value="Lubrifiants">Lubrifiants</option>
                    <option value="Personnel - Extérieur">
                      Personnel - Extérieur
                    </option>
                    <option value="Téléphone">Téléphone</option>
                    <option value="Four bur">Four bur</option>
                    <option value="Dons">Dons</option>
                    <option value="Divers">Divers</option>
                  </select>
                  {/*  <input
                    style={{ fontSize: "18px" }}
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    value={depense.justificatif}
                    onChange={updateInputDepense(index)}
                    name="justificatif"
                  /> */}
                  <span></span>
                </td>

                <td
                  className="td-input border-dark border-bottom-0"
                  style={{ verticalAlign: "middle" }}
                >
                  <input
                    required
                    style={{ fontSize: "18px" }}
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    value={separateur(depense.montant)}
                    onChange={updateInputDepense(index)}
                    name="montant"
                    disabled={
                      ispompiste() && !isApprouve(caisse && caisse.approuve)
                        ? false
                        : true
                    }
                  />
                  <span></span>
                  {ispompiste() && !isApprouve(caisse && caisse.approuve) ? (
                    <button
                      type="button"
                      className="btn  del-btn m-1"
                      /*onClick={() => deleteLine(index, depense)}*/
                      onClick={() => handleShow(index, depense)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          <tr>
            <th
              className="table-bordered  text-center border-dark"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              TOTAL DEPENSES
            </th>
            <td
              className="table-bordered  text-center border-dark"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {
                /* separateur */ totalDepense()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
              FCFA
            </td>
          </tr>
        </tbody>
      </Table>
      {ispompiste() && !isApprouve(caisse && caisse.approuve) ? (
        <Table
          className="justify-content-center "
          style={{ textAlign: "center" }}
        >
          <button
            className="btn btn-info m-1"
            title="Supprimer"
            onClick={addLine}
          >
            Ajouter
          </button>

          <button className="btn btn-success m-2" onClick={saveAll}>
            Sauvegarder
          </button>
        </Table>
      ) : null}
      {/*<div className="row">
        <button className="btn btn-info" title="Supprimer" onClick={addLine}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <button className="btn btn-success ml-6" onClick={saveAll}>
          Sauvegarder
        </button>
      </div>*/}

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
          <Button variant="danger" onClick={() => deleteLine(id, depense)}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
