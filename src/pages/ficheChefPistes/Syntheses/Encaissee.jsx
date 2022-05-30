import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { separateur } from "src/utils/formatNumber";

import EncaissementClientModale from "./Modales/EncaissementClientModale";
import api from "src/api/api";
import "./encaisse.css";

export default function Encaissee({ reload, ...props }) {
  let { date } = useParams();
  let d = new Date(date);
  let mois = d.getMonth() + 1;
  let jour = d.getDate();
  let annee = d.getFullYear();
  const [encaisses, setEncaisses] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});

  const [stateEncaissementClientModale, setStateEncaissementClientModale] =
    useState(false);
  const [showM, setShowM] = useState(false);

  useEffect(() => {
    api
      .get(`api/clients/encaisse?jour=${jour}&mois=${mois}&annee=${annee}`)
      .then((res) => setEncaisses(res.data))
      .catch((err) => console.log(err));
  }, [mois, jour, annee, reload]);

  function handleSelectedClient(data) {
    setSelectedClient(data);
    setShowM(true);
    setStateEncaissementClientModale(true);
  }

  function totalEncaisse() {
    var total = 0;
    total = encaisses
      .map((client) => client.bonclients_montant)
      .reduce((prev = 0, next = 0) => parseFloat(prev) + parseFloat(next), 0);

    return total;
  }
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nom Client</th>
            <th>Nombre de bons</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {encaisses &&
            encaisses.map((client, index) => (
              <tr
                key={index}
                onClick={() => handleSelectedClient(client)}
                className="clicable"
              >
                <td>{client.nom}</td>
                <td>{client.bonclients_count} </td>
                <td>
                  {client.bonclients_montant
                    .toFixed(0)
                    .replace(
                      /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                      "$1 "
                    )}{" "}
                  F
                </td>
              </tr>
            ))}

          <tr>
            <th className="text-center" colSpan="2">
              Total
            </th>
            <th className="text-center">
              {totalEncaisse()
                .toFixed(2)
                .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}{" "}
              F
            </th>
          </tr>
        </tbody>
      </Table>
      {showM && (
        <EncaissementClientModale
          show={stateEncaissementClientModale}
          client={selectedClient}
          onHide={() => {
            setStateEncaissementClientModale(false);
            setShowM(false);
          }}
        />
      )}
    </div>
  );
}
