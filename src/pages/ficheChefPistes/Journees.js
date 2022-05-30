import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Box, Card, CardHeader } from "@material-ui/core";
import api from "src/api/api";
import PageLoad from "../PageLoad";
import { red } from "@material-ui/core/colors";
import { forEach } from "lodash";
import "./journees.css";
import ModalAddCaisses from "./ModalAddCaisses";

export default function Journees() {
  const [caisse, setCaisse] = useState(null);
  const [caisses, setCaisses] = useState(null);
  const [journee, setjournee] = useState(null);
  const [journees, setJournees] = useState(null);
  const [modalAddJourneeShow, setModalAddJourneeShow] = useState(false);

  const [journeesFCP, setJourneesFCP] = useState(null);

  const reloadJournee = () => {
    api.get("api/journees").then((res) => setJournees(res.data));
  };

  useEffect(() => {
    api.get("api/journees").then((res) => setJournees(res.data));
  }, []);

  function approuver(id) {
    api.get(`api/approuver_caisse/${id}`).then((respone) => {
      reloadJournee();
    });
  }

  useEffect(() => {
    api.get("api/caisses").then((res) => setCaisses(res.data));
  }, []);

  //<PageLoad />  Chargement...!
  if (!journees) {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 text-center">
          <div className="col-xs-12 col-sm-12 col-md-12 text-center">
            <img
              src="/images/loading.gif"
              style={{ width: "10vh", margin: "auto" }}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Card className="caisses">
        <h2 className="center p-4"> Liste des Fiches Pompistes 2</h2>

        <Box sx={{ px: 3, py: 1 }}>
          <div>
            <button
              onClick={() => {
                setjournee(null);
                setModalAddJourneeShow(true);
              }}
              className="btn btn-success px-5 mb-2"
            >
              Ajouter
            </button>

            {journees &&
              journees.journees.map((jour, i) => (
                <Table
                  className="tableau"
                  striped
                  bordered
                  hover
                  size="sm"
                  key={i}
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>Date</th>
                      <th>Caisses </th>
                      <th>Pompiste</th>
                      <th>Total Carburant</th>
                      <th>Coffre</th>
                      <th>Total Net A Verser</th>
                      <th>Net Verse</th>
                      <th>Ecart</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td className="center" rowSpan="4">
                      <div>{jour[0].date_caisse}</div>
                      <button
                        onClick={() => {
                          setjournee(jour);
                          setModalAddJourneeShow(true);
                        }}
                        className="btn btn-secondary px-5 mb-2"
                      >
                        Modifier
                      </button>
                    </td>
                    {jour.map((j, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={`${j.id}`}>
                            Caisse Pompe {j.pompe.numero}{" "}
                          </Link>
                        </td>
                        <td>{j.user.name}</td>
                        <td>{j.coffre + j.netVer + j.ecart}</td>
                        <td>{j.coffre.toLocaleString()}</td>
                        <td>{j.netVer + j.ecart}</td>
                        <td>{j.netVer.toLocaleString()}</td>
                        <td>{j.ecart.toLocaleString()}</td>
                        <td>
                          {j.approuve == 0 ? (
                            <button
                              onClick={() => approuver(j.id)}
                              className="btn btn-warning text-ligh btn-sm"
                              style={{ borderRadius: "50px" }}
                            >
                              Approuver
                            </button>
                          ) : (
                            <button
                              onClick={() => approuver(j.id)}
                              className="btn btn-success text-ligh btn-sm"
                              style={{ borderRadius: "50px" }}
                            >
                              {" "}
                              Désapprouver
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td>
                        <Link to={`synthese/${jour[0].date_caisse}`}>
                          Synthese{" "}
                        </Link>
                      </td>
                      <td>{jour[0].user.name} </td>
                      <td> {} </td>

                      <td>0</td>

                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>
                        <span className="badge mt-1 rounded-pill p-2 bg-info text-light">
                          {}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ))}
          </div>
        </Box>
      </Card>
      <ModalAddCaisses
        show={modalAddJourneeShow}
        onHide={() => setModalAddJourneeShow(false)}
        journee={journee}
        reloadJournee={reloadJournee}
      />
    </>
  );
}
