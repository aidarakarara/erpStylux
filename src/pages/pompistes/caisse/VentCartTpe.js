import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { separateur } from "src/utils/formatNumber";
import "./ventCartTpe.css";
import { faTimes, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import api from "src/api/api";
import { useParams } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";
import ispompiste from "./useIsPompiste";
import isApprouve from "./useIsApprouve";
import { ToastContainer, toast } from "react-toastify";

export default function VentCartTpe() {
  const [params, setParams] = useState(useParams());
  const [caisse, setCaisse] = useState(null);
  //venteTpes
  const [ventes, setVentes] = useState([]);
  const [id, setId] = useState(null);
  const [vente, setVente] = useState(null);
  //Ajouter une ligne dans le tableau
  function addLine() {
    var line = { numero_carte: "", montant: null, caisse_id: params.caisse };
    setVentes([...ventes, line]);
  }
  function notifierT() {
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

  function deleteLine(ligne_id, vente) {
    if (!vente.id) {
      setVentes(ventes.filter((vente, index) => index != ligne_id));
    } else {
      api.delete(`api/venteTpes/${vente.id}`).then((res) => {
        setVentes(ventes.filter((vente, index) => index != ligne_id));
      });
    }
    handleClose();
  }

  /**
   *  Un fonction qui de changer la valeur de chaque input dans le tableau reglements
   * @param {*} index
   * @returns  interger
   */
  const updateInputVente = (index) => (e) => {
    let newArr = [...ventes];
    let prop = e.target.name;
    let value = e.target.value;
    if (prop == "montant") {
      value = value.toLocaleString();
      value = value.replace(/ /g, "");
    }
    newArr[index][prop] = value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    setVentes(newArr); // ??
  };
  function totalTpe() {
    var total = 0;
    ventes.map((item) => {
      total = total + parseFloat(item.montant);
    });
    // .reduce((prev = 0, next = 0) => prev + next, 0);
    return total;
  }
  useEffect(() => {
    api.get(`api/caisses/${params.caisse}`).then((res) => {
      //{ numero_carte: "", montant: null, caisse_id: params.caisse }
      setCaisse(res.data.caisse);
      if (res.data.venteTpes.length == 0) {
        setVentes([
          ...ventes,
          { numero_carte: "", montant: null, caisse_id: params.caisse },
        ]);
      } else {
        setVentes(res.data.venteTpes);
      }
    });
  }, []);

  /**
   * Enregistrer/Modifier tous les bonclients
   */
  function saveAll() {
    api.get("sanctum/csrf-cookie").then((response) => {
      ventes.map((vente) => {
        if (vente.id) {
          api
            .put(`api/venteTpes/${vente.id}`, vente)
            .then((res) => console.log("venteTpes Faites"));
        } else {
          api
            .post("api/venteTpes", vente)
            .then((res) => console.log("venteTpes Faites"));
        }
      });
      notifierT();
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  function handleShow(i, v) {
    setVente(v);
    setId(i);
    setShow(true);
  }

  return (
    <div className="venteTpes">
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
              className="table-bordered-dark table-primary text-center  border-dark border-bottom-0"
              colSpan="3"
            >
              VENTES PAR CARTE TPE
            </th>
          </tr>
        </thead>
        <thead className="sous-titre table-bordered text-center ">
          <tr>
            <th className="border-dark border-bottom-0">N° DE LA CARTE </th>
            <th className="border-dark border-bottom-0">MONTANTS</th>
          </tr>
        </thead>
        <tbody>
          {ventes &&
            ventes.map((vente, index) => (
              <tr key={index}>
                <td
                  className="td-input border-dark border-bottom-0"
                  style={{ verticalAlign: "middle" }}
                >
                  <input
                    style={{ fontSize: "18px" }}
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    value={vente.numero_carte}
                    onChange={updateInputVente(index)}
                    name="numero_carte"
                    disabled={
                      ispompiste() && !isApprouve(caisse && caisse.approuve)
                        ? false
                        : true
                    }
                  />
                  <span></span>
                </td>

                <td
                  className="td-input  border-dark border-bottom-0"
                  style={{ verticalAlign: "middle" }}
                >
                  <input
                    style={{ fontSize: "18px" }}
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    value={separateur(vente.montant)}
                    onChange={updateInputVente(index)}
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
                      /*onClick={() => deleteLine(index, vente)}*/
                      onClick={() => handleShow(index, vente)}
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
              TOTAL TPE
            </th>
            <td
              className="table-bordered  text-center border-dark"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {
                /* separateur */ totalTpe()
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
          <button className="btn btn-info m-1" onClick={addLine}>
            Ajouter
          </button>
          <button className="btn btn-success m-2" onClick={saveAll}>
            Sauvegarder
          </button>
        </Table>
      ) : null}
      <div className="row">
        {/*  <button className="btn btn-info" onClick={addLine}>
          <FontAwesomeIcon icon={faPlus} />
          Ajouter
                </button>*/}
      </div>
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
          <Button variant="danger" onClick={() => deleteLine(id, vente)}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
