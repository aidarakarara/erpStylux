/*import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

const data = [
  { name: "Group A", value: 400, fill:"rgb(255, 72, 66)" },
  { name: "Group B", value: 300, fill:"rgb(0, 171, 85)" },
  { name: "Group C", value: 300, fill:"rgb(24, 144, 255)" },
  { name: "Group D", value: 200, fill:"rgb(255, 193, 7)" }
];

export default function App() {
  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill="" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}*/

import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./recharts.css";

export default function Recharts() {
  return (
    <div className="ficheIndeComp">
      <Table className="table table-striped table-bordered table-hover">
        <thead>
          <tr className="center">
            <th
              colSpan="3"
              style={{ padding: "13px", backgroundColor: "#2393DA" }}
            >
              {" "}
              INDEX COMPTEURS
            </th>
            <th
              colSpan="3"
              style={{ padding: "13px", backgroundColor: "#ECD613" }}
            >
              {" "}
              AUTRES RECETTES
            </th>
            <th
              colSpan="4"
              style={{ padding: "13px", backgroundColor: "#88BEB1" }}
            >
              {" "}
              JAUGE MANUELLE - RELEVES DE 08H00
            </th>
            <th colSpan="2" style={{ padding: "13px", backgroundColor: "red" }}>
              {" "}
              STOCKS DU jOUR{" "}
            </th>
          </tr>
        </thead>

        <tbody className="center">
          <tr>
            <th scope="col" style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              DESIGNATION{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              SUPER{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              GASOIL{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              DESIGNATION{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              JOUR{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              CUMUL MOIS
            </th>
            <th scope="col" style={{ backgroundColor: "#BECAC7" }}>
              {" "}
              DESIGNATION{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#BECAC7" }}>
              {" "}
              SUPER{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#BECAC7" }}>
              {" "}
              GASOIL{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#BECAC7" }}>
              {" "}
              TOTAL CARB.{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#EE8585" }}>
              {" "}
              GASOIL 1{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#EE8585" }}>
              {" "}
              <input
                type="number"
                /*onChange={(e) => {
                  setGaso1(+e.target.value);
                  calculateTotal();
                }}*/
                placeholder=""
              />
            </th>
          </tr>
          <tr>
            <th scope="col" style={{ backgroundColor: "#7CC4F1" }}>
              TOTAL SORTIE VEILLE
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th scope="col" style={{ backgroundColor: "#FAF4B8" }}>
              LUBRIFIANTS
            </th>
            <th scope="col" style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              <input
                type="text"
                class="form-control text-center"
                /*value={lubr}
                onChange={(e) => setLubr(e.target.value)}*/
              />
            </th>
            <th scope="col" style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              <input type="text" class="form-control" />
            </th>
            <th
              rowSpan="2"
              style={{
                marginTop: "10px",
                textAlign: "center",
                backgroundColor: "#BECAC7",
              }}
            >
              STOCKS (L) AU 23aout2020
            </th>
            <th rowSpan="2" style={{ backgroundColor: "#BECAC7" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th scope="col" rowSpan="2" style={{ backgroundColor: "#BECAC7" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th rowSpan="2" style={{ backgroundColor: "#BECAC7" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#EE8585" }}> GASOIL 2 </th>
            <th style={{ backgroundColor: "#EE8585" }}>
              {" "}
              <input
                type="number"
                /*onChange={(e) => {
                  setGaso1(+e.target.value);
                  calculateTotal();
                }}*/
                placeholder=""
              />
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>FERMETURE GASOIL 1 </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>LAVAGE</th>
            <th style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              <input
                type="text"
                class="form-control text-center"
                /* value={lave}
                onChange={(e) => setLave(e.target.value)}*/
              />
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#EE8585" }}> GASOIL 3 </th>
            <th style={{ backgroundColor: "#EE8585" }}>
              {" "}
              <input
                type="number"
                /*onChange={(e) => {
                  setGaso1(+e.target.value);
                  calculateTotal();
                }}*/
                placeholder=""
              />
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>FERMETURE SUPER 2</th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>ACCESSOIRES</th>
            <th style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              <input
                type="text"
                class="form-control text-center"
                /*  value={acce}
                onChange={(e) => setAcce(e.target.value)}*/
              />{" "}
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th
              colSpan="4"
              rowSpan="2"
              className="dbl-border"
              style={{ backgroundColor: "#8474EE" }}
            >
              GESTION STOCKS CARBURANTS ET ECARTS
            </th>
            <th style={{ backgroundColor: "#EE8585" }}> SUPER </th>
            <th style={{ backgroundColor: "#EE8585" }}>
              {" "}
              <input
                type="number"
                /*onChange={(e) => {
                  setGaso1(+e.target.value);
                  calculateTotal();
                }}*/
                placeholder=""
              />
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>FERMETURE GASOIL 2</th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>FUTS VIDES</th>
            <th style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              <input
                type="text"
                class="form-control text-center"
                /* value={futs}
                onChange={(e) => setFuts(e.target.value)}*/
              />{" "}
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th colSpan="2">////////////</th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>1</th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>-</th>
            <th style={{ backgroundColor: "#FAF4B8" }}>-</th>
            <th style={{ backgroundColor: "#FAF4B8" }}>0</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>STOCK INITIAL</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
            <th colSpan="2" className="color2">
              {" "}
              RECEPTION DU jOUR{" "}
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>2</th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>
              TOTAL AUTRES RECETTES
            </th>
            <th style={{ backgroundColor: "#FAF4B8" }}>calcul 1</th>
            <th style={{ backgroundColor: "#FAF4B8" }}>calcul 2</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>ENTREE</th>
            <th style={{ backgroundColor: "#B2A9EB" }} v>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#96F08C" }}> GASOIL 1 </th>
            <th style={{ backgroundColor: "#96F08C" }}>
              {" "}
              <input type="number" />{" "}
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>3</th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th>////////</th>
            <th>///////</th>
            <th>///////</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>STOCK FINAL</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#96F08C" }}> GASOIL 2 </th>
            <th style={{ backgroundColor: "#96F08C" }}>
              {" "}
              <input type="number" />{" "}
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>TOTAL SORTIE </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
            <th>////////</th>
            <th>///////</th>
            <th>///////</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>VENTE</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#96F08C" }}> GASOIL 3 </th>
            <th style={{ backgroundColor: "#96F08C" }}>
              {" "}
              <input type="number" />{" "}
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>REMISE EN CUVE </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" value="0" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" value="0" class="form-control" />{" "}
            </th>
            <th
              colSpan="3"
              className="dbl-border"
              style={{ backgroundColor: "#F39B08" }}
            >
              VENTES CARBURANTS{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>STOCK THEORIQUE</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#96F08C" }}> SUPER </th>
            <th style={{ backgroundColor: "#96F08C" }}>
              {" "}
              <input type="number" />{" "}
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>VENTE DU JOUR </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#E9B55E" }}>PRODUITS </th>
            <th style={{ backgroundColor: "#E9B55E" }}>JOUR</th>
            <th style={{ backgroundColor: "#E9B55E" }}>MOIS</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>JAUGE (B)</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>CUMUL MOIS </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#E9B55E" }}>SUPER </th>
            <th style={{ backgroundColor: "#E9B55E" }}>
              {" "}
              <input
                type="text"
                class="form-control text-center"
                /* value={sup}
                onChange={(e) => setSup(e.target.value)} */
              />{" "}
            </th>
            <th style={{ backgroundColor: "#E9B55E" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>ECART (B-A)</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>PRIX VENTE </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" value="0" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" value="0" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#E9B55E" }}>GASOIL </th>
            <th style={{ backgroundColor: "#E9B55E" }}>
              {" "}
              <input
                type="text"
                class="form-control text-center"
                /*value={gasoil}
                onChange={(e) => setGasoil(e.target.value)}*/
              />{" "}
            </th>
            <th style={{ backgroundColor: "#E9B55E" }}>
              {" "}
              <input type="text" value="" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>CUMUL</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#7CC4F1" }}>TOTAL VENDU</th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" value="0" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#7CC4F1" }}>
              {" "}
              <input type="text" value="0" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#E9B55E" }}>TOTAL CARB</th>
            <th style={{ backgroundColor: "#E9B55E" }}>total 1</th>
            <th style={{ backgroundColor: "#E9B55E" }}>
              {" "}
              <input type="text" value="" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>POURCENTAGE</th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" class="form-control" />{" "}
            </th>
            <th style={{ backgroundColor: "#B2A9EB" }}>
              {" "}
              <input type="text" disabled class="form-control" />{" "}
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
