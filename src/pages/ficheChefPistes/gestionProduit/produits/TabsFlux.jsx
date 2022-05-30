import React, { useState, useEffect } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import api from "src/api/api";
import { useParams } from "react-router-dom";
import EntreeList from "./tableaux/entreeList";
import SortieList from "./tableaux/sortieList";

export default function TabsFlux() {
  const [params, setParams] = useState(useParams());
  const [entreeMagasins, setEntreeMagasins] = useState(null);
  const [entrer, setEnter] = useState(false);
  useEffect(() => {
    api.get("api/entreeMagasin").then((res) => setEntreeMagasins(res.data));
  }, []);

  function emitEnter() {
    setEnter(true);
  }
  function emitExit() {
    setEnter(false);
  }
  return (
    <div className="caisse">
      <Tabs defaultActiveKey="index" className="my-4">
        <Tab eventKey="index" title="Entréé">
          <EntreeList />
        </Tab>
        <Tab eventKey="ventes" title="Sortie">
          <SortieList />
        </Tab>
      </Tabs>
    </div>
  );
}
