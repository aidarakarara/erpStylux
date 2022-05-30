import React, { useState, useEffect } from "react";
import "./index.css";
import { Tabs, Tab, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

import FicheChefPiste from "../FicheChefPiste";
import Encaissement from "./Encaissement";

export default function Index() {
  const [params, setParams] = useState(useParams());
  const [refresh, setRefresh] = useState(false);
  const [component, setComponeent] = useState("synthese");

  function handleRefres() {
    setRefresh(!refresh);
  }

  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour}/${mois}/${d.getFullYear()}`;
  }
  return (
    <div className="synthese">
      <div className="entete-fiche">
        <div className="info-stylux">
          <img src="/images/logo_ok.jpg" style={{ margin: "auto" }} />
          <div>Km 12 Route de Rufisque / Thiaroye sur mer</div>
          <div>NINEA : 006984604 - RC:SN DKR.2018.A.23163</div>
          <div>Tél : 77 577 89 05</div>
        </div>
        <Table bordered className="info-jour" size="sm">
          <tbody>
            <tr>
              <th> DATE </th>
              <td> {formatdate(params.date)} </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Tabs defaultActiveKey="index" className="my-4">
        <Tab
          eventKey="index"
          title="Synthese"
          onEntered={() => {
            handleRefres();
            setComponeent("synthese");
          }}
        >
          {component === "synthese" ? (
            <FicheChefPiste refresh={refresh} />
          ) : null}
        </Tab>
        <Tab
          eventKey="encaissement"
          title="Encaissements"
          onEntered={() => {
            setComponeent("encaissement");
          }}
        >
          {component === "encaissement" ? <Encaissement /> : null}
        </Tab>
      </Tabs>
    </div>
  );
}
