import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ficheLubrifiant.css";
import { Table, Form } from "react-bootstrap";
import api from "../../api/api";
import Tr from "./Tr";
import ischefpiste from "./useIsChefpistes";
import ispompiste from "../pompistes/caisse/useIsPompiste";

export default function FicheLubrifiant() {
  // var today = new Date().toLocaleDateString();

  let { date } = useParams();
  const [lubs, setLubs] = useState(null);

  const updateInputLubrifiant = (index) => (e) => {
    let newArr = [...lubrifiants];
    let prop = e.target.name;
    newArr[index][prop] = e.target.value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    setLubrifiants(newArr); // ??
  };

  const [lubrifiants, setLubrifiants] = useState([
    {
      produit: "",
      ouverture: 0,
      entrant: 0,
      fermeture: 0,
      prixunitaire: 0,
      date_lubrifiant: date,
    },
  ]);
  useEffect(() => {
    {
      /* tablubs &&
        tablubs?.map((t) => { */
      api
        .get(`api/lubrifiant-date/${date}`)
        .then((res) => setLubrifiants(res.data));
      /* }); */
    }
  }, []);

  useEffect(() => {
    api.get("api/lubs").then((res) => setLubs(res.data));
  }, []);

  function addLine() {
    var line = {
      produit: "",
      ouverture: 0,
      entrant: 0,
      fermeture: 0,
      prixunitaire: 0,
      date_lubrifiant: date,
    };
    setLubrifiants([...lubrifiants, line]);
  }

  function deleteLine(ligne_id, lubrifiant) {
    if (!lubrifiant.id) {
      setLubrifiants(lubrifiants.filter((_, index) => index != ligne_id));
    } else {
      api.delete(`api/lubrifiants/${lubrifiant.id}`).then((res) => {
        setLubrifiants(lubrifiants.filter((_, index) => index != ligne_id));
      });
    }
    handleClose();
    suppr(true);
  }

  function notifier() {
    toast.success("Fait !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
      lubrifiants.map((lubrifiant) => {
        if (lubrifiant.id) {
          api
            .put(`api/lubrifiants/${lubrifiant.id}`, lubrifiant)
            .then((res) => console.log("lubrifiants Faits"));
        } else {
          api
            .post("api/lubrifiants", lubrifiant)
            .then((res) => console.log("lubrifiants Faits"));
        }
      });
      notifier();
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [id, setId] = useState(null);
  const [lubrifiant, setLubrifiant] = useState(null);
  function handleShow(i, d) {
    setLubrifiant(d);
    setId(i);
    setShow(true);
  }

  function montantparligne(index) {
    var ligne = lubrifiants[index];
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
    lubrifiants &&
      lubrifiants.map((_, index) => {
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

  /*useEffect(() => {
    api.get("api/produits").then((res) => setProduits(res.data));
  }, []);   */
  return (
    <div className="ficheLubrifiant p-5">
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
          <strong> FICHE LUBRIFIANTS </strong>
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
          {lubrifiants &&
            lubrifiants.map((lub, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: "middle" }} name="poste">
                  <select
                    style={{ fontSize: "18px" }}
                    autoComplete="off"
                    name="produit"
                    onChange={updateInputLubrifiant(index)}
                    className="select"
                    value={lub.produit}
                  >
                    <option selected></option>
                    {lubs &&
                      lubs.map((lub, index) => (
                        <option
                          style={{ textAlign: "left" }}
                          selected
                          key={index}
                          value={lub.nom}
                        >
                          {lub.nom}
                        </option>
                      ))}
                  </select>
                  <span></span>
                </td>
                <td className="td-input" style={{ verticalAlign: "middle" }}>
                  <input
                    autoComplete="off"
                    className="form-control text-center"
                    type="number"
                    name="ouverture"
                    required
                    value={lub.ouverture}
                    onChange={updateInputLubrifiant(index)}
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
                    value={lub.entrant}
                    onChange={updateInputLubrifiant(index)}
                  />
                  <span></span>
                </td>
                <td
                  className="td-input"
                  style={{
                    verticalAlign: "middle",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <input
                    autoComplete="off"
                    style={{
                      margin: "0px",
                      padding: "0px",
                    }}
                    disabled
                    className="form-control text-center"
                    type="number"
                    name="total"
                    value={Number(lub.ouverture) + Number(lub.entrant)}
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
                    value={lub.fermeture}
                    onChange={updateInputLubrifiant(index)}
                  />
                  <span></span>
                </td>
                <td
                  className="td-input"
                  style={{
                    verticalAlign: "middle",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <input
                    autoComplete="off"
                    style={{
                      margin: "0px",
                      padding: "0px",
                    }}
                    className="form-control text-center"
                    disabled
                    type="number"
                    name="vente"
                    value={
                      Number(lub.ouverture) +
                      Number(lub.entrant) -
                      Number(lub.fermeture)
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
                    value={lub.prixunitaire}
                    onChange={updateInputLubrifiant(index)}
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
                      Number(lub.prixunitaire) *
                      (Number(lub.ouverture) +
                        Number(lub.entrant) -
                        Number(lub.fermeture))
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
                      onClick={() => handleShow(index, lub)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          <tr>
            <td colSpan={7}> MONTANT TOTAL LUBRIFIANTS</td>
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
          <Button variant="danger" onClick={() => deleteLine(id, lubrifiant)}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
