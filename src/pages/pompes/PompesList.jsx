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
import api from "../../api/api";
// ----------------------------------------------------------------------

export default function PompestList() {
  const [ilots, setIlots] = useState(null);
  useEffect(() => {
    api.get("api/ilots").then((res) => setIlots(res.data));
    api.get("api/pompes").then((res) => setPompes(res.data));
  }, []); 
  const [modalShow, setModalShow] = useState(false);
  const notifier = () =>
    toast.success("Nouvelle pompe ajoutée", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const erorMsg = () =>
    toast.error("Vous devez  renseigner tous les champs", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const [invalidI, setInvalidI] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [pompes, setPompes] = useState([]);
  const [numero, setNumero] = useState(null);
  const [ilot, setIlot] = useState(null);

  const addPompe = () => {
    if ((numero == "" && ilot == "") || ilot == null || numero == null) {
      numero ? setInvalid(false) : setInvalid(true);
      ilot ? setInvalidI(false) : setInvalidI(true);
      erorMsg();
    } else {
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/pompes", { numero: numero, ilot_id: ilot })
          .then((response) => {
            setPompes([...pompes, response.data]);
            setModalShow(false);
            notifier();
          })
          .catch((err) => console.log(err));
      });

      setIlot(null);
      setNumero(null);
      setInvalid(false);
      setInvalidI(false);
    }
    console.log();
  };
  //supression d'un pompes
  const supprimer = (data) => {
    api.delete(`api/pompes/${data.id}`).then((res) => {
      setPompes(pompes.filter((el) => el.id != data.id));
      toast.warn(`La pompe a été supprimée !!!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
  const notifierM = () =>
    toast.success(`La pompe a été modifiée !!!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //supression d'un pompes
  const modifierPompe = (id, data) => {
    api.get("sanctum/csrf-cookie").then((response) => {
      api.put(`api/pompes/${id}`, data).then((res) => {
        api.get("api/pompes").then((res) => setPompes(res.data));
        notifierM();
      });
    });
  };
  function showM() {
    setModalShow(true);
  }
  return (
    <Page title="Liste des Pompes">
      <div classNae="row">
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
            mb={0}
          >
           {/*  <Button
              variant="contained"
              component={RouterLink}
              to="#"
              onClick={() => setModalShow(true)}
              type="button"
              startIcon={<Icon icon={plusFill} />}
            >
              Ajouter
            </Button> */}
            <Modale
              titre="Ajouter une Pompe"
              show={modalShow}
              onHide={() => setModalShow(false)}
            >
              <Modal.Body>
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      className={`form-control ${invalid ? "is-invalid" : ""}`}
                      placeholder="Numéro Pompe"
                      aria-label="Numéro Pompe"
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <select
                      className={`form-control ${invalidI ? "is-invalid" : ""}`}
                      onChange={(e) => setIlot(e.target.value)}
                    >
                      <option value="">Ilots</option>
                      {ilots &&
                        ilots.map((il) => (
                          <option key={il.id} value={il.id}>
                            ilot {il.numero}
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
              {pompes && (
                <TableList
                  showM={showM}
                  suprimerPome={supprimer}
                  modifierPompe={modifierPompe}
                  pompes={pompes}
                  ilots={ilots}
                />
              )}
            </div>
          </div>
        </Container>
      </div>
    </Page>
  );
}
