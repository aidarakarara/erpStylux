import React, { useState, useEffect } from "react";
import "./caisse.css";
import { Tabs, Tab, Table } from "react-bootstrap";
import Index from "./caisse/Index";
import VentCartTpe from "./caisse/VentCartTpe";
import BonClie from "./caisse/BonClie";
import Depense from "./caisse/Depense";
import api from "src/api/api";
import { useParams } from "react-router-dom";
import Totale from "./caisse/Totale";
import Loader from "src/components/loader";

export default function Caisse() {
  const [params, setParams] = useState(useParams());
  const [caisse, setCaisse] = useState(null);
  const [entrer, setEnter] = useState(false);
  useEffect(() => {
    api.get(`api/caisses/${params.caisse}`).then((res) => {
      setCaisse(res.data.caisse);
    });
  }, []);
  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour}/${mois}/${d.getFullYear()}`;
  }
  if (!caisse) {
    return <Loader />;
  }
  function emitEnter() {
    setEnter(true);
  }
  function emitExit() {
    setEnter(false);
  }
  return (
    <div className="caisse">
      <div className="entete-fiche">
        <div className="info-stylux">
          <img
            src="/images/logo_ok.jpg"
            style={{ margin: "auto" }}
            alt="logo"
          />
          <div>Km 12 Route de Rufisque / Thiaroye sur mer</div>
          <div>NINEA : 006984604 - RC:SN DKR.2018.A.23163</div>
          <div>Tél : 77 577 89 05</div>
        </div>
        <Table bordered className="info-jour" size="sm">
          <tbody>
            <tr>
              <th> DATE </th>
              <td> {caisse && formatdate(caisse.date_caisse)} </td>
              <th colSpan="2">
                <center>
                  <strong>POMPE N° {caisse && caisse.pompe.numero} </strong>
                </center>
              </th>
            </tr>
            <tr>
              <th> NOM </th>
              <td> {caisse && caisse.user.name} </td>
              <td>HORAIRE</td>
              <td> {caisse && caisse.horaire} H</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Tabs defaultActiveKey="index" className="my-4">
        <Tab eventKey="index" title="Index">
          <Index />
        </Tab>
        <Tab eventKey="ventes" title="Ventes par Carte TPE">
          <VentCartTpe />
        </Tab>
        <Tab eventKey="clients" title="Bons Clients">
          <BonClie />
        </Tab>
        <Tab eventKey="depenses" title="Dépenses">
          <Depense />
        </Tab>
        <Tab
          eventKey="total"
          title="Caisse"
          onEntered={emitEnter}
          onExit={emitExit}
        >
          <Totale Entrer={entrer} />
        </Tab>
      </Tabs>
    </div>
  );
}
