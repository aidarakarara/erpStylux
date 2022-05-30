import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { separateur } from "src/utils/formatNumber";

import { isChefPiste, isApprouved } from "./Syntheses/hooks/useChefPiste";

import { faSave } from "@fortawesome/free-solid-svg-icons";

import "./ficheChefPiste.css";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "src/api/api";
import Loader from "src/components/loader";

export default function FicheChefPiste({ refresh, ...props }) {
  let { date } = useParams();
  const [pompes, setPompes] = useState(null);
  const [clients, setClients] = useState([]);
  const [synthese, setSynthese] = useState(null);
  const [reservoirs, setReservoirs] = useState([]);
  const [commande_cars, setCommande_cars] = useState(null);
  const [commande1, setCommande1] = useState({});
  const [commande2, setCommande2] = useState({});

  const [lignes, setLignes] = useState([]);

  function totalVersement() {
    var total = lignes
      .map((item) => item.bonclients_montant)
      .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);
    return total + montanttotal() + montanttotalrecette();
  }
  //lavage
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
  //fin lavage
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

  /**
   * Add Virtual Stock array
   */

  const addStock = (reservoir, lindex) => (e) => {
    let data = {
      capacite: Number(e.target.value),
      reservoir_id: reservoir.id,
      synthese_id: synthese.id,
    };

    let newArr = [...reservoirs]; // copying the old datas array
    newArr[lindex].stock = data;
    setReservoirs(newArr);
    //Suppression des doublons
    reservoirs.map((reser, index) => {
      if (!reser.id == data.reservoir_id) {
        newArr[lindex].stock = data;
        setReservoirs(newArr);
      }
      if (reser.id == data.reservoir_id) {
        newArr[index].stock.capacite = data.capacite;
        setReservoirs(newArr);
      }
    });
    //setStocks([...stocks, data]);
  };

  const addReception = (reservoir, lindex) => (e) => {
    let data = {
      capacite: Number(e.target.value),
      reservoir_id: reservoir.id,
      synthese_id: synthese.id,
    };
    let newArr = [...reservoirs]; // copying the old datas array
    newArr[lindex].reception = data;
    setReservoirs(newArr);
    //Suppression des doublons
    reservoirs.map((reservoir, index) => {
      if (!reservoir.id == data.reservoir_id) {
        newArr[lindex].reception = data;
        setReservoirs(newArr);
      }
      if (reservoir.id == data.reservoir_id) {
        newArr[index].reception.capacite = data.capacite;
        setReservoirs(newArr);
      }
    });
    //setStocks([...stocks, data]);
    //console.log("State", meStock);
  };

  const addRemise = (reservoir, lindex) => (e) => {
    let data = {
      capacite: Number(e.target.value),
      reservoir_id: reservoir.id,
      synthese_id: synthese.id,
    };
    let newArr = [...reservoirs]; // copying the old datas array
    newArr[lindex].remise_cuve = data;
    setReservoirs(newArr);
    //Suppression des doublons
    reservoirs.map((reservoir, index) => {
      if (!reservoir.id == data.reservoir_id) {
        newArr[lindex].remise_cuve = data;
        setReservoirs(newArr);
      }
      if (reservoir.id == data.reservoir_id) {
        newArr[index].remise_cuve.capacite = e.target.value; // replace e.target.value with whatever you want to change it to
        setReservoirs(newArr); //
      }
    });
    //setStocks([...stocks, data]);
    //console.log("State", meStock);
  };

  /**
   * Save all in db
   */
  const saveAllDb = () => {
    api.get("sanctum/csrf-cookie").then((response) => {
      //Ajout et Update des Socks

      reservoirs.map((reserve) => {
        if (reserve.stock && reserve.stock.capacite <= reserve.capacite) {
          if (reserve.stock.created_at) {
            const { reservoir, ...stock } = reserve.stock;
            if (stock.capacite >= 1) {
              api
                .put(`api/stocks/${stock.id}`, stock)
                .then((res) => console.log("stock fait avec resersoir id"));
            } else {
              api
                .delete(`api/stocks/${stock.id}`)
                .then((res) => console.log("stock fait avec resersoir id"));
            }
          } else {
            if (reserve.stock.capacite >= 1)
              api.post("api/stocks", reserve.stock).then((res) => {});
          }

          var data = { quantite: reserve.stock.capacite };
          api
            .put(`api/reservoirs/${reserve.stock.reservoir_id}`, data)
            .then((res) => console.log("stock fait avec resersoir id"));
        }
      });
      // Fin Ajout et Update des Socks

      reservoirs.map((reserve) => {
        if (reserve.reception) {
          if (reserve.reception.created_at) {
            let { reservoir, ...maReception } = reserve.reception;
            if (maReception.capacite >= 1) {
              api
                .put(`api/receptions/${maReception.id}`, maReception)
                .then((res) => console.log("reception fait avec resersoir id"));
            } else {
              api
                .delete(`api/receptions/${maReception.id}`)
                .then((res) => console.log("reception fait avec resersoir id"));
            }
          } else {
            if (reserve.reception.capacite >= 1)
              api.post("api/receptions", reserve.reception).then((res) => {
                console.log("reception fait");
              });
          }
        }
      });

      reservoirs.map((reserve, index) => {
        if (reserve.remise_cuve) {
          if (reserve.remise_cuve.created_at) {
            let { reservoir, ...maRemise } = reserve.remise_cuve;
            if (maRemise.capacite >= 1) {
              api
                .put(`api/remise-cuves/${maRemise.id}`, maRemise)
                .then((res) =>
                  console.log("remise-cuves fait avec resersoir id")
                );
            } else {
              api
                .delete(`api/remise-cuves/${maRemise.id}`)
                .then((res) =>
                  console.log("remise-cuves fait avec resersoir id")
                );
            }
          } else {
            if (reserve.remise_cuve.capacite >= 1)
              api.post("api/remise-cuves", reserve.remise_cuve).then((res) => {
                console.log("reception fait");
              });
          }
        }
      });
    });

    // Fin save ALl And Update ALL
    // Save des commandes et ajout de ID Sythese
    saveCommandes();

    toast.success("Sauvegarde réussie !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function saveCommandes() {
    setCommande1((prevState) => ({
      ...prevState,
      synthese_id: synthese.id,
    }));
    setCommande2((prevState) => ({
      ...prevState,
      synthese_id: synthese.id,
    }));

    api.get("sanctum/csrf-cookie").then((response) => {
      if (
        commande1.numero_bl &&
        commande1.numero_cde &&
        commande1.heure &&
        commande1.synthese_id
      ) {
        api.post("api/commande-cars", commande1).then((res) => {
          console.log("commande1 fait");
        });
      } else if (commande1.id) {
        api.put(`api/commande-cars/${commande1.id}`, commande1).then((res) => {
          console.log("commande1 fait");
        });
      }

      // fin commande  1

      if (
        commande2.numero_bl &&
        commande2.numero_cde &&
        commande2.heure &&
        commande2.synthese_id
      ) {
        api.post("api/commande-cars", commande2).then((res) => {
          console.log("commande2 fait");
        });
      } else if (commande2.id) {
        api.put(`api/commande-cars/${commande2.id}`, commande1).then((res) => {
          console.log("commande1 fait");
        });
      }

      // fin commande 2
    });
  }

  const updateInputStock = (index) => (e) => {
    let newArr = [...reservoirs]; // copying the old datas array
    newArr[index].stock.capacite = e.target.value; // replace e.target.value with whatever you want to change it to
    setReservoirs(newArr); // ??
  };
  /**
   * Update Reception Array
   */
  const updateInputReception = (index) => (e) => {
    let newArr = [...reservoirs]; // copying the old datas array
    newArr[index].reception.capacite = e.target.value; // replace e.target.value with whatever you want to change it to
    setReservoirs(newArr); // ??
  };

  const updateInputRemise = (index) => (e) => {
    let newArr = [...reservoirs]; // copying the old datas array
    newArr[index].remise_cuve.capacite = e.target.value; // replace e.target.value with whatever you want to change it to
    setReservoirs(newArr); // ??
  };

  /**
   * Update Commandes Array
   */
  const updateInputCommande = (index) => (e) => {
    let newArr = [...commande_cars]; // copying the old datas array
    newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
    setCommande_cars(newArr); // ??
  };

  /**
   * use Effect
   */
  const [recette, setRecette] = useState();
  useEffect(() => {
    api.get("api/clients").then((res) => setClients(res.data));
    api.get(`api/recette-date/${date}`).then((res) => setRecette(res.data));
    api.get("sanctum/csrf-cookie").then((response) => {
      api.post("api/syntheses", { date }).then((res) => {
        setSynthese(res.data);
        api.get(`api/syntheses/${res.data.id}`).then((result) => {
          setCommande_cars(result.data.synthese.commande_cars);
          setLignes(result.data.synthese.encaissements);
          setPompes(result.data.pompes);
          setReservoirs(result.data.reservoirs);
        });
      });
    });
  }, [refresh]);

  /**
   *
   * @param {*} date
   * @returns  String date  02/10/2021
   */
  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour}/${mois}/${d.getFullYear()}`;
  }
  if (!synthese) {
    return <Loader />;
  }

  return (
    <div className="ficheChefPiste">
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
      <Table className="tableSynthese striped ">
        <thead>
          <tr>
            <th>
              <center>
                <strong>SYNTHESE ACTIVITES / SHELL POINT D'EAU </strong>
              </center>
            </th>
          </tr>
        </thead>
      </Table>
      <center>
        <th>
          <div style={{ marginTop: 15 }}>
            JOURNEE DU : {synthese && formatdate(synthese.date)}
          </div>
        </th>
        <th></th>
      </center>
      {/*----------- ROW -----------*/}
      <div className="row">
        {/*----------- TABLE STOCKAGE -----------*/}
        <div className="col-md-12">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th> STOCKAGE </th>
                {reservoirs &&
                  reservoirs?.map((reservoir, index) => {
                    return (
                      <th key={index + "titre"}>
                        N°{reservoir.numero} {reservoir.carburant}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th> STOCKS A 07H00 </th>
                {reservoirs &&
                  reservoirs.map((reservoir, index) => (
                    <td className="td-input" key={index}>
                      <input
                        value={reservoir.stock ? reservoir.stock.capacite : ""}
                        onChange={
                          reservoir.stock
                            ? updateInputStock(index)
                            : addStock(reservoir, index)
                        }
                        type="number"
                      />
                      <span></span>
                    </td>
                  ))}
              </tr>
              <tr>
                <th> RECEPTIONS </th>
                {reservoirs &&
                  reservoirs.map((reservoir, index) => (
                    <td className="td-input" key={"recep" + index}>
                      <input
                        type="number"
                        onChange={
                          reservoir.reception
                            ? updateInputReception(index)
                            : addReception(reservoir, index)
                        }
                        value={
                          reservoir.reception ? reservoir.reception.capacite : 0
                        }
                      />
                      <span></span>
                    </td>
                  ))}
              </tr>
              <tr>
                <th> REMISE EN CUVE </th>
                {reservoirs &&
                  reservoirs.map((reservoir, index) => (
                    <td className="td-input" key={"remis" + index}>
                      <input
                        type="number"
                        onChange={
                          reservoir.remise_cuve
                            ? updateInputRemise(index)
                            : addRemise(reservoir, index)
                        }
                        value={
                          reservoir.remise_cuve
                            ? reservoir.remise_cuve.capacite
                            : ""
                        }
                      />
                      <span></span>
                    </td>
                  ))}
              </tr>
            </tbody>
          </Table>
        </div>
        {/*----------- END TABLE STOCKAGE -----------*/}
      </div>
      {/*----------- END ROW -----------*/}
      {/*----------- ROW -----------*/}
      <div className="row">
        {/*----------- TABLE COMMANDES CARBURANTS -----------*/}
        <div className="col-md-8">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan="3">COMMANDES CARBURANTS </th>
              </tr>
              <tr className="">
                <th>N° CDES</th>
                <th>N BL</th>
                <th>HEURE</th>
              </tr>
            </thead>
            <tbody>
              {commande_cars && commande_cars.length > 0 ? (
                commande_cars.map((commande, index) => (
                  <tr key={index}>
                    <td className="td-input">
                      <input type="text" value={commande.numero_cde} />
                      <span></span>
                    </td>
                    <td className="td-input">
                      <input type="text" value={commande.numero_bl} />
                      <span></span>
                    </td>
                    <td className="td-input">
                      <input type="text" value={commande.heure} />
                      <span></span>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td className="td-input">
                      <input
                        type="text"
                        value={commande1.numero_cde}
                        onChange={(e) =>
                          setCommande1((prevState) => ({
                            ...prevState,
                            numero_cde: e.target.value,
                          }))
                        }
                      />
                      <span></span>
                    </td>
                    <td className="td-input">
                      <input
                        type="text"
                        value={commande1.numero_bl}
                        onChange={(e) =>
                          setCommande1((prevState) => ({
                            ...prevState,
                            numero_bl: e.target.value,
                          }))
                        }
                      />
                      <span></span>
                    </td>
                    <td className="td-input">
                      <input
                        type="text"
                        value={commande1.heure}
                        onChange={(e) =>
                          setCommande1((prevState) => ({
                            ...prevState,
                            heure: e.target.value,
                          }))
                        }
                      />
                      <span></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-input">
                      <input
                        type="text"
                        value={commande2.numero_cde}
                        onChange={(e) =>
                          setCommande2((prevState) => ({
                            ...prevState,
                            numero_cde: e.target.value,
                          }))
                        }
                      />
                      <span></span>
                    </td>
                    <td className="td-input">
                      <input
                        type="text"
                        value={commande2.numero_bl}
                        onChange={(e) =>
                          setCommande2((prevState) => ({
                            ...prevState,
                            numero_bl: e.target.value,
                          }))
                        }
                      />
                      <span></span>
                    </td>
                    <td className="td-input">
                      <input
                        type="text"
                        value={commande2.heure}
                        onChange={(e) =>
                          setCommande2((prevState) => ({
                            ...prevState,
                            heure: e.target.value,
                          }))
                        }
                      />
                      <span></span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        </div>
        {/*----------- END TABLE COMMANDES CARBURANTS -----------*/}
      </div>
      {/*----------- END ROW -----------*/}
      {/*----------- ROW -----------*/}
      <div className="row">
        {/*----------- TABLE POMPES -----------*/}
        <div className="col-md-6">
          <Table striped bordered hover size="sm">
            <thead>
              <th colSpan="4">POMPES</th>
              <tr>
                <th>POMPES</th>
                <th>VENTES TPE</th>
                <th>BONS CLIENTS</th>
                <th>DEPENSES</th>
              </tr>
            </thead>
            <tbody>
              {pompes &&
                pompes.map((pompe, index) => {
                  return (
                    <tr key={pompe.id}>
                      <th>{pompe.numero}</th>
                      <td>
                        {" "}
                        {pompe.mventeTpes &&
                          pompe.mventeTpes
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )}{" "}
                      </td>
                      <td>
                        {pompe.mbonClients &&
                          pompe.mbonClients
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )}{" "}
                      </td>
                      <td>
                        {pompe.mdepenses &&
                          pompe.mdepenses
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )}{" "}
                      </td>
                    </tr>
                  );
                })}

              <tr>
                <th>TOTAUX</th>
                <td>
                  {pompes &&
                    /* separateur */ pompes
                      .map((item) => item.mventeTpes)
                      .reduce(
                        (prev = 0, next = 0) => Number(prev) + Number(next),
                        0
                      )
                      .toFixed(2)
                      .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
                </td>
                <td>
                  {pompes &&
                    /* separateur */ pompes
                      .map((item) => item.mbonClients)
                      .reduce(
                        (prev = 0, next = 0) => Number(prev) + Number(next),
                        0
                      )
                      .toFixed(2)
                      .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
                </td>
                <td>
                  {pompes &&
                    /* separateur */ pompes
                      .map((item) => item.mdepenses)
                      .reduce(
                        (prev = 0, next = 0) => Number(prev) + Number(next),
                        0
                      )
                      .toFixed(2)
                      .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/*----------- END POMPES -----------*/}

        {/*----------- TABLE AUTRES RECETTES -----------*/}
        <div className="col-md-6">
          <Table striped bordered hover size="sm">
            <thead>
              <th colSpan="2">AUTRES RECETTES</th>
            </thead>
            <tbody>
              <tr>
                <th> LAVAGE </th>
                {recette &&
                  recette.map((r, index) => (
                    <td className="td text-right" key={index}>
                      {
                        /* separateur */ r.totallav
                          .toFixed(0)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }{" "}
                      FCFA
                    </td>
                  ))}
              </tr>
              <tr>
                <th> FUTS </th>
                {recette &&
                  recette.map((r, index) => (
                    <td className="td text-right" key={index}>
                      {
                        /* separateur */ r.totalfut
                          .toFixed(0)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }{" "}
                      FCFA
                    </td>
                  ))}
              </tr>
              <tr>
                <th>LUBRIFIANTS</th>
                {recette &&
                  recette.map((r, index) => (
                    <td className="td text-right" key={index}>
                      {
                        /* separateur */ r.totallub
                          .toFixed(0)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }{" "}
                      FCFA
                    </td>
                  ))}
              </tr>
              <tr>
                <th>ACCESSOIRES</th>
                {recette &&
                  recette.map((r, index) => (
                    <td className="td text-right" key={index}>
                      {
                        /* separateur */ r.totalacc
                          .toFixed(0)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      }{" "}
                      FCFA
                    </td>
                  ))}
              </tr>
            </tbody>
          </Table>
        </div>
        {/*----------- END TABLE AUTRES RECETTES -----------*/}
      </div>
      {/*----------- END ROW -----------*/}
      {/*----------- ROW -----------*/}
      <div className="row">
        {/*----------- TABLE RECHARGEMENT CARTES TPE -----------*/}
        <div className="col-md-6">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan="3" className="center">
                  RECHARGEMENT CARTES TPE
                </th>
              </tr>
              <tr>
                <th className="center">CLIENTS</th>
                <th className="center">MONTANT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-input">
                  <input type="text" />
                  <span></span>
                </td>
                <td className="td-input">
                  <input type="text" />
                  <span></span>
                </td>
              </tr>
              <tr>
                <td className="td-input">
                  <input type="text" />
                  <span></span>
                </td>
                <td className="td-input">
                  <input type="text" />
                  <span></span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/*----------- END TABLE RECHARGEMENT CARTES TPE -----------*/}

        {/*----------- TABLE REGLEMENTS / ENCAISSEMENTS -----------*/}
        <div className="col-md-6">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan="4" className="center bord2 bord">
                  REGLEMENTS / ENCAISSEMENTS
                </th>
              </tr>
            </thead>
            <tbody>
              <Table striped bordered hover size="sm">
                <thead>
                  <th className="center">CLIENT</th>
                  <th className="center bord">MONTANT</th>
                </thead>
                <tbody id="tableau">
                  {lignes &&
                    lignes.map((ligne, index) => (
                      <tr key={index}>
                        <td className="td-input">
                          {ligne.nom} <span></span>
                        </td>
                        <td className="td-input">
                          {separateur(ligne.bonclients_montant)} <span></span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </tbody>
          </Table>
        </div>
        {/*----------- END TABLE REGLEMENTS / ENCAISSEMENTS -----------*/}
      </div>
      {/*----------- ROW -----------*/}
      {/*----------- ROW -----------*/}
      <div className="row">
        {/*----------- TABLE VERSEMENT DU JOUR -----------*/}
        <div className="col-md-12">
          <Table striped bordered hover size="sm">
            <tbody>
              <tr className="center">
                <th>TOTAL VERSEMENT </th>
                <td>{separateur(totalVersement())} F CFA</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/*----------- END TABLE VERSEMENT DU JOUR -----------*/}
      </div>
      {/*----------- ROW -----------*/}
      {isChefPiste() && !isApprouved(synthese?.etat) && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={saveAllDb} className="btn btn-success">
            <FontAwesomeIcon icon={faSave} /> Sauvegarder
          </button>
        </div>
      )}
    </div>
  );
}
