import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "src/api/api";
import Page from "src/components/Page";

export default function EntreeList() {
  const [entrees, setEntrees] = useState(null);
  useEffect(() => {
    api.get("api/entreeMagasin").then((res) => setEntrees(res.data));
  }, []);
  return (
    <Page title="Liste des enntrées" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "10px" }}>
        <div className=" indexDashbord2 col-xs-10 col-sm-10 col-md-10">
          <table
            size="sm"
            className="table table-responsive"
            hover
            style={{ width: "100%" }}
          >
            <thead
              style={{
                background: "linear-gradient(60deg, #66bb6a, #43a047)",
                color: "white",
              }}
            >
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    width: "25%",
                    verticalAlign: "middle",
                  }}
                >
                  N°{" "}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "25%",
                    verticalAlign: "middle",
                  }}
                >
                  Produit
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "50%",
                    verticalAlign: "middle",
                  }}
                >
                  Date d'entrée
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "25%",
                    verticalAlign: "middle",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {entrees &&
                entrees.map((ent, index) => (
                  <tr key={ent.id}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td> nom du produit</td>
                    <td style={{ textAlign: "center" }}>
                      {ent?.date_entree}{" "}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {ent?.qte_entree}{" "}
                    </td>
                  </tr>
                ))}
                
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
