import React, { useState } from "react";
import "./cumuReceCarbMois.css";
import { Table } from "react-bootstrap";
import { separateur } from "src/utils/formatNumber";

export default function CumuReceCarbMois({ synthese }) {
  ////////////////////////////  FONCTION ENTREE SUPER ET GASOIL
  //////////ENTREE SUPER
  function totalEntreeSuper() {
    let total = 0;
    synthese &&
      synthese?.receptions.map((reception, i) => {
        if (reception?.reservoir?.carburant?.toLowerCase() == "super") {
          total += Number(reception?.capacite);
        }
      });
    return total;
  }
  ///////////ENTREE GASOIL
  function totalEntreeGasoil() {
    let total = 0;
    synthese &&
      synthese?.receptions.map((reception, i) => {
        if (reception?.reservoir?.carburant?.toLowerCase() == "gasoil") {
          total += Number(reception?.capacite);
        }
      });
    return total;
  }
  ////////////////////////////
  return (
    <div className="ficheCumuReceCarbMois">
      <Table className="tableCumuReceCarbMois" hover striped bordered size="sm">
        <thead>
          <tr className="center color titre ">
            <th colSpan="2" style={{ padding: "8px" }}>
              {" "}
              CUMUL RECEPTIONS CARBURANTS DU MOIS{" "}
            </th>
          </tr>
        </thead>

        <tbody className="center ">
          <tr className="cumuReceCarb ">
            <th colSpan="2" style={{ padding: 10 }}>
              {" "}
              SUPER{" "}
            </th>
          </tr>
          <tr className="cumuReceCarb ">
            <th style={{ width: "40%" }}> JOUR </th>
            <td  style={{ textAlign: "center"}}> {separateur(totalEntreeSuper())} </td>
          </tr>
          <tr className="cumuReceCarb">
            <th> MOIS </th>
            <td  style={{ textAlign: "center"}}>  </td>
          </tr>
          <tr className="cumuReceCarb">
            <th colSpan="2" style={{ padding: 10 }}>
              {" "}
              GASOIL{" "}
            </th>
          </tr>
          <tr className="cumuReceCarb">
            <th> JOUR </th>
            <td  style={{ textAlign: "center"}}> {separateur(totalEntreeGasoil())} </td>
          </tr>
          <tr className="cumuReceCarb">
            <th> MOIS </th>
            <td  style={{ textAlign: "center"}}>  </td>
          </tr>
          <tr className="cumuReceCarb">
            <th colSpan="2" style={{ padding: 14 }}>
              
            </th>
          </tr>
          <tr className="cumuReceCarb">
            <th> TCC </th>
            <td  style={{ textAlign: "center"}}> </td>
          </tr>

          <tr className="cumuReceCarb">
            <th colSpan="2" style={{ padding: 13 }}>
              {" "}
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
