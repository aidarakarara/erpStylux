import React, { useState, useEffect } from "react";
import "./totale.css";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import api from "src/api/api";
import ispompiste from "./useIsPompiste";
import isApprouve from "./useIsApprouve";
import { ToastContainer, toast } from "react-toastify";
import { separateur } from "src/utils/formatNumber";

export default function Totale({ Entrer }) {
  const [params, setParams] = useState(useParams());
  const [caisse, setCaisse] = useState(null);
  const [pistolets, setPistolets] = useState([]);
  const [bonClients, setBonClients] = useState([]);
  const [depenses, setDepenses] = useState([]);
  const [coffre, setCoffre] = useState(null);
  const [netVers, setNetVers] = useState(null);
  //venteTpes
  const [ventes, setVentes] = useState([]);

  useEffect(() => {
    api.get(`api/caisses/${params.caisse}`).then((res) => {
      //{ numero_carte: "", montant: null, caisse_id: params.caisse }
      setCaisse(res.data.caisse);
    });
    loadTotal();
  }, [Entrer]);

  function notifier() {
    toast.success("Sauvegarde réussie", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function loadTotal() {
    api.get(`api/caisses/${params.caisse}`).then((res) => {
      setCoffre(res.data.caisse.coffre);
      setNetVers(res.data.caisse.netVer);
      setCaisse(res.data.caisse);
      setBonClients(res.data.bonClients);
      setDepenses(res.data.depenses);
      setVentes(res.data.venteTpes);

      var pistTmp = [];
      res.data.pistolets.map((pist) => {
        if (!pist.compteur) {
          pist.compteur = {
            caisse_id: params.caisse,
            pistolet_id: pist.id,
            indexOuvE: pist.indexE,
            indexOuvM: pist.indexM,
            indexFerE: "",
            indexFerM: "",
            prix: pist.prix,
          };
        }
        pistTmp.push(pist);
      });
      setPistolets(pistTmp);
    });
  }

  function totalSortie(ferm = 0, ouv0) {
    if (parseFloat(ferm) > parseFloat(ouv0))
      return parseFloat(ferm) - parseFloat(ouv0);
    return 0;
  }
  /** Caculer le Totale BonClient
   *
   * @returns Number
   */
  function getTotalBonClient() {
    var total =
      bonClients &&
      bonClients
        .map((item) => item?.montant)
        .reduce((prev = 0, next = 0) => parseFloat(prev) + parseFloat(next), 0);

    /* var total = bonClients.map((item) => {
      total = total + parseFloat(item.montant);
    }); */

    return total;
  }
  /** Caculer le Totale Depense
   *
   * @returns parseFloat
   */
  function getTotalDepense() {
    var total =
      depenses &&
      depenses
        .map((item) => item?.montant)
        .reduce((prev = 0, next = 0) => parseFloat(prev) + parseFloat(next), 0);

    /*   var total = depenses.map((item) => {
      total = total + parseFloat(item.montant);
    }); */

    return total;
  }
  /** Caculer le Totale Ventes TPES
   *
   * @returns parseFloat
   */
  function getTotalCarteTPE() {
    var total =
      ventes &&
      ventes
        .map((item) => item?.montant)
        .reduce((prev = 0, next = 0) => parseFloat(prev) + parseFloat(next), 0);

    /*  var total = ventes.map((item) => {
      total = total + parseFloat(item.montant);
    }); */

    return total;
  }

  function getTotalNonRecu() {
    return getTotalCarteTPE() + getTotalBonClient() + getTotalDepense();
  }

  /**
   * Calculer le total des pompes
   * @returns Number
   */
  function getTotalPompe() {
    var total = 0;
    pistolets &&
      pistolets.map((item) => {
        const res =
          totalSortie(item?.compteur?.indexFerE, item?.compteur?.indexOuvE) *
          item?.compteur?.prix;
        total += res;
      });

    return total;
  }

  function getTotalCarburant() {
    return getTotalPompe() - getTotalNonRecu();
  }

  function getTotalNetAVers() {
    return getTotalCarburant() - coffre;
  }
  function getEcart() {
    return getTotalNetAVers() - netVers;
  }

  function updateCaisse() {
    const { pompe, user, ...maCaisse } = caisse;
    maCaisse.coffre = coffre;
    maCaisse.netVer = netVers;
    maCaisse.ecart = getEcart();
    api.get("sanctum/csrf-cookie").then((response) => {
      api.put(`api/caisses/${maCaisse.id}`, maCaisse).then((res) => {});
      notifier();
    });
  }

  return (
    <div className="totale">
      <ToastContainer
        style={{ marginTop: "40px" }}
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Table
        className="table-resultat"
        bordered
        style={{ marginTop: 50 }}
        size="sm"
      >
        <tbody>
          <tr>
            <th
              className="table-bordered border-dark text-center"
              style={{ verticalAlign: "middle" }}
            >
              {" "}
              TOTAL CARBURANTS{" "}
            </th>
            <td
              className="table-bordered border-dark text-center"
              style={{ verticalAlign: "middle" }}
            >
              <b>
                {getTotalCarburant()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
              </b>
            </td>
            <th
              className="table-bordered border-dark text-center"
              style={{ verticalAlign: "middle" }}
            >
              COFFRE
            </th>
            <td
              className="td-input border-dark border-bottom-0"
              style={{ verticalAlign: "middle" }}
            >
              <input
                style={{ fontSize: "18px" }}
                className="form-control"
                type="number"
                value={coffre && coffre}
                onChange={(e) => setCoffre(e.target.value)}
                disabled={
                  ispompiste() && !isApprouve(caisse && caisse.approuve)
                    ? false
                    : true
                }
              />
              <span></span>
            </td>
            <td
              className="bordB"
              colSpan="2"
              style={{
                height: "100%",
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            ></td>
          </tr>
          <tr>
            <th
              className="table-bordered border-dark text-center"
              style={{ verticalAlign: "middle" }}
            >
              TOTAL NET A VERSER
            </th>
            <td className="table-bordered border-dark text-center">
              {getTotalNetAVers()
                .toFixed(2)
                .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
            </td>
            <th
              className="table-bordered border-dark text-center"
              style={{ verticalAlign: "middle" }}
            >
              NET VERSE{" "}
            </th>
            <td
              className="td-input border-dark striped"
              style={{ verticalAlign: "middle" }}
            >
              <input
                style={{ fontSize: "18px" }}
                className="form-control"
                type="number"
                value={netVers}
                onChange={(e) => setNetVers(e.target.value)}
                disabled={
                  ispompiste() && !isApprouve(caisse && caisse.approuve)
                    ? false
                    : true
                }
              />
              <span></span>
            </td>
            <th
              className="table-bordered border-dark text-center"
              style={{ verticalAlign: "middle" }}
            >
              ECART CAISSE{" "}
            </th>
            <td className="table-bordered border-dark text-center">
              {getEcart()
                .toFixed(2)
                .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
            </td>
          </tr>
        </tbody>
      </Table>
      {ispompiste() && !isApprouve(caisse && caisse.approuve) ? (
        <Table
          className="justify-content-center "
          style={{ textAlign: "center" }}
        >
          <button className="btn btn-success m-2" onClick={updateCaisse}>
            Sauvegarder
          </button>
        </Table>
      ) : null}
    </div>
  );
}
