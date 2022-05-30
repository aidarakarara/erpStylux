import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "src/api/api";
import Page from "src/components/Page";

export default function PompistesList() {
  const [pompistes, setPompistes] = useState([]);
  useEffect(() => {
    api.get("api/all-pompistes").then((res) => setPompistes(res.data));
  }, []);
  return (
    <Page title="Liste des Pompistes" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "10px" }}>
        <div className=" indexDashbord2 col-xs-8 col-sm-8 col-md-8">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #66bb6a, #43a047)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 60%",
            }}
          >
            <span>Liste des pompistes</span>
          </div>{" "}
          <table className="table table-hover table-responsive-lg">
            <thead
              style={{
                background: "linear-gradient(60deg, #66bb6a, #43a047)",
                color: "white",
              }}
            >
              <tr>
                <th style={{ width: "17%", textAlign: "left" }} scope="col">
                  #
                </th>
                <th style={{ width: "17%", textAlign: "left" }} scope="col">
                  Nom
                </th>
                <th style={{ width: "40%", textAlign: "left" }} scope="col">
                  Téléphone
                </th>
                <th style={{ width: "25%", textAlign: "left" }} scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pompistes &&
                pompistes.map((pompiste, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "left" }}>{index + 1}</td>
                    <td style={{ textAlign: "left" }}>{pompiste?.name} </td>
                    <td style={{ textAlign: "left" }}>{pompiste?.email} </td>
                    <td style={{ textAlign: "left" }}>
                      <Link to={`${pompiste?.id}`}>
                        <button className="btn btn-info">voir</button>
                      </Link>
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
