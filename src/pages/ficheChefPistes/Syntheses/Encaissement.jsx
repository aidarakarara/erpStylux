import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import ClientNonEncaissee from "./ClientNonEncaissee";
import Encaissee from "./Encaissee";
import { Card } from "react-bootstrap";

export default function Encaissement() {

  const [reload, setReload] = useState(false);
  function reloadData() {
    setReload(!reload);
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-m-6 col-6">
          <Card style={{ boxShadow: '0px 0px 5px 1px #9797977e' }}>
            <Card.Body>
              <Card.Title>Bons clients</Card.Title>
              <ClientNonEncaissee setReload={() => setReload(!reload)} reload={reload} />
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 col-6">
          <Card style={{ boxShadow: '0px 0px 5px 1px #9797977e' }}>
            <Card.Body>
              <Card.Title className="titre-dash">Encaissements</Card.Title>
              <Encaissee reload={reload} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
