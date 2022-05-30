import React, { useState } from "react";
import "./regiGestInde.css";
import { Table } from "react-bootstrap";
import { separateur } from "src/utils/formatNumber";
import toDate from "date-fns/fp/toDate/index";

export default function RegiGestInde({ caisses, synthese }) {
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

  /////////////////////TOTAL VOLUME VENDUU //////////////////
  function totalVolumeVendu() {
    let volume = 0,
      vol = 0;
    caisses &&
      caisses.map((caisse) =>
        caisse.compteurs.map((compteur, j) => {
          vol = compteur.indexFerE - compteur.indexOuvE;
          volume += vol;
        })
      );
    return volume;
  }
  //////////////////  TOTAL PAR POMPE = Total PAR PISTOLET /////////////////
  function totalParPompe() {
    let total = 0,
      vol = 0;
    caisses &&
      caisses.map((caisse) =>
        caisse.compteurs.map((compteur, j) => {
          vol = (compteur.indexFerE - compteur.indexOuvE) * compteur.prix;
          total += vol;
        })
      );
    return total;
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
  //////////////////////////TOTAL REMISE EN CUVE
  function totalRemiseEnCuve() {
    let totalRemise = 0;
    synthese &&
      synthese.remise_cuves.map(
        (remise_cuve, i) => (totalRemise += Number(remise_cuve.capacite))
      );
    return totalRemise;
  }
  ////////////  TOTAL INDEX OUVERTURE (A)
  function totalIndexOuverture() {
    let total = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          total += Number(compteur.indexOuvE);
        });
      });
    return total;
  }
  ////////////  TOTAL INDEX FERMETURE (B)
  function totalIndexFermeture() {
    let total = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          total += Number(compteur.indexFerE);
        });
      });
    return total;
  }
  /////////////////////TOTAL VOLUME VENDUU //////////////////
  /* function totalvOLUME() {
    
    caisses && caisses.map((caisse) => (
    caisse.compteurs.map((compteur) => {
      return compteur.indexFerE-compteur.indexOuvE
         ? compteur.indexFerE-compteur.indexOuvE
        : 0;
    })
  //  .reduce((prev = 0, next = 0) => Number(prev) + Number(next),0)

  ))
   }  */
  ///////////////////////////////////////////

  return (
    <div className="row ficheRegiGestInde">
      <div className="table-responsive col col-xs-12 col-sm-12 col-md-12 col-lg-8">
        <Table
          className="tableRegiGestInde "
          hover
          table-striped
          bordered
          style={{ marginTop: 0 }}
          size="sm"
        >
          <thead>
            <tr className="titre">
              <th className="center color" colSpan="12" style={{ padding: 13 }}>
                {" "}
                <strong> REGISTRE - GESTION DES INDEX </strong>{" "}
              </th>
            </tr>
          </thead>

          <tbody className="center">
            <tr className="regiGestInde ">
              <th className="" rowSpan="3">
                {" "}
                ILOTS{" "}
              </th>
              <th className="" rowSpan="3">
                {" "}
                Produit par pompe{" "}
              </th>
              <th className="" colSpan="2">
                {" "}
                INDEX{" "}
              </th>

              <th className="" rowSpan="2">
                {" "}
                Volume Vendu{" "}
              </th>
              <th className="" rowSpan="3">
                {" "}
                PU{" "}
              </th>
              <th className="" rowSpan="2" colSpan="3">
                {" "}
                Recettes du jour{" "}
              </th>
            </tr>
            <tr className="regiGestInde ">
              <th className="">Ouverture</th>
              <th className=""> Fermeture </th>
            </tr>
            <tr className="regiGestInde ">
              <th className=""> A</th>
              <th className=""> B</th>
              <th className=""> B-A [-c]</th>
              <th className=""> Par Pistolet</th>
              <th className=""> Par Face</th>
              <th className=""> Par Pompe </th>
            </tr>

            <th className="" rowSpan="10" style={{ paddingTop: "50px" }}>
              {" "}
              ILOTS 1 et 2{" "}
            </th>

            {caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, j) => (
                  <tr className="regiGestInde">
                    <th className=""> {compteur.pistolet.nom} </th>
                    {/*ouverture */}
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {separateur(compteur.indexOuvE)}{" "}
                    </td>
                    {/*fermeture */}
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {separateur(compteur.indexFerE)}{" "}
                    </td>

                    {/*Volume vendu */}
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {
                        /* separateur */ (
                          compteur.indexFerE - compteur.indexOuvE
                        )
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }
                    </td>
                    {/*Prix par pompe*/}

                    <td
                      className=" titre "
                      style={{ textAlign: "center", backgroundColor: "red" }}
                    >
                      {compteur.prix}{" "}
                    </td>

                    {/*Recette par Pistolet */}
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {
                        /* separateur */ (
                          (compteur.indexFerE - compteur.indexOuvE) *
                          compteur.prix
                        )
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }{" "}
                    </td>

                    {/*Recette par face */}
                    <td style={{ textAlign: "center" }}> </td>

                    {/*Recette par Pompe */}
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {
                        /* separateur */ (
                          (compteur.indexFerE - compteur.indexOuvE) *
                          compteur.prix
                        )
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }{" "}
                    </td>
                  </tr>
                ))
              )}

            <tr className="regiGestInde ">
              <th colSpan="1" className="">
                {" "}
                TOTAL
              </th>
              {/*Total Ouverture */}
              <th style={{ textAlign: "center" }}>
                {" "}
                {
                  /* separateur */ totalIndexOuverture()
                    .toFixed(2)
                    .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                }{" "}
              </th>

              {/*Total fermeture */}
              <th style={{ textAlign: "center" }}>
                {" "}
                {
                  /* separateur */ totalIndexFermeture()
                    .toFixed(2)
                    .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                }{" "}
              </th>

              {/*Total Volume vendu */}
              <th style={{ textAlign: "center" }}>
                {" "}
                {
                  /* separateur */ totalVolumeVendu()
                    .toFixed(2)
                    .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                }{" "}
              </th>

              {/*prix */}
              <th style={{ textAlign: "center" }}></th>

              {/*total par Pistolet */}
              <th style={{ textAlign: "center" }}>
                {
                  /* separateur */ totalParPompe()
                    .toFixed(2)
                    .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                }
              </th>

              {/*vide */}
              <th style={{ textAlign: "center" }}> </th>

              {/*total par pompe */}
              <th style={{ textAlign: "center" }}>
                {
                  /* separateur */ totalParPompe()
                    .toFixed(2)
                    .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                }
              </th>
            </tr>
          </tbody>
        </Table>
      </div>

      {/*----------------------2em Tableau--------------------*/}

      <div className="table-responsive col col-xs-12 col-sm-12 col-md-12 col-lg-2">
        <Table
          className="tableRegiGestInde "
          hover
          table-striped
          bordered
          style={{ marginTop: 0, marginLeft: -8 }}
          size="sm"
        >
          <thead>
            <tr className="titre">
              <th className="center color" colSpan="12" style={{ padding: 15 }}>
                {" "}
                <strong> Remise cuve</strong>{" "}
              </th>
            </tr>
          </thead>

          <tbody className="center">
            <tr className="regiGestInde ">
            {/*   <th className="" rowSpan="2" colSpan={2} style={{ padding: 11 }}>
                {" "}
                Total RC{" "}
              </th> */}
            </tr>

            <tr className="regiGestInde "></tr>

            <tr className="regiGestInde ">
              {/*   <th className="" rowSpan="">
                {" "}
                C
              </th> */}
            </tr>

            {synthese &&
              synthese.remise_cuves.map((remise_cuve, i) => (
                <tr className="regiGestInde" key={i}>
                  {remise_cuve.reservoir.carburant.toLowerCase() == "gasoil" ? (
                    <>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {remise_cuve.capacite}{" "}
                      </td>
                      <th></th>
                    </>
                  ) : (
                    <>
                      <td style={{ textAlign: "center" }}>
                        {remise_cuve.capacite}{" "}
                      </td>

                      <th>GIM </th>
                    </>
                  )}
                </tr>
              ))}

            <tr className="regiGestInde ">
              <th colSpan="1" className="">
                {" "}
                total
              </th>

              <th style={{ textAlign: "center" }}>
                {" "}
                {
                  /* separateur */ totalRemiseEnCuve()
                    .toFixed(2)
                    .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                }
              </th>
            </tr>
          </tbody>
        </Table>
      </div>
      {/*----------------------3em Tableau--------------------*/}
      <div className="table-responsive col col-xs-12 col-sm-12 col-md-12 col-lg-2">
        <Table
          className="tableRegiGestInde "
          hover
          table-striped
          bordered
          style={{ marginTop: 0, marginLeft: -15 }}
          size="sm"
        >
          <thead>
            <tr className="titre">
              <th className="center color" colSpan="12" style={{ padding: 15 }}>
                {" "}
                <strong> Montant TPE </strong>{" "}
              </th>
            </tr>
          </thead>

          <tbody className="center">
            <tr className="regiGestInde ">
              <th className="" style={{ padding: 30 }}>
                Montant TPE{" "}
              </th>
            </tr>

            {/* */}
            {caisses &&
              caisses.map(
                (caisse, i) =>
                  // caisse.compteurs.map((compteur,k)=>(
                  caisse.vente_tpes.map((vente_tpe, k) => (
                    <tr className="regiGestInde">
                      {/* <th> {compteur.pistolet.nom } </th> */}

                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {
                          /* separateur */ vente_tpe.montant
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )
                        }{" "}
                      </td>
                    </tr>
                  ))
                // ))
              )}

            <th style={{ textAlign: "center", padding: "14px" }}> </th>

            <tr className="regiGestInde ">
              <th colSpan="1" className="">
                {" "}
                TOTAL :{" "}
                {
                  /* separateur */ totalVenteTpesPompe1_2()
                    .toFixed(2)
                    .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                }
              </th>
            </tr>
          </tbody>
        </Table>
      </div>

      {/*----------------------4em Tableau--------------------
      <div className="table-responsive col col-xs-12 col-sm-12 col-md-12 col-lg-2">
        <Table
          className="tableRegiGestInde "
          hover
          table-striped
          bordered
          style={{ marginTop: 0 }}
          size="sm"
        >
          <thead>
            <tr className="titre">
              <th className="center color" colSpan="12" style={{ padding: 15 }}>
                {" "}
                <strong> Cash Versé </strong>{" "}
              </th>
            </tr>
          </thead>

          <tbody className="center">
            <tr className="regiGestInde ">
              <th className="" style={{ padding: 24 }}>
                (Par Pompe-Montant TPE ){" "}
              </th>
            </tr>

           
            {caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, k) =>
                  caisse.vente_tpes.map((vente_tpe, k) => (
                    <tr className="regiGestInde">
                      /* <th> {compteur.pistolet.nom   // distinct  // toDistinct() } </th> */
      /*  {compteur.pistolet.carburant.toLowerCase() == "gasoil" ? (
                        <>
                          <th className="">
                            {" "}
                            <input
                              type="text"
                              disabled
                              class="form-control text-center"
                              value={separateur(
                                (compteur.indexFerE - compteur.indexOuvE) *
                                  compteur.prix -
                                  vente_tpe.montant
                              )}
                            />{" "}
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="">
                            {" "}
                            <input
                              type="text"
                              disabled
                              class="form-control text-center"
                              value="0"
                            />{" "}
                          </th>
                        </>
                      )}
                    </tr>
                  ))
                )
              )}

            <tr className="regiGestInde ">
              <th colSpan="1" className="">
                {" "}
                TOTAL :
              </th>
            </tr>
          </tbody>
        </Table>
      </div>  
    */}

      {/*----------------------5em Tableau--------------------
      <div className="table-responsive col col-xs-12 col-sm-12 col-md-12 col-lg-2">
        <Table
          className="tableRegiGestInde "
          hover
          table-striped
          bordered
          style={{ marginTop: 0 }}
          size="sm"
        >
          <thead>
            <tr className="titre">
              <th className="center color" colSpan="12" style={{ padding: 15 }}>
                {" "}
                <strong> Cash Versé Test</strong>{" "}
              </th>
            </tr>
          </thead>

          <tbody className="center">
            <tr className="regiGestInde ">
              <th className="" style={{ padding: 25 }}>
                (Par Pompe-Montant TPE ){" "}
              </th>
            </tr>

            
            {/*caisses &&
              caisses.map((caisse, i) =>
                caisse.compteurs.map((compteur, k) => (
                  // caisse.vente_tpes.map((vente_tpe, k)=>(
                  //
                  <tr className="regiGestInde">
                    <th className="">
                      {" "}
                      <input
                        type="text"
                        disabled
                        class="form-control text-center"
                        value={caisse.vente_tpes
                          .map((vente_tpe) => {
                            return compteur.pistolet.carburant.toLowerCase() ==
                              "gasoil"
                              ? ((compteur.indexFerE - compteur.indexOuvE) *
                                  compteur.prix -
                                  vente_tpe.montant) /
                                  2
                              : 0;
                          })
                          .reduce(
                            (prev = 0, next = 0) => Number(prev) + Number(next),
                            0
                          )}
                      />{" "}
                    </th>
                  </tr>
                  // ))
                ))
              )}

            <th className="">
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center"
                value="0"
              />{" "}
            </th>

            <tr className="regiGestInde ">
              <th colSpan="1" className="">
                {" "}
                TOTAL :
              </th>
            </tr>
          </tbody>
        </Table>
      </div> */}
    </div>
  );
}
