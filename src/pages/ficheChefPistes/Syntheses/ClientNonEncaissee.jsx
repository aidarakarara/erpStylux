import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "src/api/api";
import "./encaisse.css";
import BonClientModale from "./Modales/BonClientModale";

// import { separateur } from "src/utils/formatNumber";

export default function ClientNonEncaissee({ setReload, reload, ...props }) {
  let { date } = useParams();
  let d = new Date(date);
  let mois = d.getMonth() + 1;
  let jour = d.getDate();
  const [nonEncaisse, setNonEncaisse] = useState([]);
  const [stateBonClientModale, setStateBonClientModale] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  useEffect(() => {
    api
      .get(`api/clients/non-encaisse?jour=${jour}&mois=${mois}`)
      .then((res) => setNonEncaisse(res.data))
      .catch((err) => console.log(err));
  }, [mois, jour, reload]);

  function handleSelectedClient(data) {
    setSelectedClient(data);
    setStateBonClientModale(true);
    setReload();
  }
  function handleCloseModale() {
    setStateBonClientModale(false);
    setReload();
  }
  function totalNonEncaisse() {
    var total = 0;
    total = nonEncaisse
      .map((bon) => bon.bon_clients_sum_montant)
      .reduce((prev = 0, next = 0) => parseFloat(prev) + parseFloat(next), 0);

    return total;
  }

  const separateur = (nombre) => {
    if (nombre) {
      nombre = `${nombre}`;
      // nombre = nombre.toLocaleString();
      return nombre
        .replace(/ /g, "")
        .replace(/[^0-9.]+/, "")
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    }
    return "";
  };

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
          {nonEncaisse &&
            nonEncaisse.map((client, index) => (
              <tr
                key={index}
                onClick={() => handleSelectedClient(client)}
                className="clicable"
              >
                <td>{client.nom} </td>
                <td>{client.bon_clients_count}</td>
                <td>
                  {
                    /* separateur */ client.bon_clients_sum_montant
                      .toFixed(2)
                      .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                  }{" "}
                  F
                </td>
              </tr>
            ))}

          <tr>
            <th className="text-center" colSpan="2">
              Total
            </th>
            <th className="text-center">
              {
                /* separateur */ totalNonEncaisse()
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }{" "}
              F
            </th>
          </tr>
        </tbody>
      </Table>
      {stateBonClientModale && (
        <BonClientModale
          show={true}
          client={selectedClient}
          onHide={handleCloseModale}
        />
      )}
    </div>
  );
}
