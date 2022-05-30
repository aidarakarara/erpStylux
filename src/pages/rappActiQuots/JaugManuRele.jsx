import React, { useState, useEffect } from "react";
import "./jaugManuRele.css";
import { Table } from "react-bootstrap";
import api from "src/api/api";
import { useParams } from "react-router-dom";
import { nextDay } from "date-fns/esm";
import { separateur } from "src/utils/formatNumber";

export default function JaugManuRele({ synthese, caisses }) {
  let { date } = useParams();
  let d = new Date(date);
  let mois = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  let formate = ` ${d.getDate()}/${mois}/${d.getFullYear()}`;

  const [rappActi, setRappActi] = useState(null);

  useEffect(() => {
    api.get(`api/rapport/${date}`).then((res) => {
      setRappActi(res.data);
    });
  }, [date]);

  ////////////////////////////  FONCTION STOCKS SUPER GASOIL ET TOTAL CARB.
  //////////STOCK SUPER
  function totalStockSuper() {
    let total = 0;
    synthese &&
      synthese.stocks.map((stock, i) => {
        if (stock?.reservoir?.carburant?.toLowerCase() == "super") {
          total += Number(stock.capacite);
        }
      });
    return total;
  }
  //////////STOCK GASOIL
  function totalStockGasoil() {
    let total = 0;
    synthese &&
      synthese.stocks.map((stock, i) => {
        if (stock?.reservoir?.carburant?.toLowerCase() == "gasoil") {
          total += Number(stock.capacite);
        }
      });
    return total;
  }
  //////////STOCK TOTAL CARB
  function totalStockSuperGasoil() {
    let total = 0;
    synthese &&
      synthese?.stocks.map((stock) => {
        total += Number(stock?.capacite);
      });
    return total;
  }
  ////////////////////////////  FONCTION ENTREE SUPER GASOIL ET TOTAL CARB.
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
  /////////////ENTREE TOTAL CARB.
  function totalEntreeSuperGasoil() {
    let total = 0;
    synthese &&
      synthese?.receptions.map((reception, i) => {
        total += Number(reception?.capacite);
      });
    return total;
  }
  ///////////////////////////////

  ////////////////// VENTE DU JOUUUR ///////////////////////
  function venteJourSuper() {
    let vente = 0,
      venteSuper = 0;
    caisses &&
      caisses.map((caisse) => {
        caisse?.compteurs.map((compteur, j) => {
          if (compteur?.pistolet?.carburant?.toLowerCase() == "super") {
            venteSuper = Number(compteur?.indexFerE - compteur?.indexOuvE);
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
        caisse?.compteurs.map((compteur, j) => {
          if (compteur?.pistolet?.carburant?.toLowerCase() == "gasoil") {
            venteGasoil = Number(compteur?.indexFerE - compteur?.indexOuvE);
            vente += venteGasoil;
          }
        });
      });
    return vente;
  }
  ///////////// TOTAL REMISE EN CUVE SUPER ET GASOIL
  function totalRCSuper() {
    let total = 0;
    synthese &&
      synthese?.remise_cuves.map((remise_cuve, i) => {
        if (remise_cuve?.reservoir?.carburant?.toLowerCase() == "super") {
          total += Number(remise_cuve?.capacite);
        }
      });
    return total;
  }
  function totalRCGasoil() {
    let total = 0;
    synthese &&
      synthese?.remise_cuves.map((remise_cuve, i) => {
        if (remise_cuve?.reservoir?.carburant?.toLowerCase() == "gasoil") {
          total += Number(remise_cuve?.capacite);
        }
      });
    return total;
  }
  //////////////////////////////////////////
  //////////////
  return (
    <div className="ficheJaugManuRele">
      <Table className="tableJaugManuRele " hover striped bordered size="sm">
        <thead>
          <tr className="center color titre ">
            <th colSpan="5" style={{ padding: "13px" }}>
              {" "}
              JAUGE MANUELLE - RELEVES DE 08H00{" "}
            </th>
          </tr>
        </thead>

        <tbody className="">
          <tr className="jaugManu  ">
            <th> DESIGNATION </th>
            <th> SUPER </th>
            <th> GASOIL </th>
            <th style={{ width: "30%" }}> TOTAL CARB. </th>
          </tr>
          <tr className="jaugManuRele jaugManu">
            <th style={{ padding: 10 }}>STOCKS (L) AU {formate} </th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockSuper())}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockGasoil())}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockSuperGasoil())}{" "}
            </td>
          </tr>
          <tr>
            <th
              colSpan="5"
              className="center color titre"
              style={{ padding: 23 }}
            >
              GESTION STOCKS CARBURANTS ET ECARTS
            </th>
          </tr>
          <tr className="jaugManu ">
            <th>STOCK INITIAL</th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                value="##########"
                class="form-control text-center color titre "
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                value="##########"
                class="form-control text-center color titre"
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                value="##########"
                class="form-control text-center color titre"
              />{" "}
            </th>
          </tr>
          <tr className="jaugManu">
            <th>ENTREE</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalEntreeSuper())}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalEntreeGasoil())}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalEntreeSuperGasoil())}{" "}
            </td>
          </tr>
          <tr className="jaugManu">
            <th>STOCK FINAL</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockSuper() + totalEntreeSuper())}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockGasoil() + totalEntreeGasoil())}{" "}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockGasoil() + totalEntreeGasoil())}{" "}
            </td>
          </tr>
          <tr className="jaugManu">
            <th>VENTE</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ venteJourSuper()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ venteJourGasoil()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ venteJourGasoil()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
          </tr>
          <tr className="jaugManu">
            <th style={{ padding: "3px" }}>STOCK THEORIQUE</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  totalStockSuper() +
                  totalEntreeSuper() -
                  venteJourSuper()
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  totalStockGasoil() +
                  totalEntreeGasoil() -
                  venteJourGasoil()
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  totalStockSuper() +
                  totalEntreeSuper() -
                  venteJourSuper() +
                  (totalStockGasoil() + totalEntreeGasoil() - venteJourGasoil())
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
          </tr>
          <tr className="jaugManu">
            <th>JAUGE (B)</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockSuper())}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockGasoil())}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {separateur(totalStockSuperGasoil())}{" "}
            </td>
          </tr>
          <tr className="jaugManu">
            <th>ECART (B-A)</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  totalStockSuper() -
                  (totalStockSuper() + totalEntreeSuper() - venteJourSuper()) -
                  totalRCSuper()
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>

            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  totalStockGasoil() -
                  (totalStockGasoil() +
                    totalEntreeGasoil() -
                    venteJourGasoil()) -
                  totalRCGasoil()
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>

            <td style={{ textAlign: "center" }}>
              {
                /* separateur */ (
                  totalStockSuper() -
                  (totalStockSuper() + totalEntreeSuper() - venteJourSuper()) -
                  totalRCSuper() +
                  (totalStockGasoil() -
                    (totalStockGasoil() +
                      totalEntreeGasoil() -
                      venteJourGasoil()) -
                    totalRCGasoil())
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
          </tr>
          <tr className="jaugManu">
            <th>CUMUL</th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color"
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color"
              />{" "}
            </th>
            <th>
              {" "}
              <input
                type="text"
                disabled
                class="form-control text-center color"
              />{" "}
            </th>
          </tr>
          <tr className="jaugManu">
            <th>POURCENTAGE</th>
            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  ((totalStockSuper() -
                    (totalStockSuper() +
                      totalEntreeSuper() -
                      venteJourSuper()) -
                    totalRCSuper()) /
                    venteJourSuper()) *
                  100
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
            <td style={{ textAlign: "center" }}>
              {
                /* separateur */ (
                  ((totalStockGasoil() -
                    (totalStockGasoil() +
                      totalEntreeGasoil() -
                      venteJourGasoil()) -
                    totalRCGasoil()) /
                    venteJourGasoil()) *
                  100
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>

            <td style={{ textAlign: "center" }}>
              {" "}
              {
                /* separateur */ (
                  (totalStockSuper() -
                    (totalStockSuper() +
                      totalEntreeSuper() -
                      venteJourSuper() -
                      totalRCSuper() +
                      (totalStockGasoil() -
                        (totalStockGasoil() +
                          totalEntreeGasoil() -
                          venteJourGasoil()) -
                        totalRCGasoil())) /
                      venteJourGasoil()) *
                  100
                )
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
