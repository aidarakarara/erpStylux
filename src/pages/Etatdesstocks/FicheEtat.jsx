import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import isGerant from "./useIsGerant";
import api from "src/api/api";
import "./ficheEtat.css";
import Pagination from "react-js-pagination";

export default function Magasin() {
  let { date } = useParams();
  const [id, setId] = useState(null);
  const [magasin, SetMagasin] = useState(null);
  const [magasins, SetMagasins] = useState([
    {
      produit: "",
      qteI: 0,
      puI: 0,
      qteE: 0,
      puE: 0,
      qteS: 0,
      puS: 0,
      qteF: 0,
      qteR: 0,
      date_inventaire: date,
    },
  ]);
  useEffect(() => {
    {
      api.get(`api/magasin-date/${date}`).then((res) => SetMagasins(res.data));
    }
  }, []);

  function addLine() {
    var line = {
      produit: "",
      qteI: 0,
      puI: 0,
      qteE: 0,
      puE: 0,
      qteS: 0,
      puS: 0,
      qteF: 0,
      qteR: 0,
      date_inventaire: date,
    };
    SetMagasins([...magasins, line]);
  }

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
  const erorMsg = () =>
    toast.error("Vous devez  renseigner les champs vides", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  function saveAll() {
    api.get("sanctum/csrf-cookie").then((response) => {
      magasins.map((magasin) => {
        if (magasin.id) {
          api
            .put(`api/magasins/${magasin.id}`, magasin)
            .then((res) => console.log("magasins Faits"));
        } else {
          api
            .post("api/magasins", magasin)
            .then((res) => console.log("magasins Faits"));
        }
      });
      notifier();
    });
  }
  const updateInputMagasin = (index) => (e) => {
    let newArr = [...magasins];
    let prop = e.target.name;
    newArr[index][prop] = e.target.value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    SetMagasins(newArr); // ??
  };
  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour}-${mois}-${d.getFullYear()}`;
  }

  return (
    <div className=" indexDashbord mr-3" style={{ marginTop: "-60px" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container-fluid m-2 card content-center">
        <h2
          className="titre-dash "
          style={{
            textAlign: "center",
            fontSize: "20px",
            letterSpacing: "18px",
            color: "red",
          }}
        >
          Etat des stocks du
        </h2>
        <h2
          className="titre-dash "
          style={{
            textAlign: "center",
            fontSize: "20px",
            letterSpacing: "18px",
            color: "red",
          }}
        >
          {formatdate(date)}
        </h2>
        <div>
          <table className="table table-responsive-lg table-hover table-bordered monTableau">
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  style={{
                    width: "15%",
                  }}
                ></th>
                <th colSpan={3}>STOCK INITIAL</th>
                <th colSpan={3}>ENTREES</th>
                <th colSpan={3}>SORTIES</th>
                <th colSpan={2}>STOCK FINAL</th>
                <th colSpan={2}>STOCK REEL</th>
                <th colSpan={1}>Difference inventaire</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th row={2} style={{ textAlign: "left" }}>
                  Nom produit
                </th>
                {/*Stock initial*/}
                <th>Qte</th>
                <th>PU</th>
                <th>Montant</th>
                {/*Entrees*/}
                <th>Qte</th>
                <th>PU</th>
                <th>Montant</th>
                {/*Sorties*/}
                <th>Qte</th>
                <th>PU</th>
                <th>Montant</th>
                {/*Stock final*/}
                <th>Qte</th>
                <th>Montant</th>
                {/*Stock reel*/}
                <th>Qte</th>
                <th>Montant</th>
                {/*Dif inv*/}
                <th>Dif inv</th>
              </tr>
            </thead>
            <tbody>
              {magasins &&
                magasins.map((mag, index) => (
                  <tr key={index}>
                    <td style={{ verticalAlign: "middle" }} name="poste">
                      <input
                        name="produit"
                        type="text"
                        autoComplete="off"
                        className="form-control text-left"
                        placeholder="saisir produit"
                        value={mag.produit}
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                      name="poste"
                      className="tabMagasin"
                    >
                      <input
                        name="qteI"
                        style={{ margin: "0px", padding: "0px" }}
                        type="text"
                        autoComplete="off"
                        className="form-control text-center m-0"
                        value={mag.qteI}
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                      name="poste"
                      className="tabMagasin"
                    >
                      <input
                        name="puI"
                        type="text"
                        style={{ margin: "0px", padding: "0px" }}
                        autoComplete="off"
                        className="form-control text-center"
                        value={mag.puI}
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <input
                        disabled
                        style={{ margin: "0px", padding: "0px" }}
                        className="form-control text-center border-0"
                        value={Number(mag.puI) * Number(mag.qteI)}
                      />
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                      name="poste"
                      className="tabMagasin"
                    >
                      <input
                        name="qteE"
                        type="text"
                        style={{ margin: "0px", padding: "0px" }}
                        autoComplete="off"
                        className="form-control text-center"
                        value={mag.qteE}
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                      name="poste"
                      className="tabMagasin"
                    >
                      <input
                        name="puE"
                        type="text"
                        style={{ margin: "0px", padding: "0px" }}
                        autoComplete="off"
                        className="form-control text-center"
                        value={mag.puE}
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <input
                        disabled
                        style={{ margin: "0px", padding: "0px" }}
                        className="form-control text-center border-0"
                        value={Number(mag.puE) * Number(mag.qteE)}
                      />
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                      name="poste"
                      className="tabMagasin"
                    >
                      <input
                        name="qteS"
                        type="text"
                        style={{ margin: "0px", padding: "0px" }}
                        autoComplete="off"
                        className="form-control text-center"
                        value={mag.qteS}
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                      name="poste"
                      className="tabMagasin"
                    >
                      <input
                        name="puS"
                        type="text"
                        style={{ margin: "0px", padding: "0px" }}
                        autoComplete="off"
                        className="form-control text-center"
                        value={mag.puS}
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <input
                        disabled
                        style={{ margin: "0px", padding: "0px" }}
                        className="form-control text-center border-0"
                        value={Number(mag.puS) * Number(mag.qteS)}
                      />
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                      name="poste"
                      className="tabMagasin"
                    >
                      <input
                        name="qteF"
                        type="text"
                        autoComplete="off"
                        style={{ margin: "0px", padding: "0px" }}
                        className="form-control text-center"
                        //  value={mag.qteF}
                        value={
                          Number(mag.qteI) + Number(mag.qteE) - Number(mag.qteS)
                        }
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <input
                        disabled
                        style={{ margin: "0px", padding: "0px" }}
                        className="form-control text-center border-0"
                        //  value={Number(mag.puS) * Number(mag.qteF)}
                        //value={Number(mag.puS) * Number((mag.qteI)+(mag.qteE)-(mag.qteS)) }
                        value={
                          Number(mag.puS) *
                          (Number(mag.qteI) +
                            Number(mag.qteE) -
                            Number(mag.qteS))
                        }
                      />
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                      name="poste"
                      className="tabMagasin"
                    >
                      <input
                        name="qteR"
                        type="text"
                        autoComplete="off"
                        style={{ margin: "0px", padding: "0px" }}
                        className="form-control text-center"
                        value={mag.qteR}
                        onChange={updateInputMagasin(index)}
                      />
                      <span></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <input
                        disabled
                        style={{ margin: "0px", padding: "0px" }}
                        className="form-control text-center border-0"
                        value={Number(mag.puS) * Number(mag.qteR)}
                      />
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <input
                        disabled
                        style={{ margin: "0px", padding: "0px" }}
                        className="form-control text-center border-0"
                        // value={Number(mag.qteF) - Number(mag.qteR)}
                        value={
                          Number(mag.qteI) +
                          Number(mag.qteE) -
                          Number(mag.qteS) -
                          Number(mag.qteR)
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <tfooter>
            {isGerant() ? null : (
              <tfooter>
                <button
                  className="btn btn-info m-1"
                  title="Ajouter"
                  onClick={addLine}
                >
                  Ajouter
                </button>

                <button className="btn btn-success m-2" onClick={saveAll}>
                  Sauvegarder
                </button>
              </tfooter>
            )}
          </tfooter>
        </div>
      </div>
    </div>
  );
}
