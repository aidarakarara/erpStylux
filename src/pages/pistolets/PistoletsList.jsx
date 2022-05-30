import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Grid, Button, Container, Stack, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import Modale from "../../components/Modale";
import TableList from "./TableList";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
// ----------------------------------------------------------------------
import api from "../../api/api";

export default function PistoletstList() {
  const [cuves, setCuves] = useState(null);
  const [pompes, setPompes] = useState([]);
  useEffect(() => {
    api.get("api/reservoirs").then((res) => setCuves(res.data));
    api.get("api/pompes").then((res) => setPompes(res.data));
    api.get("api/pistolets").then((res) => setPistolets(res.data));
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const notifier = () =>
    toast.success("Nouveau pompe  ajoutée", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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

  // Le state
  const [invalidI, setInvalidI] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [pistolets, setPistolets] = useState([]);
  const [numero, setNumero] = useState(null);
  const [prix, setPrix] = useState(null);
  const [carburant, setCarburant] = useState(null);
  const [pompeId, setPompeId] = useState(null);
  const [indexE, setindexE] = useState(null);
  const [indexM, setindexM] = useState(null);
  const [nom, setNom] = useState(null);
  // fin de la declaration

  const [numeroI, setNumeroI] = useState(false);
  const [prixI, setPrixI] = useState(false);
  const [carburantI, setCarburantI] = useState(false);
  const [pompeIdI, setPompeIdI] = useState(false);
  const [indexEI, setindexEI] = useState(false);
  const [indexMI, setindexMI] = useState(false);
  const [nomI, setNomI] = useState(false);

  const addPompe = () => {
    if (!numero || !prix || !carburant || !pompeId || !indexE || !indexM) {
      setNumeroI(true);
      setPrixI(true);
      setCarburantI(true);
      setNomI(true);
      setPompeIdI(true);
      setindexEI(true);
      setindexMI(true);

      erorMsg();
    } else {
      const data = {
        numero,
        nom,
        prix,
        carburant,
        pompe_id: pompeId,
        indexE,
        indexM,
      };

      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/pistolets", data)
          .then((res) => setPistolets([...pistolets, res.data]));
      });

      setModalShow(false);
      notifier();
      setNumero(null);
      setCarburant(null);
      setPrix(null);
      setPompeId(null);
    }
    //console.log();
  };
  const deletePistol = (id) => {
    api
      .delete(`api/pistolets/${id}`)
      .then((res) => setPistolets(pistolets.filter((el) => el.id != id)));
    console.log(id);
  };
  const updatePistol = (pistolet) => {
    api.get("sanctum/csrf-cookie").then((response) => {
      api.put(`api/pistolets/${pistolet.id}`, pistolet).then((res) => {
        api.get("api/pistolets").then((res) => setPistolets(res.data));
      });
    });
  };
  function showM() {
    setModalShow(true);
  }
  return (
    <Page title="Liste des Pistolets">
      <ToastContainer
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
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Modale
            titre="Ajouter un pistolet"
            show={modalShow}
            onHide={() => setModalShow(false)}
          >
            <Modal.Body>
              <div className="row">
                <div className="col">
                  <input
                    type="number"
                    className={`form-control ${numeroI ? "is-invalid" : ""}`}
                    placeholder="Numéro Pistolet"
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </div>
                <div className="col">
                  <select
                    className={`form-control ${carburantI ? "is-invalid" : ""}`}
                    onChange={(e) => setCarburant(e.target.value)}
                  >
                    <option value="">Carburant</option>
                    <option value="super">Super</option>
                    <option value="gasoil">Gasoil</option>
                  </select>
                </div>
                <div className="col">
                  <input
                    type="number"
                    className={`form-control ${prixI ? "is-invalid" : ""}`}
                    placeholder="Prix"
                    onChange={(e) => setPrix(e.target.value)}
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <input
                    type="number"
                    className={`form-control ${indexEI ? "is-invalid" : ""}`}
                    placeholder="Index Electronique"
                    onChange={(e) => setindexE(e.target.value)}
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className={`form-control ${indexMI ? "is-invalid" : ""}`}
                    placeholder="index Mecanique"
                    onChange={(e) => setindexM(e.target.value)}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className={`form-control ${nomI ? "is-invalid" : ""}`}
                    placeholder="nom"
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <select
                    className={`form-control ${pompeIdI ? "is-invalid" : ""}`}
                    onChange={(e) => setPompeId(e.target.value)}
                  >
                    <option value="">Pompes</option>
                    {pompes &&
                      pompes.map((pompe) => (
                        <option key={pompe.id} value={pompe.id}>
                          {pompe.numero}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Bbtn onClick={addPompe} variant="success">
                Sauvegarder
              </Bbtn>
            </Modal.Footer>
          </Modale>
        </Stack>

        <div className="container">
          <div>
            <TableList
              showM={showM}
              deletePistol={deletePistol}
              updatePistol={updatePistol}
              pistolets={pistolets}
            />
          </div>
        </div>
      </Container>
    </Page>
  );
}
