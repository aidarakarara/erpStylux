import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as Bbtn } from "react-bootstrap";
import Modale from "../../components/Modale";
import { Table } from "react-bootstrap";
import {
  faEnvelope,
  faUser,
  faPhone,
  faMapMarker,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";
import { useParams } from "react-router-dom";
import Loader from "src/components/loader";
import { Tab, Tabs } from "react-bootstrap";
import Encaissements from "./Encaissements";
import BonsClients from "./BonsClients";
import { Modal } from "react-bootstrap";
import "./detailclient.css";

import { separateur } from "src/utils/formatNumber";

export default function ClientDetails() {
  let { id } = useParams();

  const [client, setClient] = useState(null);
  const [nom, setNom] = useState(null);
  const [tel, setTel] = useState(null);
  const [email, setEmail] = useState(null);
  const [adresse, setAdresse] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  function loadClient() {
    api.get(`api/clients/${id}`).then((res) => {
      setClient(res.data);
      setNom(res.data.nom);
      setTel(res.data.telephone);
      setEmail(res.data.email);
      setAdresse(res.data.adresse);
    });
  }
  useEffect(() => {
    loadClient();
  }, []);

  function totalEncaissement() {
    var total =
      client && client.encaissements
        ? client.encaissements
            .map((item) => (item.bon ? item.bon.montant : 0))
            .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0)
        : 0;

    return total;
  }
  function totalBons() {
    var total =
      client && client.bon_clients
        ? client.bon_clients
            .map((item) => (item.encaissement_id ? 0 : item.montant))
            .reduce(
              (prev = 0, next = 0) => parseFloat(prev) + parseFloat(next),
              0
            )
        : 0;

    return total;
  }
  function updateClient() {
    api.get("sanctum/csrf-cookie").then((response) => {
      var data = { id: client.id, nom, telephone: tel, email, adresse };
      api.put(`api/clients/${data.id}`, data).then((res) => {
        setModalShow(false);
        loadClient();
      });
    });
  }
  if (!client) {
    return <Loader />;
  }

  return (
    <div className="container detail">
      <div className="main-body" style={{ marginTop: "-80px" }}>
        <div className="card p-5">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div
                className="card"
                style={{
                  boxShadow:
                    "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 255 255 / 60%",
                }}
              >
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={`https://ui-avatars.com/api/?background=random&name=${
                        client && client.nom
                      }`}
                      alt="Client"
                      className="rounded-circle"
                      width="120"
                    />
                    <div className="mt-3">
                      <h4>{client.nom}</h4>

                      <p className="text-info mb-1">
                        <button
                          type="button"
                          onClick={() => setModalShow(true)}
                          class="btn btn-outline-info"
                        >
                          <FontAwesomeIcon icon={faPen} />
                          Modifier
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card mb-3"
                style={{
                  boxShadow:
                    "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 255 255 / 60%",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-1">
                      <h6 className="mb-0">
                        <FontAwesomeIcon icon={faUser} size="lg" />{" "}
                      </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6>{client && client.nom}</h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-1">
                      <h6 className="mb-0">
                        {" "}
                        <FontAwesomeIcon icon={faEnvelope} size="lg" />{" "}
                      </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6>{client && client.email}</h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-1">
                      <h6 className="mb-0">
                        {" "}
                        <FontAwesomeIcon icon={faPhone} size="lg" />{" "}
                      </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6>{client && client.telephone}</h6>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-1">
                      <h6 className="mb-0">
                        {" "}
                        <FontAwesomeIcon icon={faMapMarker} size="lg" />{" "}
                      </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6>{client && client.adresse}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card mb-3 p-2 m-1"
                style={{
                  boxShadow:
                    "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 255 255 / 60%",
                }}
              >
                <Table className="table" hover style={{ border: "none" }}>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        background: "linear-gradient(60deg, #16222A, #3A6073)",
                        color: "white",
                      }}
                    >
                      <td style={{ verticalAlign: "middle" }}>
                        <h6>Encaissements</h6>
                      </td>
                      <td
                        style={{ textAlign: "right", verticalAlign: "middle" }}
                      >
                        {totalEncaissement()
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )}{" "}
                        FCFA
                      </td>
                    </tr>
                    <tr
                      style={{
                        background:
                          "linear-gradient(60deg,  #1A2980, #1765d5 )",
                        color: "white",
                      }}
                    >
                      <td style={{ verticalAlign: "middle" }}>
                        <h6>Bons Clients</h6>
                      </td>
                      <td
                        style={{ textAlign: "right", verticalAlign: "middle" }}
                      >
                        {totalBons()
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )}{" "}
                        FCFA
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

          <div className="row gutters-sm justify-content-center">
            <div
              className="card p-5 mt-3 col-xs-12 col-sm-12 col-md-12"
              style={{
                boxShadow:
                  "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 255 255 / 60%",
              }}
            >
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="tabs mb-3"
                style={{ height: "auto", width: "auto" }}
              >
                <Tab eventKey="home" title="Encaissements">
                  <div style={{ margin: "10px" }}>
                    {client && client.encaissements ? (
                      <Encaissements encaissements={client.encaissements} />
                    ) : null}
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Bons Clients">
                  <div style={{ margin: "10px" }}>
                    {client && client.bon_clients ? (
                      <BonsClients bons={client.bon_clients} />
                    ) : null}
                  </div>
                </Tab>
                {/* <Tab eventKey="contact" title="Factures">
                  <div style={{ margin: "10px" }}>
                    <Factures />
                  </div>
                    </Tab>*/}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Modale
        titre="Modifier un Client/ Entreprise"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Body>
          <div className="row">
            <div className="col col-md -6">
              <input
                type="text"
                onChange={(e) => setNom(e.target.value)}
                value={nom}
                className="form-control"
                placeholder="Nom client"
              />
            </div>
            <div className="col col-md -6">
              <input
                type="tel"
                onChange={(e) => setTel(e.target.value)}
                value={tel}
                className="form-control"
                placeholder="Numéro de téléphone"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col col-md -6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="col col-md -6">
              <input
                type="text"
                onChange={(e) => setAdresse(e.target.value)}
                value={adresse}
                className="form-control"
                placeholder="Adresse"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Bbtn onClick={updateClient} variant="success">
            Modifier
          </Bbtn>
        </Modal.Footer>
      </Modale>
    </div>
  );
}
