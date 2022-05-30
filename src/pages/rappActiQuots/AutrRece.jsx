import React, { useState, useEffect } from "react";
import "./autrRece.css";
import { Table } from "react-bootstrap";
import api from "src/api/api";
import { useParams } from "react-router-dom";

export default function AutrRece({ totalgaz, totalsup, caisses }) {
  let { date } = useParams();

  const [lubr, setLubr] = useState(null);
  const [lave, setLave] = useState(null);
  const [acce, setAcce] = useState(null);
  const [futs, setFuts] = useState(null);
  const [sup, setSup] = useState(null);
  const [gasoil, setGasoil] = useState(null);
  ////////////////// VENTE DU JOUUUR ///////////////////////
  function venteJourSuper() {
    let vente = 0,
      venteSuper = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          if (compteur.pistolet.carburant.toLowerCase() == "super") {
            venteSuper = compteur.indexFerE - compteur.indexOuvE;
            vente += venteSuper;
          }
        });
      });
    return vente;
  }
  function venteJourGasoil() {
    let vente = 0,
      venteGasoil = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse.compteurs.map((compteur, j) => {
          if (compteur.pistolet.carburant.toLowerCase() == "gasoil") {
            venteGasoil = compteur.indexFerE - compteur.indexOuvE;
            vente += venteGasoil;
          }
        });
      });
    return vente;
  }

  //jour lavage
  const [lavages, setLavages] = useState([]);
  useEffect(() => {
    api.get(`api/lavage-date/${date}`).then((res) => setLavages(res.data));
  }, []);
  function montantparligne(index) {
    var ligne = lavages[index];
    var somme = 0;
    somme =
      parseInt(ligne.carosserie) +
      parseInt(ligne.graissage) +
      parseInt(ligne.moteur) +
      parseInt(ligne.pulv) +
      parseInt(ligne.complet);
    return somme;
  }
  function montanttotal() {
    let total = 0;
    lavages &&
      lavages.map((_, index) => {
        total += montantparligne(index);
      });
    return total;
  }
  //fin lavage jour
  //recette
  const [recettes, setRecettes] = useState([]);
  useEffect(() => {
    api.get(`api/recette-date/${date}`).then((res) => setRecettes(res.data));
  }, []);
  function montantparligneR(index) {
    var ligne = recettes[index];
    var somme = 0;
    somme =
      parseInt(ligne.totallub) +
      parseInt(ligne.totallav) +
      parseInt(ligne.totalacc) +
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
  //cumul mois recette
  const [totallubrifiant, setTotallubrifiant] = useState(null);
  const [total_lavage, setTotallavage] = useState(null);
  const [totalaccessoire, setTotalaccessoire] = useState(null);
  const [totalfut, setTotalfut] = useState(null);
  const [totalrecette, setTotalrecette] = useState(null);
  useEffect(() => {
    api.get("api/recapte").then((res) => {
      console.log(res.data);
      setTotallubrifiant(res.data.t_lubMois);
      setTotallavage(res.data.t_lavMois);
      setTotalaccessoire(res.data.t_accMois);
      setTotalfut(res.data.t_futMois);
      setTotalrecette(res.data.t_recetteMois);
    });
    //reordone();
  }, []);
  //fin cumul mois recette

  //cumul mois lavage
  const [totalLavage, setTotalLavage] = useState(null);
  useEffect(() => {
    api.get("api/recapte").then((res) => {
      console.log(res.data);
      setTotalLavage(res.data.t_lavage);
    });

    //reordone();
  }, []);
  //fin cumul mois lavage

  const separateur = (nombre) => {
    if (nombre) {
      nombre = nombre.toLocaleString();
      return nombre
        .replace(/ /g, "")
        .replace(/[^0-9]+/, "")
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    }
    return "0";
  };

  return (
    <div className="ficheAutrRece">
      <Table className="tableAutrRece " hover striped bordered size="sm">
        <thead>
          <tr className="center color titre ">
            <th colSpan="3" style={{ padding: "13px" }}>
              {" "}
              AUTRES RECETTES{" "}
            </th>
          </tr>
        </thead>

        <tbody className="">
          <tr className="autrRece  ">
            <th style={{ width: "37%" }}> DESIGNATION </th>
            <th style={{ textAlign: "center" }}> JOUR </th>
            <th> CUMUL MOIS </th>
          </tr>
          <tr className="autrRece">
            <th>LUBRIFIANTS</th>
            {recettes &&
              recettes.map((r, index) => (
                <td style={{ verticalAlign: "middle" }} key={index}>
                  {separateur(r.totallub)}
                </td>
              ))}
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totallubrifiant)}{" "}
            </td>
          </tr>
          <tr className="autrRece">
            <th>LAVAGES</th>
            {recettes &&
              recettes.map((r, index) => (
                <td style={{ verticalAlign: "middle" }} key={index}>
                  {separateur(r.totallav)}
                </td>
              ))}
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(total_lavage)}{" "}
            </td>
          </tr>
          <tr className="autrRece">
            <th>ACCESSOIRES</th>
            {recettes &&
              recettes.map((r, index) => (
                <td style={{ verticalAlign: "middle" }} key={index}>
                  {separateur(r.totalacc)}
                </td>
              ))}
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalaccessoire)}{" "}
            </td>
          </tr>
          <tr className="autrRece">
            <th>FUTS VIDES</th>
            {recettes &&
              recettes.map((r, index) => (
                <td style={{ verticalAlign: "middle" }} key={index}>
                  {separateur(r.totalfut)}
                </td>
              ))}
            <td style={{ textAlign: "center" }}> {separateur(totalfut)}</td>
          </tr>
          <tr className="autrRece">
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
          </tr>
          <tr className="autrRece">
            <th style={{ padding: "0px" }}>TOTAL AUTRES RECETTES</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(montanttotalrecette())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> {separateur(totalrecette)}</td>
          </tr>
          <tr className="autrRece">
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
          </tr>
          <tr className="autrRece">
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
            <td style={{ textAlign: "center", padding: "16px" }}> </td>
          </tr>
          <tr>
            <th
              colSpan="3"
              className="titre  color center"
              style={{ padding: 8 }}
            >
              VENTES CARBURANTS{" "}
            </th>
          </tr>
          <tr className="autrRece">
            <th style={{ padding: 11 }}> PRODUITS </th>
            <th style={{ padding: 11 }}> JOUR </th>
            <th style={{ padding: 11 }}> MOIS </th>
          </tr>
          <tr className="autrRece">
            <th>SUPER </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(venteJourSuper())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="autrRece">
            <th>GASOIL </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(venteJourGasoil())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="autrRece">
            <th>TOTAL CARB</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(venteJourSuper() + venteJourGasoil())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
