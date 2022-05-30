import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Page from "../../components/Page";
import { Button as Bbtn } from "react-bootstrap";
import { formatdate } from "src/utils/formatTime";
import { separateur } from "src/utils/formatNumber";
import "./indexDashboard.css";
export default function TableList({ bons }) {
  return (
    <Page title="Clients | Entreprises" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "20px" }}>
        <div className=" indexDashbord2 col-xs-8 col-sm-8 col-md-8">
          <Table className="table" hover>
            <thead
              style={{
                background: "linear-gradient(60deg,  #1A2980, #1765d5 )",
                color: "white",
              }}
            >
              <tr>
                <th style={{ textAlign: "center" }}>Date du Bon</th>
                <th style={{ textAlign: "right" }}>Montant</th>
              </tr>
            </thead>
            <tbody>
              {bons.map((bon, index) =>
                !bon.encaissement_id ? (
                  <tr
                    key={index}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {formatdate(bon?.created_at)}
                    </td>

                    <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                      {
                        /* separateur */ bon.montant
                          .toFixed(2)
                          .replace(
                            /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                            "$1 "
                          )
                      } 
                      F CFA
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
