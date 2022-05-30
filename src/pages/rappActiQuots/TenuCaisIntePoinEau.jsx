import React from "react";
import "./tenuCaisIntePoinEau.css";
import { Table } from "react-bootstrap";
import { separateur } from "src/utils/formatNumber";

export default function TenuCaisIntePoinEau({
  depenses,
  venteTpes,
  caisses,
  synthese,
}) {
  ////////////////////// Ventes TPE (total pompe1 et pompe2)
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
  ////////////////// TOTAL ECARTS CAISSE POMPISTE
  function totalEcarts() {
    let total = 0;
    caisses &&
      caisses.map((caisse) => {
        total = Number(caisse?.ecart);
      });
    return total;
  }
  ////////////////////////TOTAL DES ENTREES /////////////////////////////
  //////////////////  TOTAL PAR POMPE /////////////////
  function totalParPompe() {
    let total = 0,
      vol = 0;
    caisses &&
      caisses.map((caisse) =>
        caisse.compteurs.map((compteur, j) => {
          vol = Number(
            (compteur?.indexFerE - compteur?.indexOuvE) * compteur?.prix
          );
          total += vol;
        })
      );
    return total;
  }

  //////////////////  VENTES A CREDIT  ? cest quoi o juste//////////////////
  function totalVenteCredit() {
    let total = 0;
    synthese &&
      synthese.encaissements.map((encaissement) => {
        if (encaissement?.type?.toLowerCase() == "espece")
          total += Number(encaissement?.bon?.montant);
      });
    return total;
  }
  /////////////////DEPENSES DU JOUR /////////////
  function depenseTotales() {
    let total = 0;
    caisses &&
      caisses.map((caisse) => {
        total += caisse.depenses
          .map((depense) => Number(depense.montant))
          .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
      });
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
      synthese?.encaissements?.map((encaissement) => {
        if (encaissement?.type?.toLowerCase() == "espece")
          total += Number(encaissement?.bon?.montant);
      });
    return total;
  }

  return (
    <div className="ficheTenuCaisIntePoinEau">
      <Table
        className="tableTenuCaisIntePoinEau"
        hover
        striped
        bordered
        size="sm"
      >
        <thead>
          <tr className="center color titre ">
            <th colSpan="3" style={{ padding: "13px" }}>
              {" "}
              TENUE CAISSE INTERNE POINT D'EAU{" "}
            </th>
          </tr>
        </thead>

        <tbody className="">
          <tr className="tenuCaisInte ">
            <th className="width1 "> DESIGNATION </th>
            <th> MONTANT </th>
            <th> CUMUL MOIS </th>
          </tr>
          <tr className="tenuCaisInte ">
            <th>SOLDE CAISSE ANTERIEUR</th>
            <th>
              {" "}
              <input
                type="text"
                class="form-control text-center titre color"
                disabled
                value="############"
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center titre color"
                disabled
                value="############"
              />{" "}
            </th>
          </tr>
          <tr className="tenuCaisInte">
            <th>ENCAISSEMENT</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalEncaissements())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th>RECHARGEMENT CARTES TPE</th>
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
          <tr className="tenuCaisInte">
            <th>ECARTS CAISSE POMPISTE</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalEcarts())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th> AUTRES RECETTES</th>
            <td style={{ textAlign: "center" }}> pas encore </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th className="totaAutrRece">TOTAL AUTRES ENTREES</th>
            <td style={{ textAlign: "center" }}>
              {
                /* separateur */ (
                  totalParPompe() +
                  totalEncaissements() +
                  totalEncaissementsTpe() +
                  totalEcarts()
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
            {/* reste:total autres recettes dans=>TAB AUTRES RECETTES
                       et autre recettes  dans =>TAB TENUCAISIINTEPOINEAU
                NB:TOTAL ENTREE= total CONTROLE */}
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th>VENTES A CREDIT </th>
            <td style={{ textAlign: "center" }}> </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th>DEPENSES DU JOUR</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(depenseTotales())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th>VERSEMENT BANQUE CHEQUE</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalVersementCheque())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th>VERSEMENT ESPECE </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalVersementEspece())}{" "}
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th>GIM </th>
            <th>
              {" "}
              <input
                type="text"
                class="form-control text-center titre color"
                disabled
                value="########"
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center titre color"
                disabled
                value="########"
              />{" "}
            </th>
          </tr>
          <tr className="tenuCaisInte">
            <th>TPE </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ totalVenteTpesPompe1_2()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th>SOLDE CAISSE REEL</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  totalParPompe() +
                  totalEncaissements() +
                  totalEncaissementsTpe() +
                  totalEcarts() -
                  (depenseTotales() +
                    totalVersementCheque() +
                    totalVersementEspece() +
                    totalVenteTpesPompe1_2())
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
            {/* reste:[total autres recettes dans=>TAB AUTRES RECETTES
                        et autre recettes  dans =>TAB TENUCAISIINTEPOINEAU]

                  ligne28      VENTE A CREDIT  ET   ligne32  GIM 
                        
                 NB:TOTAL ENTREE= total CONTROLE */}
            <td style={{ textAlign: "center" }}> </td>
          </tr>
          <tr className="tenuCaisInte">
            <th>TOTAL CONTROLE</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  totalParPompe() +
                  totalEncaissements() +
                  totalEncaissementsTpe() +
                  totalEcarts()
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
            </td>
            {/* reste:total autres recettes dans=>TAB AUTRES RECETTES
                        et autre recettes  dans =>TAB TENUCAISIINTEPOINEAU

                 NB:TOTAL ENTREE= total CONTROLE */}
            <td style={{ textAlign: "center" }}> </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
