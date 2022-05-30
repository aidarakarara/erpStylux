import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "src/api/api";
import FactureModale from "./FactureModale";
import { separateur } from "src/utils/formatNumber";

export default function EncaissementClientModale({ client, ...props }) {
  let { date } = useParams();
  let d = new Date(date);
  let mois = d.getMonth() + 1;
  let jour = d.getDate();
  let annee = d.getFullYear();
  const [stateFactureModale, setStateFactureModale] = useState(false);
  const [encaisements, setEncaisements] = useState([]);
  const [lien, setLien] = useState(null);
  const [showM, setShowM] = useState(false);

  function showFactureModale() {
    //http://localhost:8000/facture/2?telecharger&jour=28&&mois=10&annee=2021
    var monlien = `${api.defaults.baseURL}facture/${client?.id}?telecharger&jour=${jour}&mois=${mois}&annee=${annee}`;
    setLien(monlien);
    setShowM(true);
    setStateFactureModale(true);
  }

  function totalEncaissement() {
    let total = 0;
    total =
      encaisements &&
      encaisements
        .map((enc) => (enc.bon ? Number(enc?.bon?.montant) : 0))
        .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);

    return total;
  }
  function formateDate(madate) {
    let date = new Date(madate);
    let lemois =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    let lejour = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let lannee = date.getFullYear();
    return `${lejour}/${lemois}/${lannee}`;
  }
  useEffect(() => {
    if (client) {
      api
        .get(
          `api/clients/${client?.id}/encaissements?jour=${jour}&mois=${mois}&annee=${annee}`
        )
        .then((res) => setEncaisements(res.data));
    }
  }, [client]);
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1300 }}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Liste des Encaissements de   <b>{client?.nom}</b> 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Date du bon</th>
              <th>Type d'encaissement</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {encaisements &&
              encaisements.map((enc, index) =>
                enc.bon ? (
                  <tr key={index}>
                    <td> {formateDate(enc?.bon?.created_at)} </td>
                    <td style={{ textTransform: "uppercase" }}>{enc?.type}</td>
                    <td>{enc?.bon && separateur(enc?.bon?.montant)}</td>
                  </tr>
                ) : null
              )}
            <tr>
              <th className="text-center" colSpan="2">
                Total
              </th>
              <th className="text-center">
                {separateur(totalEncaissement())} F 
              </th>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => showFactureModale()}>Voir la facture</Button>
      </Modal.Footer>
      {showM && (
        <FactureModale
          show={stateFactureModale}
          lien={lien}
          onHide={() => {
            setStateFactureModale(false);
            setShowM(false);
          }}
        />
      )}
    </Modal>
  );
}
