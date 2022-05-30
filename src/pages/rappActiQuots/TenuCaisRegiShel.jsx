import React, { useState } from "react";
import "./tenuCaisRegiShel.css";
import { Table } from "react-bootstrap";
import { separateur } from "src/utils/formatNumber";

export default function TenuCaisRegiShel({ caisses, synthese }) {
  ////////////TOTAL ENCAISSEMENTS //////////////////
  function totalEncaissements() {
    let total = 0;
    synthese &&
      synthese?.encaissements.map((encaissement) => {
        if (encaissement?.type?.toLowerCase() != "tpe")
          total += Number(encaissement?.bon?.montant);
      });
    return total;
  }
  function totalEncaissementsTpe() {
    let total = 0;
    synthese &&
      synthese?.encaissements.map((encaissement) => {
        if (encaissement?.type?.toLowerCase() == "tpe")
          total += Number(encaissement?.bon?.montant);
      });
    return total;
  }

  ///////////////// TOTAL ECARTS CAISSE POMPISTE
  function totalEcarts() {
    let total = 0;
    caisses &&
      caisses.map((caisse) => {
        total = Number(caisse.ecart);
      });
    return total;
  }
  /////////////////DEPENSES DU JOUR /////////////
  function depenseTotales() {
    let total = 0;
    caisses &&
      caisses.map((caisse) =>
        caisse?.depenses.map((depense) => {
          total += Number(depense?.montant);
        })
      );
    return total;
  }
  //////////////////  VERSEMENT BANQUE CHEQUE//////////////////
  function totalVersementCheque() {
    let total = 0;
    synthese &&
      synthese?.encaissements.map((encaissement) => {
        if (encaissement?.type?.toLowerCase() == "cheque")
          total += Number(encaissement?.bon?.montant);
      });
    return total;
  }
  //////////////////  VERSEMENT ESPECE //////////////////
  function totalVersementEspece() {
    let total = 0;
    synthese &&
      synthese?.encaissements.map((encaissement) => {
        if (encaissement?.type?.toLowerCase() == "espece")
          total += Number(encaissement?.bon?.montant);
      });
    return total;
  }

  return (
    <div className="ficheTenuCaisRegiShel">
      <Table
        className="tableTenuCaisRegiShel "
        hover
        striped
        bordered
        size="sm"
      >
        <thead>
          <tr className="center color  titre ">
            <th colSpan="3" style={{ padding: "13px" }}>
              {" "}
              TENUE CAISSE SELON REGISTRE SHELL{" "}
            </th>
          </tr>
        </thead>

        <tbody className="">
          <tr className="tenuCaisRegi">
            <th style={{ width: "42%" }}> DESIGNATION </th>
            <th> MONTANT </th>
            <th> CUMUL </th>
          </tr>
          <tr className="tenuCaisRegi ">
            <th> SOLDE CAISSE </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color titre"
                value="#########"
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color titre"
                value="#########"
              />{" "}
            </th>
          </tr>
          <tr className="tenuCaisRegi">
            <th> RECETTES CARBURANTS </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> LUBRIFIANTS </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> LAVAGE </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> GRAISSAGE </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> ACCESSOIRES </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> GAZ </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> FUTS VIDES </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> AUTRES RECETTES </th>
            <td style={{ textAlign: "center" }}> pas encore </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> ENCAISSEMENT CLIENTS </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalEncaissements())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> AUTRES ENCAISSEMENTS </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ totalEncaissementsTpe()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> //\\ </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> SOUS TOTAL 1 </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> MANQUANTS </th>
            <td className=" color2  titre" style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalEcarts())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> VENTES A CREDIT </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> DEPENSES DU JOUR </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(depenseTotales())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr
            className="tenuCaisRegi "
            style={{ backgroundColor: "blueviolet" }}
          >
            <th className="titre"> VERSEMENT BANQUE(CHEQUE) </th>
            <td className="titre" style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalVersementCheque())}{" "}
            </td>
            <td className="titre" style={{ textAlign: "center" }}>
              {" "}
            </td>
          </tr>
          <tr className="tenuCaisRegi ">
            <th> VERSEMENT (ESPECES) </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalVersementEspece())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> SOUS TOTAL 2 </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(
                totalEcarts() +
                  depenseTotales() +
                  totalVersementCheque() +
                  totalVersementEspece()
              )}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisRegi">
            <th> SOLDE REEL EN CAISSE</th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
