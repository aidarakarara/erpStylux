import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Box, Card, CardHeader } from "@material-ui/core";
import api from "src/api/api";
import { useParams } from "react-router-dom";
import Loader from "src/components/loader";
import ModalAddCaisses from "./ModalAddCaisses";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ModaleAddRecette from "./recette/modaleAddRecette";

export default function Synthese() {
  let { date } = useParams();
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [caisses, setCaisses] = useState(null);
  const [synthese, setSynthese] = useState(null);
  const [stateModalAddCaisse, setStateModalAddCaisse] = useState(false);
  const [showModalAddRecette, setShowModalAddRecette] = useState(false);
  const [showProdM, setShowprodM] = useState(false);

  //lavage
  const [lavages, setLavages] = useState([]);
  useEffect(() => {
    api.get(`api/lavage-date/${date}`).then((res) => setLavages(res.data));
  }, []);
  function montantparligne(index) {
    var ligne = lavages[index];
    var somme = 0;
    somme =
      parseInt(ligne?.carosserie) +
      parseInt(ligne?.graissage) +
      parseInt(ligne?.moteur) +
      parseInt(ligne?.pulv) +
      parseInt(ligne?.complet);
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
    setLoading(true);
    api.get(`api/recette-date/${date}`).then((res) => {
      setLoading(false);
      setRecettes(res.data);
    });
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
      synthese?.encaissements
        .map((item) => item?.bonclients_montant)
        .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
    return total;
  }

  const loadJournee = () => {
    api.get(`api/recette-date/${date}`).then((res) => {
      setLoad(false);
      setRecettes(res.data);
    });
    api.get(`api/caisse_par/${date}`).then((res) => {
      setCaisses(res.data.caisses);
      setSynthese(res.data.synthese);
      setLoad(false);
    });
  };
  function approuver(id) {
    api.get(`api/approuver_caisse/${id}`).then((respone) => {
      loadJournee();
    });
  }
  useEffect(() => {
    setLoad(true);
    loadJournee();
  }, [date]);

  if (load) {
    return <Loader />;
  }

  const separateur = (nombre) => {
    if (nombre) {
      nombre = nombre.toLocaleString();
      return nombre
        .replace(/ /g, "")
        .replace(/[^0-9]+/, "")
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    }
    return "0";
  };
  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour}/${mois}/${d.getFullYear()}`;
  }

  return (
    <>
      <Card className="caisses">
        <h2 className="center py-3" style={{ fontWeight: "bolder" }}>
          Rapport du {formatdate(date)}
        </h2>
        <Box sx={{ px: 3, py: 1 }}>
          <div className="py-4">
            {(!caisses || (caisses && caisses.length == 0)) && (
              <button
                onClick={() => {
                  setCaisses(null);
                  setStateModalAddCaisse(true);
                }}
                className="btn btn-success px-5 mb-2"
              >
                Ajouter
              </button>
            )}

            {caisses && caisses.length != 0 && (
              <>
                <button
                  onClick={() => {
                    setStateModalAddCaisse(true);
                  }}
                  className="btn btn-success px-5 mb-3"
                >
                  Modifier
                </button>

                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Caisses </th>
                      <th>Total carburant</th>
                      <th>Coffre</th>
                      <th>Total net à verser</th>
                      <th>Net versé</th>
                      <th>Ecart</th>
                      <th>Pompiste</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caisses &&
                      caisses?.map((caisse, index) => (
                        <tr key={index}>
                          <td>
                            <Link
                              to={`/chefpistes/ficheChefPistes/${caisse?.id}`}
                            >
                              Caisse Pompe {caisse?.pompe?.numero}{" "}
                            </Link>
                          </td>
                          <td>
                            {
                              /* separateur */ /* caisse?.coffre + caisse?.netVer + caisse?.ecart */
                              separateur(
                                Math.round(
                                  (Number(caisse?.coffre) +
                                    Number(caisse?.netVer) +
                                    Number(caisse?.ecart)) *
                                    100
                                ) / 100
                              )
                            }
                          </td>
                          <td>{separateur(caisse?.coffre)}</td>
                          <td>
                            {separateur(
                              Math.round(
                                (Number(caisse.netVer) + Number(caisse.ecart)) *
                                  100
                              ) / 100
                            )}
                          </td>
                          <td>
                            {separateur(Math.round(caisse?.netVer * 100) / 100)}
                          </td>
                          <td>
                            {Math.round(Number(caisse?.ecart) * 100) / 100}
                          </td>

                          <td>{caisse?.user?.name}</td>
                          <td>
                            {caisse?.approuve == 0 ? (
                              <button
                                onClick={() => approuver(caisse?.id)}
                                className="btn btn-success text-center text-ligh btn-sm"
                                style={{ borderRadius: "5px" }}
                              >
                                Approuver
                              </button>
                            ) : (
                              <button
                                onClick={() => approuver(caisse?.id)}
                                className="btn btn-warning text-center  text-ligh btn-sm"
                                style={{ borderRadius: "5px" }}
                              >
                                {" "}
                                Désapprouver
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <div className="row">
                  {/*  <div className="col-12 col-md-6">
                    <table className="table table-bordered table-responsive-md">
                      <thead>
                        <tr>
                          <th> Fiche à remplir </th>

                          <th>Nombre de voitures</th>
                          <th>Montant encaissé</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {" "}
                            <Link
                              to={`/chefpistes/ficheChefPistes/ficheLavage/${date}`}
                            >
                              <Button>Fiche Lavages</Button>
                            </Link>{" "}
                          </td>

                          <td style={{ verticalAlign: "middle" }}>
                            {" "}
                            {lavages && lavages.length}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {" "}
                            {recettes ? separateur(montanttotal()) :0} FCFA{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}
                  <div className="col-12 col-md-12">
                    <table className="table table-bordered table-responsive-md">
                      <thead>
                        <tr>
                          <th> Fiche à remplir </th>
                          <th style={{ width: "120px" }}> Lavages </th>
                          <th style={{ width: "120px" }}> Accessoires </th>
                          <th style={{ width: "120px" }}> Lubrifiants </th>
                          <th style={{ width: "120px" }}> Fûts </th>
                          <th>Montant encaissé</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {" "}
                            <span
                              className="badge badge-primary "
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setShowModalAddRecette(true);
                                setShowprodM(true);
                              }}
                            >
                              Autres recettes
                            </span>
                          </td>
                          {recettes &&
                            recettes.map((r, index) => (
                              <td
                                style={{ verticalAlign: "middle" }}
                                key={index}
                              >
                                {separateur(r.totallav)}
                              </td>
                            ))}
                          {recettes &&
                            recettes.map((r, index) => (
                              <td
                                style={{ verticalAlign: "middle" }}
                                key={index}
                              >
                                {separateur(r.totalacc)}
                              </td>
                            ))}{" "}
                          {recettes &&
                            recettes.map((r, index) => (
                              <td
                                style={{ verticalAlign: "middle" }}
                                key={index}
                              >
                                {separateur(r.totallub)}
                              </td>
                            ))}{" "}
                          {recettes &&
                            recettes.map((r, index) => (
                              <td
                                style={{ verticalAlign: "middle" }}
                                key={index}
                              >
                                {separateur(r.totalfut)}
                              </td>
                            ))}
                          <td style={{ verticalAlign: "middle" }}>
                            {" "}
                            {separateur(montanttotalrecette())} FCFA{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Synthèse </th>
                      <th>Versement du jour</th>

                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {synthese ? (
                          <Link
                            to={`/chefpistes/ficheChefPistes/synthese/${synthese?.date}`}
                          >
                            Synthèse
                          </Link>
                        ) : (
                          <Link
                            to={`/chefpistes/ficheChefPistes/synthese/${caisses[0].date_caisse}`}
                          >
                            Synthèse
                          </Link>
                        )}
                      </td>
                      <td>
                        {separateur(
                          totalVersement() +
                            montanttotal() +
                            montanttotalrecette()
                        )}{" "}
                        FCFA
                      </td>

                      <td>
                        {synthese && synthese.etat == 1 ? (
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
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </Box>
      </Card>
      {/*  <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
      <ModalAddCaisses
        show={stateModalAddCaisse}
        onHide={() => setStateModalAddCaisse(false)}
        caisses={caisses}
        reloadJournee={loadJournee}
        date={date}
      />
      {showProdM && (
        <ModaleAddRecette
          show={showModalAddRecette}
          onHide={() => {
            setShowModalAddRecette(false);
            setShowprodM(false);
          }}
        />
      )}
    </>
  );
}
