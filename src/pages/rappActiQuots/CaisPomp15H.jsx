import React, { useState } from "react";
import "./caisPomp15H.css";
import { Table } from "react-bootstrap";
import { separateur } from "src/utils/formatNumber";

export default function CaisPomp15H({ caisses, synthese }) {
  //DEPENSES TOTALES
  function depenseTotales() {
    let total = 0;
    caisses &&
      caisses.map((caisse) => {
        total += caisse.depenses
          .map((depense) => Number(depense.montant))
          .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
      });
    return total;
  }
  ////////////////////// Ventes TPE (total pompe1 et pompe2)
  function totalVenteTpesPompe1_2() {
    let totalVenteTpe = 0;
    caisses &&
      caisses.map((caisse) => {
        totalVenteTpe += caisse.vente_tpes
          .map((vente_tpe) => Number(vente_tpe.montant))
          .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
      });
    return totalVenteTpe;
  }

  /////////total VENTE PAR TPE pompe1 et pompe2
  function totalVenteTpesPompe2() {
    let totalVenteTpe = 0;
    caisses &&
      caisses.map((caisse) => {
        if (caisse.pompe.numero == "2") {
          totalVenteTpe += caisse.vente_tpes
            .map((vente_tpe) => Number(vente_tpe.montant))
            .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
        }
      });
    return totalVenteTpe;
  }

  function totalVenteTpesPompe1() {
    let totalVenteTpe = 0;
    caisses &&
      caisses.map((caisse) => {
        if (caisse.pompe.numero == "1") {
          totalVenteTpe += caisse.vente_tpes
            .map((vente_tpe) => Number(vente_tpe.montant))
            .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
        }
      });
    return totalVenteTpe;
  }
  // TR TOTAL MISE EN COFFRE
  function totalMiseEnCoffre() {
    let totalCoffre = 0;
    caisses &&
      caisses.map((caisse) => {
        if (caisse.pompe.numero == "1") {
          totalCoffre += caisse.coffre;
          /** .map((vente_tpe) => Number(vente_tpe.montant))
          .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0); */
        }
      });
    return totalCoffre;
  }
  /////////////remise en cuve
  function remiseEnCuveSuper() {
    let remise = 0;
    synthese &&
      synthese.remise_cuves.map((remise_cuve, j) => {
        if (remise_cuve.reservoir.carburant.toLowerCase() == "super") {
          /*   remise += synthese.remise_cuves
           .map((remise_cuve) => Number(remise_cuve.capacite))
          .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);  */

          remise += synthese.remise_cuves
            .map((remise_cuve) =>
              remise_cuve.reservoir.carburant.toLowerCase() == "super"
                ? Number(remise_cuve.capacite)
                : 0
            )
            .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
        }
      });
    return remise;
  }

  return (
    <div className="ficheCaisPomp15H">
      <Table className="tableCaisPomp15H" hover striped bordered size="sm">
        <thead>
          <tr className="center color titre">
            <th colSpan="12" style={{ padding: "13px" }}>
              {" "}
              CAISSE POMPISTES A 15H00{" "}
            </th>
          </tr>
        </thead>

        <tbody className="">
          <tr className="caisPomp ">
            <th className="width"> ILOTS </th>
            {caisses &&
              caisses.map((caisse, i) => (
                <th colSpan={caisse.pompe.pistolets.length} className="center">
                  {" "}
                  POMPE {caisse.pompe.numero}
                </th>
              ))}
          </tr>
          <tr className="caisPomp">
            <th> POMPISTES DU JOUR </th>
            {caisses &&
              caisses.map((caisse, i) => (
                <th colSpan={caisse.pompe.pistolets.length} className="center">
                  {" "}
                  {caisse.user.name}{" "}
                </th>
              ))}
          </tr>
          <tr className="caisPomp">
            <th> PRODUIT </th>
            {caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, j) => (
                  <th colSpan="" className="center">
                    {" "}
                    {compteur.pistolet.nom}{" "}
                  </th>
                ))
              )}
          </tr>
          <tr className="caisPomp">
            <th> INDEX FERMETURE </th>
            {caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, j) => (
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {separateur(compteur.indexFerE)}{" "}
                  </td>
                ))
              )}
          </tr>
          <tr className="caisPomp">
            <th> INDEX OUVERTURE </th>
            {caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, j) => (
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {separateur(compteur.indexOuvE)}{" "}
                  </td>
                ))
              )}
          </tr>
          {/*   <tr className="caisPomp ">
            <th> RC </th>
           { synthese &&
              synthese.remise_cuves.map((remise_cuve, j) => (  
            <th colSpan="">
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center"
               // value={ remiseEnCuveGasoil()} value={remiseEnCuveSuper()}
             //  value={remise_cuve.capacite}
              />{" "}
            </th>

            ))
          }
          </tr> */}
          <tr className="caisPomp  color">
            <th className="titre"> TOTAL VENDU </th>
            {caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, j) => (
                  <th className="titre" style={{ textAlign: "center" }}>
                    {" "}
                    {Number(
                      compteur.indexFerE - compteur.indexOuvE
                    ).toLocaleString()}
                  </th>
                ))
              )}
          </tr>
          <tr className="caisPomp">
            <th> PRIX DU LITRE DE CARBURANT </th>
            {caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, j) => (
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {separateur(compteur.prix)}{" "}
                  </td>
                ))
              )}
          </tr>
          <tr className="caisPomp">
            <th> MONTANT TOTAL/POMPE </th>
            {caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, j) => (
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {
                      /* separateur */ (
                        Number(compteur.indexFerE - compteur.indexOuvE) *
                        Number(compteur.prix)
                      )
                        .toFixed(2)
                        .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                    }{" "}
                  </td>
                ))
              )}
          </tr>
          <tr className="caisPomp">
            <th> DEPENSES TOTALES </th>
            <td colSpan="12" style={{ textAlign: "center" }}>
              {" "}
              {separateur(depenseTotales())}{" "}
            </td>
          </tr>
          <tr className="caisPomp">
            <th> TOTAL VENTES A CREDIT </th>
            <td colSpan="12" style={{ textAlign: "center" }}>
              {" "}
            </td>
          </tr>
          <tr className="caisPomp">
            <th> TOTAL VENTES PAR TPE </th>
            <td colSpan="12" style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ totalVenteTpesPompe1_2()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
          </tr>

          <tr className="caisPomp">
            <th> CHEQUE </th>
            <td colSpan="12" style={{ textAlign: "center" }}>
              {" "}
            </td>
          </tr>
          <tr className="caisPomp">
            <th> TOTAL TPE </th>
            <td colSpan="12" style={{ textAlign: "center" }}>
              {" "}
            </td>
          </tr>
          <tr className="caisPomp">
            <th> </th>
            <td colSpan="12" style={{ textAlign: "center", padding: 14 }}>
              {" "}
            </td>
          </tr>
          <tr className="caisPomp">
            <th> </th>
            <td colSpan="12" style={{ textAlign: "center", padding: 14 }}>
              {" "}
            </td>
          </tr>

          <tr className="caisPomp" style={{ backgroundColor: "red" }}>
            <th className="titre"> TOTAL MISE EN COFFRE </th>
            {caisses &&
              caisses.map((caisse, i) => (
                <th
                  colSpan={caisse.pompe.pistolets.length}
                  className="titre"
                  style={{ textAlign: "center" }}
                >
                  {separateur(Number(caisse.coffre))}
                </th>
              ))}
          </tr>
          <tr className="caisPomp">
            <th> TOTAL A VERSER </th>
            {caisses &&
              caisses.map((caisse, i) => (
                <td
                  colSpan={caisse.pompe.pistolets.length}
                  style={{ textAlign: "center" }}
                >
                  {
                    /* separateur */ (
                      Number(caisse.netVer) + Number(caisse.ecart)
                    )
                      .toFixed(2)
                      .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                  }
                </td>
              ))}
          </tr>
          <tr className="caisPomp">
            <th> TOTAL VERSE </th>
            {caisses &&
              caisses.map((caisse, i) => (
                <td
                  colSpan={caisse.pompe.pistolets.length}
                  style={{ textAlign: "center" }}
                >
                  {
                    /* separateur */ Number(caisse.netVer)
                      .toFixed(2)
                      .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                  }
                </td>
              ))}
          </tr>

          <tr className="caisPomp">
            <th> ECART CAISSE POMPISTE </th>
            {caisses &&
              caisses.map((caisse, i) => (
                <th
                  colSpan={caisse.pompe.pistolets.length}
                  style={{ textAlign: "center" }}
                >
                  {
                    /* separateur */ caisse.ecart
                      .toFixed(2)
                      .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                  }
                </th>
              ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
