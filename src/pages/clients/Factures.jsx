import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import { Button as Bbtn } from "react-bootstrap";
import Page from "../../components/Page";
import "./indexDashboard.css";
export default function TableList() {
  return (
    <Page title="Clients | Entreprises" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "20px" }}>
        <div className=" indexDashbord2 col-xs-10 col-sm-10 col-md-10">
          <Table className="table" hover>
            <thead
              style={{
                background: "linear-gradient(60deg, #02AAB0, #00CDAC )",
                color: "white",
              }}
            >
              <tr>
                <th style={{ textAlign: "center" }}>N°</th>
                <th style={{ textAlign: "center" }}>Montant</th>
                <th style={{ textAlign: "center" }}>Etat</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  005
                </td>

                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  150 000Fcfa
                </td>

                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  payé/impayé
                </td>

                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  1/2/3
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Page>
  );
}
