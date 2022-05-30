import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { separateur } from "src/utils/formatNumber";
import "./bonClie.css";
import { faTimes, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import api from "src/api/api";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ispompiste from "./useIsPompiste";
import isApprouve from "./useIsApprouve";
import { ToastContainer, toast } from "react-toastify";

export default function BonClie() {
  const [params, setParams] = useState(useParams());
  const [bonClients, setBonClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [caisse, setCaisse] = useState(null);

  //Ajouter une ligne das le tableau reglements
  function addLine() {
    var line = { client_id: "", montant: null, caisse_id: params.caisse };
    setBonClients([...bonClients, line]);
  }

  function deleteLine(ligne_id, bonClient) {
    if (!bonClient.id) {
      setBonClients(
        bonClients.filter((bonClients, index) => index != ligne_id)
      );
    } else {
      api.delete(`api/bonClients/${bonClient.id}`).then((res) => {
        setBonClients(
          bonClients.filter((bonClient, index) => index != ligne_id)
        );
      });
    }
    handleClose();
  }
  /**
   *  Un fonction qui de changer la valeur de chaque input dans le tableau Client
   * @param {*} index
   * @returns  void
   */
  // const updateInputBonClient = (index) => (e) => {
  //   let newArr = [...bonClients];
  //   let prop = e.target.name;
  //   newArr[index][prop] = e.target.value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
  //   setBonClients(newArr); // ??
  // };
  const updateInputBonClient = (index) => (e) => {
    let newArr = [...bonClients];
    let prop = e.target.name;
    let value = e.target.value;
    if (prop == "montant") {
      value = value.toLocaleString();
      value = value.replace(/ /g, "");
    }
    newArr[index][prop] = value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    setBonClients(newArr); // ??
  };

  function totalBonClient() {
    /* var total = bonClients
      .map((item) => item.montant)
      .reduce((prev = 0, next = 0) => parseFloat(prev) + parseFloat(next), 0); */
    var total = 0;
    bonClients.map((item) => {
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
   * Enregistrer/Modifier tous les bonclients
   */
  function notifierB() {
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
      bonClients.map((bonClient) => {
        if (bonClient.id) {
          const { encaissement_id, ...monBon } = bonClient;
          api
            .patch(`api/bonClients/${bonClient.id}`, monBon)
            .then((res) => console.log("Bonclient Faites"));
        } else {
          api
            .post("api/bonClients", bonClient)
            .then((res) => console.log("Bonclient Faites"));
        }
      });
      notifierB();
    });
  }

  useEffect(() => {
    api.get("api/clients").then((res) => setClients(res.data));
    api.get(`api/caisses/${params.caisse}`).then((res) => {
      setCaisse(res.data.caisse);
      if (res.data.bonClients.length == 0) {
        setBonClients([
          ...bonClients,
          { client_id: "", montant: null, caisse_id: params.caisse },
        ]);
      } else {
        setBonClients(res.data.bonClients);
      }
    });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const [id, setId] = useState(null);
  const [bonClient, setBonClient] = useState(null);
  function handleShow(i, bc) {
    setBonClient(bc);
    setId(i);
    setShow(true);
  }

  return (
    <div className="bonClients">
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
              className="table-bordered-dark table-success text-center  border-dark border-bottom-0"
              colSpan="3"
            >
              BONS CLIENTS{" "}
            </th>
          </tr>
        </thead>
        <thead className="sous-titre table-bordered text-center">
          <tr>
            <th
              className="border-dark border-bottom-0"
              style={{ width: "50%" }}
            >
              CLIENTS
            </th>
            <th className="border-dark border-bottom-0">MONTANTS</th>
          </tr>
        </thead>
        <tbody>
          {bonClients &&
            bonClients.map((bonClient, index) => (
              <tr key={index}>
                <td
                  className="td-input border-dark border-bottom-0"
                  style={{ verticalAlign: "middle" }}
                >
                  <select
                    style={{ fontSize: "18px" }}
                    autoComplete="off"
                    name="client_id"
                    onChange={updateInputBonClient(index)}
                    className="select"
                    value={bonClient.client_id}
                    disabled={
                      ispompiste() && !isApprouve(caisse && caisse.approuve)
                        ? false
                        : true
                    }
                  >
                    <option value="">-------</option>
                    {clients &&
                      clients?.data?.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.nom}
                        </option>
                      ))}
                  </select>
                  <span></span>
                </td>
                <td
                  className="td-input border-dark border-bottom-0"
                  style={{ verticalAlign: "middle" }}
                >
                  <input
                    style={{ fontSize: "18px" }}
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    value={separateur(bonClient.montant)}
                    onChange={updateInputBonClient(index)}
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
                      /*onClick={() => deleteLine(index, bonClient)}*/
                      onClick={() => handleShow(index, bonClient)}
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
              TOTAL CLIENTS
            </th>
            <td
              className="table-bordered  text-center border-dark"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {
                /* separateur */ totalBonClient()
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
          <button className="btn btn-info" onClick={addLine}>
            Ajouter
          </button>

          <button className="btn btn-success m-2" onClick={saveAll}>
            Sauvegarder
          </button>
        </Table>
      ) : null}
      {/*} <div className="row">
        <button className="btn btn-info" onClick={addLine}>
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
          <Button variant="danger" onClick={() => deleteLine(id, bonClient)}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
