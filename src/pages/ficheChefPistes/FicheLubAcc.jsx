import React from "react";
import "./caisse.css";
import { Tabs, Tab, Table } from "react-bootstrap";
import ListeAcc from "src/pages/ficheAccessoires/ListeAcc";
import ListeLub from "src/pages/ficheLubrifiants/ListeLub";

export default function FicheLubAcc() {
  return (
    <div className="caisse">
      <Tabs defaultActiveKey="index" className="my-4">
        <Tab eventKey="index" title="Lubrifiants">
          <ListeLub />
        </Tab>
        <Tab eventKey="ventes" title="Accessoires">
          <ListeAcc />
        </Tab>
      </Tabs>
    </div>
  );
}
