import React, { useState } from "react";
import "./cumuVentTpeMois.css";
import { Table } from "react-bootstrap";
import ReactDOM from "react-dom";

export default function CumuVentTpeMois({ caisses }) {
  /////TOTAL VENTE TPE POMPE1 ET 2
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

  return (
    <div className="ficheCumuVentTpeMois">
      <Table className="tableCumuVentTpeMois " hover striped bordered size="sm">
        <thead>
          <tr className="center color titre ">
            <th colSpan="2" style={{ padding: 12 }}>
              {" "}
              CUMUL VENTES TPE DU MOIS{" "}
            </th>
          </tr>
        </thead>

        <tbody className="center ">
          <tr className="cumuVentTpe">
            <th style={{ padding: 10 }}> JOUR </th>
            <th style={{ padding: 10 }}> MOIS </th>
          </tr>
          <tr className="cumuVentTpe">
            <td style={{ textAlign: "center" }}>
              {" "}
              {totalVenteTpesPompe1_2()
                .toFixed(2)
                .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
