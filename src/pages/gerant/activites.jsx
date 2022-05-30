import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ActivitesCaisses from "./activitesCaisses";
import RappActi from "../rappActiQuots/RappActi";
import "./caisse.css";
import { Tabs, Tab, Table } from "react-bootstrap";

export default function Activites() {
  let { date } = useParams();

  let d = new Date(date);
  let mois = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  let formate = ` ${d.getDate()}/${mois}/${d.getFullYear()}`;
  const [component, setComponent] = useState('caisse');

  return (
    <div className="activite">
      <Tabs defaultActiveKey="index" className="my-4">
        <Tab
          eventKey="index"
          title="Caisses"
          onEntered={(e) => {
            setComponent('caisse');
          }}
        >
          {component === 'caisse' ? <ActivitesCaisses /> :null}
        </Tab>
        <Tab
          eventKey="ventes"
          title="Rapport quotidien d'activités "
          onEntered={(e) => {
            setComponent('rapport');
          }}
        >
          {/* {formate} */}
          {component === 'rapport' ? <RappActi /> :null}
        </Tab>
      </Tabs>
    </div>
  );
}
