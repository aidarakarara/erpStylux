import React, { useState, useEffect } from "react";
import "./index.css";
import { Table } from "react-bootstrap";
import api from "src/api/api";
import { separateur } from "src/utils/formatNumber";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ispompiste from "./useIsPompiste";
import isApprouve from "./useIsApprouve";

export default function Index() {
  const [params, setParams] = useState(useParams());

  const [pistolets, setPistolets] = useState([]);
  const [caisse, setCaisse] = useState(null);

  useEffect(() => {
    api.get(`api/caisses/${params && params.caisse}`).then((res) => {
      var pistTmp = [];
      setCaisse(res?.data?.caisse);
      res?.data?.pistolets?.map((pist) => {
        if (!pist.compteur) {
          pist.compteur = {
            caisse_id: params.caisse,
            pistolet_id: pist?.id,
            indexOuvE: pist?.indexE,
            indexOuvM: pist?.indexM,
            indexFerE: "",
            indexFerM: "",
            prix: pist.prix,
          };
        }
        pistTmp.push(pist);
      });
      setPistolets(pistTmp);
    });
    // console.log('isPompiste',);
  }, []);

  function totalSortie(ferm, ouv) {
    console.log("ferm", ferm, "ouv", ouv);
    if (+ferm > +ouv) return parseFloat(ferm) - parseFloat(ouv);
    return 0;
  }

  function montantCompteur(prix = 1, tSortie = 0) {
    return Math.round(prix * tSortie * 100) / 100;
  }

  function montantTotal() {
    var total = 0;
    pistolets &&
      pistolets.map((item) => {
        const res =
          totalSortie(item?.compteur?.indexFerE, item?.compteur?.indexOuvE) *
          item?.compteur?.prix;
        total += res;
      });

    return Math.round(total * 100) / 100;
  }
  const updateIndexCompteur = (index, e) => {
    let newArr = [...pistolets]; // copying the old datas array
    let prop = e.target.name;
    if (prop === "indexFerE")
      newArr[index].compteur.indexFerE = e.target.value.replace(/\s+/g, "");
    if (prop === "indexFerM")
      newArr[index].compteur.indexFerM = e.target.value.replace(/\s+/g, "");
    setPistolets(newArr);
  };

  function notifier() {
    toast.success("Fichier sauvegardé avec succès !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  /**
   * Enregistrer/Modifier tous les Index Compteurs Et Pistolets
   */
  function saveAll() {
    api.get("sanctum/csrf-cookie").then((response) => {
      pistolets.map((pistolet) => {
        if (pistolet.compteur.id) {
          api
            .put(`api/compteurs/${pistolet.compteur.id}`, pistolet.compteur)
            .then((res) => console.log("Pistolets Faites"));
        } else {
          api.post("api/compteurs", pistolet.compteur).then((res) => {});
        }
        //modifier index pistolet
        const { compteur, ...pist } = pistolet;
        pist.indexE = pistolet.compteur.indexFerE;
        pist.indexM = pistolet.compteur.indexFerM;
        api
          .put(`api/pistolets/${pistolet.id}`, pist)
          .then((res) => console.log("Pistolets Faites"));
      });
      notifier();
    });
  }

  return (
    <div className="index row">
      <ToastContainer
        style={{ marginTop: "50px", width: "350px" }}
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
      {pistolets &&
        pistolets.map((pistolet, index) => {
          return (
            <div className=" col-md-6 col-sm-12 col-xs-12" key={index}>
              <Table
                className="tableIndex mb-3"
                hover
                striped
                bordered
                size="sm"
                responsive="lg"
              >
                <thead>
                  <tr
                    className={`tr-${
                      pistolet?.carburant == "super" ? "super" : "gasoil"
                    }`}
                  >
                    <th className="bordT bordB bordR bordL" colSpan="3">
                      {" "}
                      <center style={{ textTransform: "upperCase" }}>
                        {" "}
                        INDEX {pistolet?.nom}
                      </center>
                    </th>
                  </tr>
                </thead>

                <thead className="sous-titre">
                  <tr>
                    <th className="bordL bordR2 bordB" colSpan="2">
                      {" "}
                      <center>ELECTRONIQUES</center>
                    </th>
                    <th className="bordR bordB">
                      {" "}
                      <center> MECANIQUES </center>{" "}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="bordL bordR2">
                      <b>Fermeture</b>
                    </td>
                    <td className="indexFerme bordR2">
                      <input
                        type="tel"
                        autoComplete="off"
                        value={/* separateur */ pistolet.compteur.indexFerE}
                        className="form-control"
                        onChange={(e) => updateIndexCompteur(index, e)}
                        name="indexFerE"
                        disabled={
                          ispompiste() && !isApprouve(caisse && caisse.approuve)
                            ? false
                            : true
                        }
                      />
                    </td>
                    <td className="indexFerme bordR">
                      <input
                        type="tel"
                        autoComplete="off"
                        value={/* separateur */ pistolet.compteur.indexFerM}
                        onChange={(e) => updateIndexCompteur(index, e)}
                        className="form-control"
                        name="indexFerM"
                        disabled={
                          ispompiste() && !isApprouve(caisse && caisse.approuve)
                            ? false
                            : true
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="bordL bordR2">
                      <b>Ouverture</b>
                    </td>
                    <td className="bordR2">
                      <center>
                        {pistolet?.compteur?.indexOuvE &&
                          /* separateur */ (pistolet?.compteur?.indexOuvE)
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )}
                      </center>
                    </td>
                    <td className="bordR">
                      <center>
                        {" "}
                        {pistolet?.compteur?.indexOuvM &&
                          /* separateur */ (pistolet?.compteur?.indexOuvM)
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )}
                      </center>
                    </td>
                  </tr>
                  <tr>
                    <td className="bordL bordR2">
                      <b>Sortie</b>
                    </td>
                    <td className="bordR2">
                      {(
                        Math.round(
                          totalSortie(
                            pistolet?.compteur?.indexFerE,
                            pistolet?.compteur?.indexOuvE
                          ) * 100
                        ) / 100
                      )
                        .toFixed(2)
                        .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
                    </td>
                    <td className="bordR">
                      {(
                        Math.round(
                          totalSortie(
                            pistolet?.compteur?.indexFerM,
                            pistolet?.compteur?.indexOuvM
                          ) * 100
                        ) / 100
                      )
                        .toFixed(2)
                        .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
                    </td>
                  </tr>
                  <tr>
                    <td className="bordL bordR2">
                      <b>Prix U</b>
                    </td>
                    <td className="bordR" colSpan="2">
                      {" "}
                      <center> {pistolet?.compteur?.prix} </center>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="bordL bordB bordR2">
                      <b>Montant</b>
                    </td>
                    <td className="bordB bordR2">
                      {
                        /* separateur */ montantCompteur(
                          pistolet?.compteur?.prix,
                          totalSortie(
                            pistolet?.compteur?.indexFerE,
                            pistolet?.compteur?.indexOuvE
                          )
                        )
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }
                      {/* {separateur(1000.505)} */}
                    </td>
                    <td className="bordR bordB">
                      {" "}
                      {
                        /* separateur */ montantCompteur(
                          pistolet?.compteur?.prix,
                          totalSortie(
                            pistolet?.compteur?.indexFerM,
                            pistolet?.compteur?.indexOuvM
                          )
                        )
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }
                    </td>
                  </tr>
                </tbody>
              </Table>

              <div className="sous-somme">
                <div>
                  <span>
                    <b style={{ textTransform: "upperCase" }}>
                      MONTANT VENTES {""} :{" "}
                    </b>
                  </span>
                  <span>
                    <b>
                      {
                        /* separateur */ montantCompteur(
                          pistolet?.compteur?.prix,
                          totalSortie(
                            pistolet?.compteur?.indexFerE,
                            pistolet?.compteur?.indexOuvE
                          )
                        )
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }
                    </b>
                  </span>
                </div>
              </div>
            </div>
          );
        })}

      <div className="somme col-md-12 mt-4">
        <div>
          <span>
            <b>
              MONTANT TOTAL VENTES POMPE N° {caisse && caisse.pompe.numero}:{" "}
            </b>
          </span>
          <span>
            <b>
              {" "}
              {
                /* separateur */ montantTotal()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </b>
          </span>
        </div>
      </div>
      <Table
        className="justify-content-center "
        style={{ textAlign: "center" }}
      >
        {ispompiste() && !isApprouve(caisse && caisse.approuve) ? (
          <button className="btn btn-success mt-5 mb-0" onClick={saveAll}>
            Sauvegarder
          </button>
        ) : null}
      </Table>
    </div>
  );
}
