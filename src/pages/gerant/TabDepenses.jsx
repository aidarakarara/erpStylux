import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Page from "../../components/Page";
import api from "src/api/api";

export default function TabDepenses() {
  const [depenses, setDepenses] = useState();

  const fetchData = async (pageNumber = 1) => {
    api
      .get(`api/depenses?page=${pageNumber}`)
      .then((res) => setDepenses(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [caisses, setCaisses] = useState();
  useEffect(() => {
    api.get("api/caisses").then((res) => setCaisses(res.data));
  }, []);
  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour}/${mois}/${d.getFullYear()}`;
  }
  return (
    <Page
      title="Liste des dépenses"
      className="indexDashbord"
      style={{ marginTop: "-40px" }}
    >
      <div className="row justify-content-center" style={{ marginTop: "10px" }}>
        <div className=" indexDashbord2 col-xs-10 col-sm-10 col-md-10">
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
            <span>Liste des dépenses</span>
          </div>{" "}
          <table className="table table-hover table-responsive-lg">
            <thead
              style={{
                background: "linear-gradient(60deg, #66bb6a, #43a047)",
                color: "white",
              }}
            >
              <tr>
                {/*  <th style={{ width: "3%" }} scope="col">
                  #
                </th> */}
                <th style={{ width: "17%", textAlign: "left" }} scope="col">
                  Date
                </th>
                <th style={{ width: "40%", textAlign: "left" }} scope="col">
                  Justificatif
                </th>
                <th style={{ width: "25%", textAlign: "right" }} scope="col">
                  Montant
                </th>
              </tr>
            </thead>
            <tbody>
              {depenses &&
                depenses?.data.map((depense, index) => (
                  <tr key={index} style={{ textAlign: "left" }}>
                    {/*   <th style={{ textAlign: "left" }}>{index + 1}</th> */}
                    <td style={{ textAlign: "left" }}>
                      {formatdate(depense?.created_at)}
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {depense.justificatif}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {depense.montant
                        .toFixed(0)
                        .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfooter>
              <tr colSpan={4}>
                {" "}
                <Pagination
                  style={{ textAlign: "center", justifyContent: "center" }}
                  className="row justify-content-center mt-2"
                  activePage={
                    depenses?.current_page ? depenses?.current_page : 0
                  }
                  itemsCountPerPage={
                    depenses?.per_page ? depenses?.per_page : 0
                  }
                  totalItemsCount={depenses?.total ? depenses?.total : 0}
                  onChange={(pageNumber) => {
                    fetchData(pageNumber);
                  }}
                  pageRangeDisplayed={10}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="Début"
                  lastPageText="Fin"
                />
              </tr>
            </tfooter>
          </table>
        </div>
      </div>
    </Page>
  );
}
