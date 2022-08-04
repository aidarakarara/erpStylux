import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Box, Card, CardHeader } from "@material-ui/core";
import api from "src/api/api";
import { useParams } from "react-router-dom";
import Loader from "src/components/loader";
import { separateur } from "src/utils/formatNumber";
import "./activitesc.css";

export default function ActivitesCaisses() {
  let { date } = useParams();
  let d = new Date(date);
  let mois = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  let formate = ` ${jour}/${mois}/${d.getFullYear()}`;
  const [caisses, setCaisses] = useState(null);
  const [synthese, setSynthese] = useState(null);

  //lavage
  const [lavages, setLavages] = useState([]);

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
  //fin lavage
  //recette
  const [recettes, setRecettes] = useState([]);
  useEffect(() => {
    api.get(`api/recette-date/${date}`).then((res) => setRecettes(res.data));
  }, []);
  function montantparligneR(index) {
    var ligne = recettes[index];
    var somme = 0;
    somme =
      parseInt(ligne.totallub) +
      parseInt(ligne.totalacc) +
      parseInt(ligne.totallav) +
      parseInt(ligne.totalfut);
    return somme;
  }

  function montanttotalrecette() {
    let total = 0;
    recettes &&
      recettes.map((_, index) => {
        total += montantparligneR(index);
      });
    return total;
  }

  //fin recette

  function totalVersement() {
    var total =
      synthese &&
      synthese.encaissements
        .map((item) => item?.bonclients_montant)
        .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
    return total + montanttotalrecette();
  }
  useEffect(() => {
    loadData();
  }, [date]);

  function loadData() {
    api.get(`api/lavage-date/${date}`).then((res) => setLavages(res.data));
    api.get(`api/caisse_par/${date}`).then((res) => {
      setCaisses(res.data.caisses);
      setSynthese(res.data.synthese);
    });
  }

  function approuver() {
    api.get(`api/approuver_synthese/${synthese.id}`).then((respone) => {
      loadData();
    });
  }

  if (!caisses) {
    return <Loader />;
  }
  if (caisses.length == 0) {
    return <h1 className="mt-5 center "> Pas de Donnée disponible </h1>;
  }
  return (
    <div className="container-fluid">
      <Card className="act">
        <h2 className="center py-3" style={{ fontWeight: "bolder" }}>
          Rapport du {formate}
        </h2>

        <Box>
          <div>
            <table className="table table-bordered table-hover table-responsive-lg">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Date</th>
                  <th>Caisses </th>
                  <th>Total carburant</th>
                  <th>Coffre</th>
                  <th>Total net à verser</th>
                  <th>Net versé</th>
                  <th>Ecart</th>
                  <th>Pompiste</th>
                  <th>Etat</th>
                </tr>
              </thead>
              <tbody>
                <td
                  className="center"
                  rowSpan={caisses && caisses.length + 1}
                  style={{ verticalAlign: "middle" }}
                >
                  {formate}
                </td>
                {caisses &&
                  caisses.map((caisse, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/gerants/caisses/${caisse.id}`}>
                          Caisse Pompe {caisse.pompe.numero}{" "}
                        </Link>
                      </td>
                      <td>
                        {
                          /* separateur */ (
                            Math.round(
                              (Number(caisse?.coffre) +
                                Number(caisse?.netVer) +
                                Number(caisse?.ecart)) *
                                100
                            ) / 100
                          )
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )
                        }
                      </td>
                      <td>
                        {
                          /* separateur */ caisse.coffre
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )
                        }
                      </td>
                      <td>
                        {
                          /* separateur */ (
                            Math.round(
                              (Number(caisse?.netVer) + Number(caisse?.ecart)) *
                                100
                            ) / 100
                          )
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )
                        }
                      </td>
                      <td>
                        {
                          /* separateur */ /* caisse.netVer && separateur(caisse.netVer) */ (
                            Math.round(Number(caisse?.netVer) * 100) / 100
                          )
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )
                        }
                      </td>
                      <td>
                        {
                          /* caisse.ecart && separateur(caisse.ecart) */ (
                            Math.round(Number(caisse?.ecart) * 100) / 100
                          )
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )
                        }
                      </td>

                      <td>{caisse.user.name}</td>
                      <td>
                        {caisse.approuve == 1 ? (
                          <span class="badge p-2 rounded-pill bg-success text-light">
                            Approuvé
                          </span>
                        ) : (
                          <span class="badge p-2 rounded-pill bg-warning text-light">
                            Non Approuvé
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* <Table striped bordered hover size="sm">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th> Fiche à remplir </th>

                  <th>Nombre de voitures</th>
                  <th>Montant encaissé</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <Link to={`/gerants/ficheLavage/${date}`}>
                      Fiche lavages
                    </Link>{" "}
                  </td>

                  <td> {lavages && lavages.length}</td>
                  <td> {separateur(montanttotal())} FCFA </td>
                </tr>
              </tbody>
            </Table> */}
            <div className="col-12 col-md-12">
              <table className="table table-bordered table-responsive-lg">
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th> Fiche </th>
                    <th> Lavages </th>
                    <th> Accessoires </th>
                    <th> Lubrifiants </th>
                    <th> Fûts </th>
                    <th>Montant encaissé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td style={{ fontSize: "18px" }}>Autres recettes</td>
                    {recettes &&
                      recettes.map((r, index) => (
                        <td style={{ verticalAlign: "middle" }} key={index}>
                          {
                            /* separateur */ r.totallav
                              .toFixed(0)
                              .replace(
                                /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                                "$1 "
                              )
                          }
                        </td>
                      ))}
                    {recettes &&
                      recettes.map((r, index) => (
                        <td style={{ verticalAlign: "middle" }} key={index}>
                          {
                            /* separateur */ r.totalacc
                              .toFixed(0)
                              .replace(
                                /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                                "$1 "
                              )
                          }
                        </td>
                      ))}{" "}
                    {recettes &&
                      recettes.map((r, index) => (
                        <td style={{ verticalAlign: "middle" }} key={index}>
                          {
                            /* separateur */ r.totallub
                              .toFixed(0)
                              .replace(
                                /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                                "$1 "
                              )
                          }
                        </td>
                      ))}{" "}
                    {recettes &&
                      recettes.map((r, index) => (
                        <td style={{ verticalAlign: "middle" }} key={index}>
                          {
                            /* separateur */ r.totalfut
                              .toFixed(0)
                              .replace(
                                /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                                "$1 "
                              )
                          }
                        </td>
                      ))}
                    <td style={{ verticalAlign: "middle" }}>
                      {" "}
                      {recettes
                        ? /* separateur */ montanttotalrecette()
                            .toFixed(0)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )
                        : 0}{" "}
                      FCFA{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {synthese && (
              <Table striped bordered hover size="sm">
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th>Synthèse </th>
                    <th>Total versement</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {synthese && (
                        <Link to={`/gerants/synthese/${synthese?.date}`}>
                          Synthèse
                        </Link>
                      )}
                    </td>
                    <td>{(totalVersement())} FCFA </td>
                    <td>
                      {synthese && synthese?.etat == 0 ? (
                        <button
                          onClick={() => approuver()}
                          className="btn btn-success  text-ligh btn-sm"
                          style={{ borderRadius: "50px" }}
                        >
                          Approuver
                        </button>
                      ) : (
                        <button
                          onClick={() => approuver()}
                          className="btn btn-warning text-ligh btn-sm"
                          style={{ borderRadius: "50px" }}
                        >
                          {" "}
                          Désapprouver
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
        </Box>
      </Card>
    </div>
  );
}
