import React, { useState, useEffect } from "react";
import "./indeComp.css";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { separateur } from "src/utils/formatNumber";

export default function IndeComp({ caisses, totalgaz, totalsup, synthese }) {
  let { date } = useParams();
  //const[rappActi , setRappActi] = useState (null);
  //const[comercials , setComercials] = useState (null);

  ///////////// TOTAL REMISE EN CUVE SUPER ET GASOIL
  function totalRCSuper() {
    let total = 0;
    synthese &&
      synthese.remise_cuves.map((remise_cuve, i) => {
        if (remise_cuve.reservoir.carburant.toLowerCase() == "super") {
          total += Number(remise_cuve.capacite);
        }
      });
    return total;
  }
  function totalRCGasoil() {
    let total = 0;
    synthese &&
      synthese.remise_cuves.map((remise_cuve, i) => {
        if (remise_cuve.reservoir.carburant.toLowerCase() == "gasoil") {
          total += Number(remise_cuve.capacite);
        }
      });
    return total;
  }

  /////////total SORTIE SUPER (fermeture super2)
  function totalSortieSuper() {
    let totalSortie = 0;
    caisses &&
      caisses.map((caisse) =>
        caisse?.compteurs.map((compteur, j) => {
          if (compteur?.pistolet.carburant.toLowerCase() == "super") {
            totalSortie += caisse.compteurs
              .map((compteur) =>
                compteur?.pistolet.carburant.toLowerCase() == "super"
                  ? Number(compteur.indexFerE)
                  : 0
              )
              .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
          }
        })
      );
    return totalSortie;
  }
  function totalSortieSuper() {
    let total = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          if (compteur.pistolet.carburant.toLowerCase() == "super") {
            total += Number(compteur.indexFerE);
          }
        });
      });
    return total;
  }
  ///////////////total SORTIE GASOIL (fermeture super2)
  function totalSortieGasoil() {
    let total = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          if (compteur.pistolet.carburant.toLowerCase() == "gasoil") {
            total += Number(compteur.indexFerE);
          }
        });
      });
    return total;
  }

  ////////////////// VENTE DU JOUUUR ///////////////////////
  function venteJourSuper() {
    let vente = 0,
      venteSuper = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          if (compteur.pistolet.carburant.toLowerCase() == "super") {
            venteSuper = compteur.indexFerE - compteur.indexOuvE;
            vente += venteSuper;
          }
        });
      });
    return vente;
  }
  function venteJourGasoil() {
    let vente = 0,
      venteGasoil = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          if (compteur.pistolet.carburant.toLowerCase() == "gasoil") {
            venteGasoil = compteur.indexFerE - compteur.indexOuvE;
            vente += venteGasoil;
          }
        });
      });
    return vente;
  }

  ////////////////////////PRIX DE VENTE SUPER ET GASOIL
  function prixVenteSuper() {
    let prixVente = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          if (compteur.pistolet.carburant.toLowerCase() == "super") {
            prixVente = compteur.prix;
          }
        });
      });
    return prixVente;
  }

  function prixVenteGasoil() {
    let prixVente = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          if (compteur.pistolet.carburant.toLowerCase() == "gasoil") {
            prixVente = compteur.prix;
          }
        });
      });
    return prixVente;
  }
  /////////////////

  return (
    <div className="ficheIndeComp">
      <Table className="tableIndeComp" hover striped bordered size="sm">
        <thead>
          <tr className="center color titre ">
            <th colSpan="3" style={{ padding: "13px" }}>
              {" "}
              INDEX COMPTEURS{" "}
            </th>
          </tr>
        </thead>

        <tbody className="">
          <tr className="indeComp bord ">
            <th className="" style={{ width: "40%" }}>
              {" "}
              DESIGNATION{" "}
            </th>
            <th> SUPER </th>
            <th> GASOIL </th>
          </tr>

          <tr className="indeComp ">
            <th style={{ fontSize: "12px" }}> TOTAL SORTIE VEILLE</th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color titre "
                value="#######"
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color titre "
                value="#######"
              />{" "}
            </th>
          </tr>
          {caisses &&
            caisses.map((caisse, i) =>
              caisse.compteurs.map((compteur, j) => (
                <tr className="indeComp" key={j}>
                  <th>{compteur.pistolet.nom}</th>

                  {compteur.pistolet.carburant == "gasoil" ? (
                    <>
                      <td style={{ textAlign: "center" }}> //////</td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {separateur(compteur.indexFerE)}{" "}
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {compteur && separateur(compteur.indexFerE)}{" "}
                      </td>
                      <th className="center"> //////</th>
                    </>
                  )}
                </tr>
              ))
            )}

          <tr className="indeComp">
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
          </tr>
          <tr className="indeComp">
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
          </tr>
          <tr className="indeComp bord">
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
            <th style={{ textAlign: "center", padding: "16px" }}> </th>
          </tr>
          <tr className="indeComp">
            <th>TOTAL SORTIE </th>

            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalSortieSuper())}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalSortieGasoil())}{" "}
            </td>
          </tr>

          <tr className="indeComp">
            <th>REMISE EN CUVE </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalRCSuper())}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalRCGasoil())}{" "}
            </td>
          </tr>
          <tr className="indeComp">
            <th>VENTE DU JOUR </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ venteJourSuper()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ venteJourGasoil()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
          </tr>
          <tr className="indeComp">
            <th>CUMUL MOIS </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color titre"
                value="#######"
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color titre"
                value="#######"
              />{" "}
            </th>
          </tr>

          <tr className="indeComp">
            <th>PRIX VENTE </th>
            <td style={{ textAlign: "center" }}>{prixVenteSuper()} </td>
            <td style={{ textAlign: "center" }}> {prixVenteGasoil()} </td>
          </tr>
          <tr className="indeComp">
            <th>TOTAL VENDU</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ totalsup
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ totalgaz
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
