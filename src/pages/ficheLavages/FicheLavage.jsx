import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import "./ficheLubrifiant.css";
import { Table, Form } from "react-bootstrap";
import api from "src/api/api";
import { useParams } from "react-router-dom";
import ispompiste from "./useIsPompiste";

export default function FicheLavage(setData) {
  let { date } = useParams();

  const [id, setId] = useState(null);
  const [lavage, setLavage] = useState(null);

  const updateInputLavage = (index) => (e) => {
    let newArr = [...lavages];
    let prop = e.target.name;
    newArr[index][prop] = e.target.value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    setLavages(newArr); // ??
  };

  const [lavages, setLavages] = useState([
    {
      num_vehicule: "",
      type: "",
      carosserie: 0,
      moteur: 0,
      graissage: 0,
      pulv: 0,
      complet: 0,
      date_lavage: date,
    },
  ]);
  useEffect(() => {
    api.get(`api/lavage-date/${date}`).then((res) => setLavages(res.data));
  }, []);

  function addLine() {
    var line = {
      num_vehicule: "",
      type: "",
      carosserie: 0,
      moteur: 0,
      graissage: 0,
      pulv: 0,
      complet: 0,
      date_lavage: date,
    };
    setLavages([...lavages, line]);
  }

  function deleteLine(ligne_id, lavage) {
    if (!lavage.id) {
      setLavages(lavages.filter((lavage, index) => index != ligne_id));
    } else {
      api.delete(`api/lavages/${lavage.id}`).then((res) => {
        setLavages(lavages.filter((lavage, index) => index != ligne_id));
      });
    }
    handleClose();
  }

  function notifier() {
    toast.success("Sauvegarde lavage réussie", {
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
      lavages.map((lavage) => {
        if (lavage.id) {
          api
            .put(`api/lavages/${lavage.id}`, lavage)
            .then((res) => console.log("lavages Faites"));
        } else {
          api
            .post("api/lavages", lavage)
            .then((res) => console.log("lavages Faites"));
        }
      });
      notifier();
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  function handleShow(i, lav) {
    setLavage(lav);
    setId(i);
    setShow(true);
  }

  function montantparligne(index) {
    var ligne = lavages[index];
    var somme = 0;
    somme =
      parseInt(ligne.carosserie) +
      parseInt(ligne.graissage) +
      parseInt(ligne.moteur) +
      parseInt(ligne.pulv) +
      parseInt(ligne.complet);
    return somme;
  }

  function montanttotal() {
    let total = 0;
    lavages &&
      lavages.map((_, index) => {
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
    return `${jour}/${mois}/${d.getFullYear()}`;
  }

  return (
    <div className="ficheLubrifiant" style={{ marginTop: "-80px" }}>
      <ToastContainer
        style={{ marginTop: "40px" }}
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

      <div className="col-12 pt-3">
        <Table style={{ position: "absolute", marginTop: "20px" }}>
          <div className="info-stylux">
            <img src="/images/logo_stylux.jpg" />
            <div>Km 12 Route de Rufisque / Thiaroye sur mer</div>
            <div>NINEA : 006984604 - RC:SN DKR.2018.A.23163</div>
            <div>Tél : 77 577 89 05</div>
          </div>
        </Table>
      </div>

      <Table className="tableDate" size="sm" style={{ marginTop: "10px" }}>
        <tbody className="noBorder center">
          <tr>
            <th colSpan="1" className="noBorder">
              DATE :
            </th>
            <td colSpan="7" className="border">
              {formatdate(date)}
            </td>
          </tr>
        </tbody>
      </Table>

      <div
        className="card center"
        style={{ verticalAlign: "middle", marginTop: "100px" }}
      >
        <div
          style={{
            height: "50px",
            fontSize: "30px",
            background: "linear-gradient(60deg, #26c6da, #00acc1)",
            color: "white",
          }}
        >
          <h2 className="titre"> FICHE LAVAGES</h2>
        </div>{" "}
      </div>

      <Table
        className="table table-bordered table-hover table-striped"
        responsive="lg"
        size="sm"
        style={{ marginTop: 20 }}
      >
        <thead className="justify-content-center">
          <tr>
            <th
              colSpan="1"
              rowSpan="2"
              style={{
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              Postes
            </th>
            <th
              colSpan="2"
              style={{
                textAlign: "center",
              }}
            >
              {" "}
              Véhicules{" "}
            </th>
            <th colSpan="5" className="center">
              {" "}
              Type de lavage{" "}
            </th>
            <th
              colSpan="1"
              rowSpan="2"
              style={{
                verticalAlign: "middle",
                width: "15%",
                textAlign: "center",
              }}
            >
              Montant
            </th>
          </tr>
          <tr>
            <th
              style={{
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              {" "}
              N° Véhicule{" "}
            </th>
            <th
              style={{
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              {" "}
              Type de voitures{" "}
            </th>
            <th
              style={{
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              {" "}
              Carosserie{" "}
            </th>

            <th
              style={{
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              {" "}
              Moteur{" "}
            </th>
            <th
              style={{
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              {" "}
              Graissage{" "}
            </th>
            <th
              style={{
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              {" "}
              Pulv. Chassis{" "}
            </th>
            <th
              style={{
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              {" "}
              Complet{" "}
            </th>
          </tr>
        </thead>

        <tbody className="center">
          {lavages &&
            lavages.map((lavage, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: "middle" }} name="poste">
                  {" "}
                  {index + 1}{" "}
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    name="num_vehicule"
                    required
                    value={lavage.num_vehicule}
                    onChange={updateInputLavage(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <select
                    autoComplete="off"
                    className="form-select"
                    name="type"
                    value={lavage.type}
                    onChange={updateInputLavage(index)}
                  >
                    <option selected>Choix</option>
                    <option value="petit">Petit</option>
                    <option value="moyen">Moyen</option>
                    <option value="grand">Grand</option>
                    <option value="tres grand">Très Grand</option>
                  </select>
                  <span></span>
                </td>

                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="number"
                    name="carosserie"
                    value={lavage.carosserie}
                    onChange={updateInputLavage(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="number"
                    name="moteur"
                    value={lavage.moteur}
                    onChange={updateInputLavage(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="number"
                    name="graissage"
                    value={lavage.graissage}
                    onChange={updateInputLavage(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="number"
                    name="pulv"
                    value={lavage.pulv}
                    onChange={updateInputLavage(index)}
                  />
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="number"
                    name="complet"
                    value={lavage.complet}
                    onChange={updateInputLavage(index)}
                  />
                  <span></span>
                </td>
                <td name="montanttotal" className="text-right">
                  {montantparligne(index)}
                  <button
                    type="button"
                    className="btn  del-btn m-1"
                    onClick={() => handleShow(index, lavage)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </td>
              </tr>
            ))}

          <tr>
            <th colSpan="8" style={{ textAlign: "center" }}>
              {" "}
              Total Montants Lavage{" "}
            </th>
            <th colSpan="1" style={{ textAlign: "right" }}>
              {" "}
              {montanttotal()} FCFA{" "}
            </th>
          </tr>
        </tbody>
      </Table>
      {ispompiste() ? (
        <Table
          className="justify-content-center "
          style={{ textAlign: "center" }}
        >
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
        </Table>
      ) : null}
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
          <Button variant="danger" onClick={() => deleteLine(id, lavage)}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
