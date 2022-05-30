import React from "react";
import "./Cuve.css";
import { Card, Typography } from "@material-ui/core";
import { separateur } from "src/utils/formatNumber";

export default function Cuve({ cuve }) {
  let pourcent = Math.round(
    (Number(cuve.quantite) / Number(cuve.capacite)) * 100
  );
  return (
    <div
      className="cuve"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(131, 131, 131, 0.01), ${
          cuve.carburant == "Super" ? "#01934a40" : "#Faa10040"
        })`,
      }}
    >
      {pourcent <= 50 && (
        <div className="niveauOut" style={{ bottom: `${pourcent}%` }}>
          <Typography className="pourcent" style={{ fontSize: 20, marginTop: "10px" }}>
            {pourcent}%
          </Typography>
          <Typography
            className="stock"
            style={{ fontSize: 20, marginTop: "10px"}}
            variant="subtitle2"
          >
            {separateur(cuve.quantite)} / {separateur(cuve.capacite)} L
          </Typography>
        </div>
      )}
      {
        <div
          className="niveau"
          style={{
            height: `${pourcent}%`,
            backgroundColor: `${
              cuve.carburant == "Super" ? "#01934a" : "#Faa100"
            }`,
          }}
        >
          {pourcent > 50 && (
            <>
              <Typography className="pourcent" style={{ fontSize: 20, marginTop: "10px"}}>
                {pourcent}%
              </Typography>
              <Typography
                className="stock"
                style={{ fontSize: 20, marginTop: "10px"}}
                variant="subtitle2"
              >
                {separateur(cuve.quantite)} / {separateur(cuve.capacite)} L
              </Typography>
            </>
          )}
        </div>
      }
    </div>
  );
}
