import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "src/api/api";
import Page from "src/components/Page";

export default function SortieList() {
  const [entreeMagasins, setEntreeMagasins] = useState([]);
  useEffect(() => {
    api.get("api/entreeMagasin").then((res) => setEntreeMagasins(res.data));
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
                  Date de sortie
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
            <tbody>test</tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
