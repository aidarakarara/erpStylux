import React from "react";
import { Table } from "react-bootstrap";
import Page from "../../components/Page";
import "./indexDashboard.css";
import { useParams } from "react-router-dom";
import { separateur } from "src/utils/formatNumber";
import { formatdate } from "src/utils/formatTime";

export default function TableList({ encaissements }) {
  if (!encaissements.length > 1) {
    return <h1>Pas d'encaissements disponibles</h1>;
  }

  return (
    <Page title="Clients | Entreprises" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "20px" }}>
        <div className=" indexDashbord2 col-xs-8 col-sm-8 col-md-8">
          <Table className="table" hover>
            <thead
              style={{
                background: "linear-gradient(60deg, #16222A, #3A6073)",
                color: "white",
              }}
            >
              <tr>
                <th style={{ textAlign: "center" }}>Date du bon</th>
                <th style={{ textAlign: "center" }}>Montant</th>
                <th style={{ textAlign: "center" }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {encaissements &&
                encaissements.map((encaisse, index) =>
                  encaisse.bon ? (
                    <tr
                      key={index}
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {formatdate(encaisse.bon.created_at)}
                      </td>

                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {
                          /* separateur */ encaisse.bon.montant
                            .toFixed(2)
                            .replace(
                              /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                              "$1 "
                            )
                        }{" "}
                        F CFA
                      </td>

                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          textTransform: "uppercase",
                        }}
                      >
                        {encaisse.type}
                      </td>
                    </tr>
                  ) : null
                )}
            </tbody>
          </Table>
        </div>
      </div>
    </Page>
  );
}
