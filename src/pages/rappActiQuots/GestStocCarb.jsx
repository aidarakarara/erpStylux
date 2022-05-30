import React from "react";
import "./gestStocCarb.css";
import { Table } from "react-bootstrap";
import { separateur } from "src/utils/formatNumber";

export default function GestStocCarb({ synthese }) {
  return (
    <div className="ficheGestStocCarb">
      <Table className="tableGestStocCarb " hover striped bordered size="sm">
        <thead>
          <tr className="gestStock center color titre souligne ">
            <th colSpan="2" style={{ padding: "14px" }}>
              {" "}
              STOCKS DU jOUR{" "}
            </th>
          </tr>
        </thead>

        <tbody className="">
          {synthese &&
            synthese.stocks.map((stock, i) => (
              <tr className="gestStock" key={i + "stock"}>
                <th style={{ width: "35%" }}>
                  {" "}
                  {`${stock.reservoir.carburant} ${stock.reservoir.numero} `}{" "}
                </th>
                <td style={{ textAlign: "center", width:"60%" }} >{separateur(stock.capacite)}</td>
                
              </tr>
            ))}
          <tr className="gestStock center ">
            <th colSpan="2"> \\\\\\\\\\\\\</th>
          </tr>

          <tr className="gestStock center ">
            <th colSpan="2" className="color2 titre souligne" style={{ padding: "12px" }}>
              {" "}
              RECEPTION DU jOUR{" "}
            </th>
          </tr>

          {synthese &&
            synthese.receptions.map((reception, i) => (
              <tr className="gestStock" key={i}>
                <th>
                  {" "}
                  {`${reception.reservoir.carburant} ${reception.reservoir.numero} `}{" "}
                </th>
                <td style={{ textAlign: "center", width:"60%" }} > {separateur(reception.capacite)}</td>
                
              </tr>
            ))}

          <tr className="gestStock center ">
            <th colSpan="2"> \\\\\\\\\\\\\</th>
          </tr>

          <tr className="gestStock center ">
            <th colSpan="2" className="color3 titre souligne" style={{ padding: "12px" }}>
              {" "}
              REMISE EN CUVE
            </th>
          </tr>

          {synthese &&
            synthese.remise_cuves.map((remise_cuve, i) => (
              <tr className="gestStock" key={i}>
                <th>
                  {" "}
                  {`${remise_cuve.reservoir.carburant} ${remise_cuve.reservoir.numero} `}{" "}
                </th>
                <td style={{ textAlign: "center", width:"60%" }} > {separateur(remise_cuve.capacite)} </td>
              
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
