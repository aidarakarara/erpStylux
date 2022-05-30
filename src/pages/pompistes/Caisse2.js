import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
import saveFill from "@iconify/icons-eva/save-fill";
import "./caisse2.css";
import { Table } from "react-bootstrap";
import Tr from "./Tr";
import $ from "jquery";

import { Switch, Route, Link, useParams } from "react-router-dom";
import api from "src/api/api";
import { upperCase } from "lodash";
import Loader from "src/components/loader";
export default function Caisse() {
  const [caisse, setCaisse] = useState(null);
  const [comptUpdate, setComptUpdate] = useState(false);
  const [i, setI] = useState(0);
  const [params, setParams] = useState(useParams());
  const [pistolets, setPistolets] = useState(null);
  const [stateTrs, setStateTrs] = useState([]);
  const [mustSave, setMustSave] = useState(false);
  const [firstEffect, setFirstEffect] = useState(true);

  /**
   * Tr qui on etait modifier
   */

  const [forUpdate, setForUpdate] = useState([]);

  const [indePist1ElecFerm, setIndePist1ElecFerm] = useState(0);
  const [indePist1MecaFerm, setIndePist1MecaFerm] = useState(0);
  const [indePist2ElecFerm, setIndePist2ElecFerm] = useState(0);
  const [indePist2MecaFerm, setIndePist2MecaFerm] = useState(0);

  const [indePist1ElecOuve, setIndePist1ElecOuve] = useState(0);
  const [indePist1MecaOuve, setIndePist1MecaOuve] = useState(0);
  const [indePist2ElecOuve, setIndePist2ElecOuve] = useState(0);
  const [indePist2MecaOuve, setIndePist2MecaOuve] = useState(0);

  const [coffre, setCoffre] = useState(0);
  const [netVers, setNetVers] = useState(0);

  /*****
   * FONCTIOB DE CALCULES
   ****/
  function fIndePist1ElecSort() {
    return indePist1ElecFerm > indePist1ElecOuve
      ? Math.round((indePist1ElecFerm - indePist1ElecOuve) * 100) / 100
      : 0;
  }
  function fIndePist1MecaSort() {
    return indePist1MecaFerm > indePist1MecaOuve
      ? Math.round((indePist1MecaFerm - indePist1MecaOuve) * 100) / 100
      : 0;
  }
  function fIndePist2ElecSort() {
    return indePist2ElecFerm > indePist2ElecOuve
      ? Math.round((indePist2ElecFerm - indePist2ElecOuve) * 100) / 100
      : 0;
  }
  function fIndePist2MecaSort() {
    return indePist2MecaFerm > indePist2MecaOuve
      ? Math.round((indePist2MecaFerm - indePist2MecaOuve) * 100) / 100
      : 0;
  }

  function fIndePist1ElecMont() {
    var prix = pistolets
      ? pistolets[0].compteur
        ? pistolets[0].compteur.prix
        : pistolets[0].prix
      : 0;
    return Math.round(fIndePist1ElecSort() * prix * 100) / 100;
  }
  function fIndePist1MecaMont() {
    var prix = pistolets
      ? pistolets[0].compteur
        ? pistolets[0].compteur.prix
        : pistolets[0].prix
      : 0;
    return Math.round(fIndePist1MecaSort() * prix * 100) / 100;
  }
  function fIndePist2ElecMont() {
    var prix = pistolets
      ? pistolets[1].compteur
        ? pistolets[1].compteur.prix
        : pistolets[1].prix
      : 0;
    return Math.round(fIndePist2ElecSort() * prix * 100) / 100;
  }
  function fIndePist2MecaMont() {
    var prix = pistolets
      ? pistolets[1].compteur
        ? pistolets[1].compteur.prix
        : pistolets[1].prix
      : 0;
    return Math.round(fIndePist2MecaSort() * prix * 100) / 100;
  }

  function fMontTotaVentPom() {
    return Math.round((fIndePist1ElecMont() + fIndePist2ElecMont()) * 10) / 10;
  }

  function getTotalCarteTPE() {
    var total = 0;
    stateTrs.forEach((data) => {
      if (data.ventCartTPE.mont != "")
        total = parseFloat(total) + parseFloat(data.ventCartTPE.mont);
    });
    return total;
  }

  function getTotalClient() {
    var total = 0;
    stateTrs.forEach((data) => {
      if (data.clie.mont != "")
        total = parseFloat(total) + parseFloat(data.clie.mont);
    });
    return total;
  }
  function getTotalDepense() {
    var total = 0;
    stateTrs.forEach((data) => {
      if (data.depe.mont != "")
        total = parseFloat(total) + parseFloat(data.depe.mont);
    });
    return total;
  }

  function getTotalNonRecu() {
    return getTotalCarteTPE() + getTotalClient() + getTotalDepense();
  }
  function getTotalCarburant() {
    return fMontTotaVentPom() - getTotalNonRecu();
  }
  function getTotalNetAVers() {
    return getTotalCarburant() - coffre;
  }
  function getEcart() {
    return getTotalNetAVers() - netVers;
  }
  /*****
   * END FONCTIOB DE CALCULES
   ****/

  /*****
   * AJOUTER UNE LIGNE DANS LE TABLEAU
   ****/
  function addLine(pose) {
    if (pose === i) {
      setStateTrs([
        ...stateTrs,
        {
          rang: i + 1,
          id: null,
          ventCartTPE: { id: null, numeCart: "", mont: "" },
          clie: { id: null, nomClie: "", mont: "" },
          depe: { id: null, just: "", mont: "" },
        },
      ]);
      setI(i + 1);
      //console.log(stateTrs);
    }
  }

  function setData(data) {
    var tabDeb = stateTrs.slice(0, data.rang);
    var tabFin = stateTrs.slice(data.rang + 1, stateTrs.length);
    setStateTrs([...tabDeb, data, ...tabFin]);
  }
  /*****
   * END AJOUTER UNE LIGNE DANS LE TABLEAU
   ****/

  /*****
   * USE EFFECT
   ****/
  useEffect(() => {
    if (firstEffect) {
      setFirstEffect(false);
    } else {
      setMustSave(true);
    }
  }, [
    indePist1ElecFerm,
    indePist1MecaFerm,
    indePist2ElecFerm,
    indePist2MecaFerm,
    coffre,
    netVers,
  ]);

  useEffect(() => {
    loadData();
  }, [params.caisse]);

  useEffect(() => {
    if (pistolets) {
      setIndePist1ElecOuve(pistolets[0].indexE);
      setIndePist1MecaOuve(pistolets[0].indexM);
      setIndePist2ElecOuve(pistolets[1].indexE);
      setIndePist2MecaOuve(pistolets[1].indexM);

      if (pistolets[0].compteur && pistolets[1].compteur) {
        //pour la modification du compteur
        setComptUpdate(true);

        setIndePist1ElecOuve(pistolets[0].compteur.indexOuvE);
        setIndePist1MecaOuve(pistolets[0].compteur.indexOuvM);
        setIndePist2ElecOuve(pistolets[1].compteur.indexOuvE);
        setIndePist2MecaOuve(pistolets[1].compteur.indexOuvM);

        setIndePist1ElecFerm(pistolets[0].compteur.indexFerE);
        setIndePist1MecaFerm(pistolets[0].compteur.indexFerM);
        setIndePist2ElecFerm(pistolets[1].compteur.indexFerE);
        setIndePist2MecaFerm(pistolets[1].compteur.indexFerM);
      }
    }
  }, [pistolets]);
  /*****
   * END USE EFFECT
   ****/

  /*****
   * LOAD DATA
   ****/
  function loadData() {
    api.get(`api/caisses/${params.caisse}`).then((res) => {
      console.log("useeffect caisse", res.data);
      setCaisse(res.data);
      setCoffre(res.data.caisse.coffre);
      setNetVers(res.data.caisse.netVer);
      setPistolets(res.data.pistolets);

      let nbTr = Math.max(
        res.data.depenses.length,
        res.data.venteTpes.length,
        res.data.bonClients.length
      );
      let tabTr = [];
      for (let n = 0; n < nbTr; n++) {
        tabTr = [
          ...tabTr,
          {
            rang: n,
            ventCartTPE: {
              id: res.data.venteTpes[n] ? res.data.venteTpes[n].id : null,
              numeCart: res.data.venteTpes[n]
                ? res.data.venteTpes[n].numero_carte
                : "",
              mont: res.data.venteTpes[n] ? res.data.venteTpes[n].montant : "",
            },
            clie: {
              id: res.data.bonClients[n] ? res.data.bonClients[n].id : null,
              nomClie: res.data.bonClients[n]
                ? res.data.bonClients[n].nom_client
                : "",
              mont: res.data.bonClients[n]
                ? res.data.bonClients[n].montant
                : "",
            },
            depe: {
              id: res.data.depenses[n] ? res.data.depenses[n].id : null,
              just: res.data.depenses[n]
                ? res.data.depenses[n].justificatif
                : "",
              mont: res.data.depenses[n] ? res.data.depenses[n].montant : "",
            },
          },
        ];
      }
      tabTr = [
        ...tabTr,
        {
          rang: nbTr,
          ventCartTPE: { id: null, numeCart: "", mont: "" },
          clie: { id: null, nomClie: "", mont: "" },
          depe: { id: null, just: "", mont: "" },
        },
      ];
      setStateTrs(tabTr);
      setI(nbTr);
    });
  }
  /*****
   * END LOAD DATA
   ****/

  /*****
   * SAVE DATA
   ****/
  function saveCompteur() {
    let compteur1 = {
      caisse_id: caisse.caisse.id,
      pistolet_id: pistolets[0].id,
      indexOuvE: indePist1ElecOuve,
      indexOuvM: indePist1MecaOuve,
      indexFerE: indePist1ElecFerm,
      indexFerM: indePist1MecaFerm,
      prix: pistolets[0].compteur
        ? pistolets[0].compteur.prix
        : pistolets[0].prix,
    };
    let compteur2 = {
      caisse_id: caisse.caisse.id,
      pistolet_id: pistolets[1].id,
      indexOuvE: indePist2ElecOuve,
      indexOuvM: indePist2MecaOuve,
      indexFerE: indePist2ElecFerm,
      indexFerM: indePist2MecaFerm,
      prix: pistolets[1].compteur
        ? pistolets[1].compteur.prix
        : pistolets[1].prix,
    };

    api.get("sanctum/csrf-cookie").then((response) => {
      if (pistolets[0].compteur && pistolets[1].compteur) {
        compteur1.id = pistolets[0].compteur.id;
        compteur2.id = pistolets[1].compteur.id;

        if (
          !(
            compteur1.indexFerE == pistolets[0].compteur.indexFerE &&
            compteur1.indexFerM == pistolets[0].compteur.indexFerM
          )
        ) {
          console.log("not same 1");
          api.put(`api/compteurs/${compteur1.id}`, compteur1).then((res) => {
            console.log("before", {
              indexE: compteur1.indexFerE,
              indexM: compteur1.indexFerM,
            });
            api
              .put(`api/pistolets/${pistolets[0].id}`, {
                indexE: compteur1.indexFerE,
                indexM: compteur1.indexFerM,
              })
              .then((res) => {
                loadData();
                console.log("after", res);
              });
            console.log("save update pist 1", res.data);
          });
        } else {
          console.log("same 1");
        }

        if (
          !(
            compteur2.indexFerE == pistolets[1].compteur.indexFerE &&
            compteur2.indexFerM == pistolets[1].compteur.indexFerM
          )
        ) {
          console.log("not same 2");
          api.put(`api/compteurs/${compteur2.id}`, compteur2).then((res) => {
            api
              .put(`api/pistolets/${pistolets[1].id}`, {
                indexE: compteur2.indexFerE,
                indexM: compteur2.indexFerM,
              })
              .then((res) => {
                loadData();
              });
            console.log("save update pist 2", res.data);
          });
        } else {
          console.log("same 2");
        }
      } else {
        api.post("api/compteurs", compteur1).then((res) => {
          loadData();
          api
            .put(`api/pistolets/${pistolets[0].id}`, {
              indexE: compteur1.indexFerE,
              indexM: compteur1.indexFerM,
            })
            .then((res) => {});
        });
        api.post("api/compteurs", compteur2).then((res) => {
          loadData();
          api
            .put(`api/pistolets/${pistolets[1].id}`, {
              indexE: compteur2.indexFerE,
              indexM: compteur2.indexFerM,
            })
            .then((res) => {});
        });
      }
    });
  }

  function saveVentCartTPE() {
    api.get("sanctum/csrf-cookie").then((response) => {
      stateTrs.forEach((e) => {
        var data = {
          caisse_id: caisse.caisse.id,
          numero_carte: e.ventCartTPE.numeCart,
          montant: e.ventCartTPE.mont,
        };

        if (e.ventCartTPE.id == null) {
          if (e.ventCartTPE.mont != "") {
            api.post("api/venteTpes", data).then((res) => {
              loadData();
            });
          }
        } else {
          if (e.ventCartTPE.mont == "") {
            api.delete(`api/venteTpes/${e.ventCartTPE.id}`).then((res) => {
              loadData();
            });
          } else {
            if (data.numero_carte != caisse.venteTpes[e.rang].numero_carte) {
              api.put(`api/venteTpes/${e.ventCartTPE.id}`, data).then((res) => {
                loadData();
              });
            }
          }
        }
      });
    });
  }

  function saveClie() {
    api.get("sanctum/csrf-cookie").then((response) => {
      stateTrs.forEach((e) => {
        var data = {
          caisse_id: caisse.caisse.id,
          nom_client: e.clie.nomClie,
          montant: e.clie.mont,
        };

        if (e.clie.id == null) {
          if (e.clie.mont != "") {
            api.post("api/bonClients", data).then((res) => {
              loadData();
            });
          }
        } else {
          if (e.clie.mont == "") {
            api.delete(`api/bonClients/${e.clie.id}`).then((res) => {
              loadData();
            });
          } else {
            if (data.nom_client != caisse.bonClients[e.rang].nom_client) {
              api.put(`api/bonClients/${e.clie.id}`, data).then((res) => {
                loadData();
              });
            }
          }
        }
      });
    });
  }

  function saveDepense() {
    api.get("sanctum/csrf-cookie").then((response) => {
      stateTrs.forEach((e) => {
        console.log(caisse);

        var data = {
          caisse_id: caisse.caisse.id,
          justificatif: e.depe.just,
          montant: e.depe.mont,
        };

        if (e.depe.id == null) {
          if (e.depe.mont != "") {
            api.post("api/depenses", data).then((res) => {
              loadData();
            });
          }
        } else {
          if (e.depe.mont == "") {
            api.delete(`api/depenses/${e.depe.id}`).then((res) => {
              loadData();
            });
          } else {
            if (data.justificatif != caisse.depenses[e.rang].justificatif) {
              api.put(`api/depenses/${e.depe.id}`, data).then((res) => {
                loadData();
              });
            }
          }
        }
      });
    });
  }

  function saveCaisse() {
    var MonObj = caisse.caisse;
    const { pompe, ...maCaisse } = MonObj;
    maCaisse.coffre = coffre;
    maCaisse.netVer = netVers;
    maCaisse.ecart = getEcart();

    api.get("sanctum/csrf-cookie").then((response) => {
      api.put(`api/caisses/${maCaisse.id}`, maCaisse).then((res) => {
        loadData();
      });
    });
  }
  /*****
   * END SAVE DATA
   ****/

  /*  SAVE ALL  */

  function saveAll() {
    console.log("3ALL");
    saveCompteur();
    saveVentCartTPE();
    saveClie();
    saveDepense();
    saveCaisse();
  }

  /* END SAVE ALL  */

  function forchange(dat) {
    setForUpdate([...forUpdate, dat]);
    console.log("forUpdate", forUpdate);
  }

  if (!caisse && !pistolets) {
    return <Loader></Loader>;
  }

  return (
    <div className="fichePompiste">
      <div className="entete-fiche">
        <div className="info-stylux">
          <img src="/images/logo_ok.jpg" alt="logo" />
          <div>Km 12 Route de Rufisque / Thiaroye sur mer</div>
          <div>NINEA : 006984604 - RC:SN DKR.2018.A.23163</div>
          <div>Tél : 77 577 89 05</div>
        </div>
        <Table bordered className="info-jour" size="sm">
          <tbody>
            <tr>
              <th> DATE </th>
              <td>{caisse && caisse.caisse.date_caisse}</td>
              <th colSpan="2">
                <center>
                  {" "}
                  <strong> POMPE N°{caisse.caisse.pompe.numero}</strong>{" "}
                </center>
              </th>
            </tr>
            <tr>
              <th> NOM </th>
              <td> {caisse.pompiste.name} </td>
              <td>HORAIRE</td>
              <td>{caisse.caisse && caisse.caisse.horaire} H</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="titre-fiche-pompiste">FICHE POMPISTE</div>

      <Table
        className="tableIndex mb-3"
        hover
        striped
        bordered
        size="sm"
        responsive="lg"
      >
        <thead>
          <tr>
            <th className="bordT bordB bordR bordL" colSpan="3">
              {" "}
              <center style={{ textTransform: "upperCase" }}>
                {" "}
                INDEX {pistolets && pistolets[0].nom}{" "}
              </center>
            </th>
            <th className="bordT bordB bordR bordL" colSpan="3">
              <center style={{ textTransform: "upperCase" }}>
                {" "}
                INDEX {pistolets && pistolets[1].nom}{" "}
              </center>
            </th>
          </tr>
        </thead>

        <thead className="sous-titre">
          <tr>
            <th className="bordL bordR2 bordB" colSpan="2">
              {" "}
              <center>ELECTRONIQUES</center>
            </th>
            <th className="bordR bordB">
              {" "}
              <center> MECANIQUES </center>{" "}
            </th>
            <th className="bordL bordR2 bordB" colSpan="2">
              {" "}
              <center> ELECTRONIQUES </center>
            </th>
            <th className="bordR bordB">
              <center> MECANIQUES</center>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="bordL bordR2">
              <b>Fermeture</b>
            </td>
            <td className="indexFerme bordR2">
              <input
                onChange={(e) => setIndePist1ElecFerm(e.target.value)}
                type="tel"
                value={indePist1ElecFerm}
                className="form-control"
              />
            </td>
            <td className="indexFerme bordR">
              <input
                onChange={(e) => setIndePist1MecaFerm(e.target.value)}
                type="tel"
                value={indePist1MecaFerm}
                className="form-control"
              />
            </td>
            <td className="bordR2">
              <b>Fermeture</b>
            </td>
            <td className="indexFerme bordR2">
              <input
                onChange={(e) => setIndePist2ElecFerm(e.target.value)}
                type="tel"
                value={indePist2ElecFerm}
                className="form-control"
              />
            </td>
            <td className="indexFerme bordR">
              <input
                onChange={(e) => setIndePist2MecaFerm(e.target.value)}
                type="tel"
                value={indePist2MecaFerm}
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <td className="bordL bordR2">
              <b>Ouverture</b>
            </td>
            <td className="bordR2">
              <center>
                {indePist1ElecOuve && indePist1ElecOuve.toLocaleString()}
              </center>
            </td>
            <td className="bordR">
              <center>
                {indePist1MecaOuve && indePist1MecaOuve.toLocaleString()}
              </center>
            </td>
            <td className="bordR2">
              <b>Ouverture</b>
            </td>
            <td className="bordR2">
              <center>
                {indePist2ElecOuve && indePist2ElecOuve.toLocaleString()}
              </center>
            </td>
            <td className="bordR">
              <center>
                {indePist2MecaOuve && indePist2MecaOuve.toLocaleString()}
              </center>
            </td>
          </tr>
          <tr>
            <td className="bordL bordR2">
              <b>Sortie</b>
            </td>
            <td className="bordR2">
              <center>{fIndePist1ElecSort().toLocaleString()}</center>
            </td>
            <td className="bordR">
              <center>{fIndePist1MecaSort().toLocaleString()}</center>
            </td>
            <td className="bordR2">
              <b>Sortie</b>
            </td>
            <td className="bordR2">
              <center>{fIndePist2ElecSort().toLocaleString()}</center>
            </td>
            <td className="bordR">
              <center>{fIndePist2MecaSort().toLocaleString()}</center>
            </td>
          </tr>
          <tr>
            <td className="bordL bordR2">
              <b>Prix U</b>
            </td>
            <td className="bordR" colSpan="2">
              <center>
                {pistolets &&
                  (pistolets[0].compteur
                    ? pistolets[0].compteur.prix
                    : pistolets[0].prix)}
              </center>
            </td>
            <td className="bordR2">
              <b>Prix U</b>
            </td>
            <td className="bordR" colSpan="2">
              <center>
                {pistolets &&
                  (pistolets[1].compteur
                    ? pistolets[1].compteur.prix
                    : pistolets[1].prix)}
              </center>
            </td>
          </tr>
          <tr>
            <td className="bordL bordB bordR2">
              <b>Montant</b>
            </td>
            <td className="bordB bordR2">
              <center>{fIndePist1ElecMont().toLocaleString()}</center>
            </td>
            <td className="bordR bordB">
              <center>{fIndePist1MecaMont().toLocaleString()}</center>
            </td>
            <td className="bordL bordB bordR2">
              <b>Montant</b>
            </td>
            <td className="bordB bordR2">
              <center>{fIndePist2ElecMont().toLocaleString()}</center>
            </td>
            <td className="bordB bordR">
              <center>{fIndePist2MecaMont().toLocaleString()}</center>
            </td>
          </tr>
        </tbody>
      </Table>

      <div className="sous-somme">
        <div>
          <span>
            <b style={{ textTransform: "upperCase" }}>
              MONTANTS VENTES {pistolets && pistolets[0].nom} :{" "}
            </b>
          </span>
          <span>
            <b>{fIndePist1ElecMont().toLocaleString()}</b>
          </span>
        </div>
        <div>
          <span>
            <b style={{ textTransform: "upperCase" }}>
              MONTANTS VENTES {pistolets && pistolets[1].nom} :{" "}
            </b>
          </span>
          <span>
            <b>{fIndePist2ElecMont().toLocaleString()}</b>
          </span>
        </div>
      </div>

      <div className="somme">
        <div>
          <span>
            <b>
              MONTANTS TOTAL VENTES POMPE N°
              {caisse && caisse.caisse.pompe.numero} :{" "}
            </b>
          </span>
          <span>
            <b>{fMontTotaVentPom().toLocaleString()}</b>
          </span>
        </div>
      </div>

      <Table className="table-valeur" striped bordered hover size="sm">
        <thead>
          <tr>
            <th className="bordT bordL bordR bordB" colSpan="2">
              VENTES PAR CARTE TPE
            </th>
            <th className="bordT bordR bordB" colSpan="2">
              CLIENTS
            </th>
            {caisse.caisse.pompe.numero == "2" && (
              <th className="bordT bordR bordB" colSpan="2">
                DEPENSES
              </th>
            )}
          </tr>
        </thead>
        <thead className="sous-titre">
          <tr>
            <th className="bordT bordL bordR2 bordB">N° DE LA CARTE </th>
            <th className="bordR bordB">MONTANTS</th>
            <th className="bordR2 bordB">NOM DU CLIENT</th>
            <th className="bordR bordB">MONTANTS</th>
            {caisse.caisse.pompe.numero == "2" && (
              <>
                <th className="bordR2 bordB">JUSTIFICATIF</th>
                <th className="bordR bordB">MONTANTS</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {stateTrs.map((stateTr) => {
            return (
              <Tr
                key={stateTr.rang}
                data={stateTr}
                setData={setData}
                addLine={addLine}
                numeroCompte={caisse.caisse.pompe.numero}
              />
            );
          })}

          <tr>
            <th className="bordT bordL bordR2 bordB">TOTAL TPE</th>
            <td className="bordT bordR bordB">
              {getTotalCarteTPE().toLocaleString()}
            </td>
            <th className="bordT bordR2 bordB">TOTAL CLIENTS</th>
            <td className="bordT bordR bordB">
              {getTotalClient().toLocaleString()}
            </td>
            {caisse.caisse.pompe.numero == "2" && (
              <>
                <th className="bordT bordR2 bordB">TOTAL DEPENSES</th>
                <td className="bordT bordR bordB">
                  {getTotalDepense().toLocaleString()}
                </td>
              </>
            )}
          </tr>
        </tbody>
      </Table>

      <div className="somme">
        <div>
          <span>
            <b>MONTANT TOTAL NON RECUs : </b>
          </span>
          <span>
            <b>{getTotalNonRecu().toLocaleString()}</b>
          </span>
        </div>
      </div>

      <Table
        className="table-resultat"
        bordered
        hover
        style={{ marginTop: 50 }}
        size="sm"
      >
        <tbody>
          <tr>
            <th className="bordT bordB bordL bordR2"> TOTAL CARBURANTS </th>
            <td className="bordT bordB bordR">
              <b>{getTotalCarburant().toLocaleString()}</b>
            </td>
            <th className="bordT bordB bordR2">COFFRE</th>
            <td className="td-saisi bordT bordB bordR">
              <input
                value={coffre}
                onChange={(e) => {
                  setCoffre(e.target.value);
                }}
                type="tel"
                className="form-control"
              />
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
            <th className="bordB bordL bordR2">TOTAL NET A VERSER</th>
            <td className="bordB bordR">{getTotalNetAVers()}</td>
            <th className="bordB bordR2">NET VERSE </th>
            <td className="td-saisi bordB bordR">
              <input
                value={netVers}
                onChange={(e) => {
                  setNetVers(e.target.value);
                }}
                type="tel"
                className="form-control"
              />
            </td>
            <th className="bordT bordB bordR2">ECART CAISSE </th>
            <td className="bordT bordB bordR">{getEcart()}</td>
          </tr>
        </tbody>
      </Table>

      <div style={{ textAlign: "right" }}>
        {caisse.caisse.approuve == 1 ? (
          ""
        ) : (
          <button
            onClick={() => {
              setMustSave(false);
              saveAll();
            }}
            className="btn btn-success px-5 py-2"
          >
            {comptUpdate ? "Modifier " : "Enregistrer "}
            {mustSave ? (
              <Icon icon={saveFill} />
            ) : (
              <Icon icon={checkmarkFill} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
