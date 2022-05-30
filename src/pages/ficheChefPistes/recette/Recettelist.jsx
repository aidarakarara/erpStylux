import React, { useEffect, useState } from "react";
import api from "src/api/api";
import Loader from "src/components/loader";
import { separateur } from "src/utils/formatNumber";
import { useParams } from "react-router-dom";

export default function Recettelist() {
  let { date } = useParams();
  //recette
  const [recettes, setRecettes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`api/recette-date/${date}`).then((res) => {
      setRecettes(res.data);
      setLoading(false);
    });
  }, []);
  function montantparligneR(index) {
    var ligne = recettes[index];
    var somme = 0;
    somme =
      parseInt(ligne.totallub) +
      parseInt(ligne.totalacc) +
      parseInt(ligne.totallav) +
      parseInt(ligne.totalfut);
    return somme;
  }

  function montanttotalrecette() {
    let total = 0;
    recettes &&
      recettes.map((_, index) => {
        total += montantparligneR(index);
      });
    return total;
  }

  //fin recette
  return (
    <table className="table table-bordered table-responsive-md">
      <thead>
        <tr>
          <th style={{ width: "120px" }}> Lavages </th>
          <th style={{ width: "120px" }}> Accessoires </th>
          <th style={{ width: "120px" }}> Lubrifiants </th>
          <th style={{ width: "120px" }}> Fûts </th>
          <th>Montant encaissé</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {recettes &&
            recettes.map((r, index) => (
              <td style={{ verticalAlign: "middle" }} key={index}>
                {separateur(r.totallav)}
              </td>
            ))}
          {recettes &&
            recettes.map((r, index) => (
              <td style={{ verticalAlign: "middle" }} key={index}>
                {separateur(r.totalacc)}
              </td>
            ))}{" "}
          {recettes &&
            recettes.map((r, index) => (
              <td style={{ verticalAlign: "middle" }} key={index}>
                {separateur(r.totallub)}
              </td>
            ))}{" "}
          {recettes &&
            recettes.map((r, index) => (
              <td style={{ verticalAlign: "middle" }} key={index}>
                {separateur(r.totalfut)}
              </td>
            ))}
          <td style={{ verticalAlign: "middle" }}>
            {" "}
            {separateur(montanttotalrecette())} FCFA{" "}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
