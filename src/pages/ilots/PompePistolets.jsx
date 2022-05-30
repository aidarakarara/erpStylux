import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
//import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import { Grid, Button, Container, Stack, Typography } from "@material-ui/core";
import Modale from "../../components/Modale";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../api/api";

export default function PompePistolets() {
  let { id, ilots_id } = useParams();
  const [pompes, setPompes] = useState(null);
  const [ilots, setIlots] = useState(null);
  const [pistolets, setPistolets] = useState(null);

  useEffect(() => {
    api
      .get(`api/ilots/${ilots_id}/pompes/${id}/pistolets`)
      .then((res) => setPistolets(res.data));
    console.log(pistolets);
  }, []);

  const supprimer = (data) => {
    api.delete(`api/pompes/${data.id}/pistolets/${data.id}`).then((res) => {
      setPistolets(pompes.filter((el) => el.id != data.id));
      toast.warn(`La Pompe a été Suprimer`, {
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
    toast.success(`La Pompe a été modifiée`, {
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
    api.put(`api/pistolets/${id}`, data).then((res) => {
      api.get("api/pistolets").then((res) => setPistolets(res.data));
      notifierM();
    });
  };

  return (
    <div className="row" style={{ margin: "auto" }}>
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
          <Typography variant="h4" gutterBottom>
            Liste des Pistolets
          </Typography>
          <Button variant="contained" to="#" type="button">
            Ajouter
          </Button>
        </Stack>
      </Container>
      {pistolets &&
        pistolets.map((pistolet) => (
          <div className="col-md-6" style={{ margin: "auto" }}>
            <div key={pistolet.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4 center">
                  <img
                    src="https://media.istockphoto.com/photos/gasoline-gushing-out-from-pump-picture-id494128660?b=1&k=6&m=494128660&s=170667a&w=0&h=-_N3GU-OdH-Em7FRQQQVmS-KVzHN3skkttBRuWcKAA4="
                    className="img"
                    alt="..."
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      padding: "auto",
                      textAlign: "center",
                      height: "140px",
                    }}
                  />
                  <h5 className="badge bg-warning" style={{ fontSize: "20px" }}>
                    Pistolet{" "}
                    <span className="badge bg-light">{pistolet.numero}</span>
                  </h5>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5
                      className="badge bg-secondary"
                      style={{ fontSize: "20px" }}
                    >
                      Type de Carburant :{" "}
                      <span className="badge bg-light">
                        {pistolet.carburant}
                      </span>
                    </h5>
                    <h5
                      className="badge bg-secondary"
                      style={{ fontSize: "20px" }}
                    >
                      Réservoir N° :{" "}
                      <span className="badge bg-light">
                        {pistolet.reservoir_id}
                      </span>
                    </h5>
                    <h5
                      className="badge bg-secondary"
                      style={{ fontSize: "20px" }}
                    >
                      Index Electronique :{" "}
                      <span className="badge bg-light">{pistolet.indexE}</span>
                    </h5>
                    <h5
                      className="badge bg-secondary"
                      style={{ fontSize: "20px" }}
                    >
                      Index Mécanique :{" "}
                      <span className="badge bg-light">{pistolet.indexM}</span>
                    </h5>

                    <div className="text-right" style={{fontSize: "12px", marginTop: "15px"}}>
                      <a
                        className="text-light badge bg-info mr-1"
                        href="#"
                      >
                        Modifier
                      </a>
                      <button
                        type="button"
                        className="text-light badge bg-danger"
                        style={{border: "none", cursor: "pointer"}}
                      >
                        Supprimer
                      </button>
                    </div>

                    {/*  <p className="card-text">
                      <small className="text-muted">
                        Dernière mise à jour : {'YY-MM-DD', pistolet.updated_at}
                      </small>
                    </p>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
