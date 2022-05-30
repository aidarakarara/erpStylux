import React, { useState } from "react";
import "./cumuRechCartTpeMois.css";
import { Table } from "react-bootstrap";
import { separateur } from "src/utils/formatNumber";

export default function CumuRechCartTpeMois({ synthese }) {
  //////////////////TOTAL ENCAISSEMENT RECHARGE TPE/////////////
  function totalEncaissementsTpe() {
    let total = 0;
    synthese &&
      synthese?.encaissements.map((encaissement) => {
        if (encaissement.type?.toLowerCase() == "tpe")
          total += encaissement?.montant;
      });
    return total;
  }
  //////////////////////////////////////////

  return (
    <div className="ficheCumuRechCartTpeMois">
      <Table
        className="tableCumuRechCartTpeMois "
        hover
        striped
        bordered
        size="sm"
      >
        <thead>
          <tr className="center color titre">
            <th colSpan="2" style={{ padding: 10 }}>
              {" "}
              CUMUL RECHARGE CARTES TPE DU MOIS{" "}
            </th>
          </tr>
        </thead>

        <tbody className="center">
          <tr className="cumuRechCart ">
            <th style={{ padding: 10 }}> JOUR </th>
            <th style={{ padding: 10 }}> MOIS </th>
          </tr>
          <tr className="cumuRechCart">
          <td  style={{ textAlign: "center"}}> {separateur(totalEncaissementsTpe())} </td>
          <td  style={{ textAlign: "center"}}>  </td>
          
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
