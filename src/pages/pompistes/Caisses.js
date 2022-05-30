import React, { useState, useEffect } from "react";
import "./caisses.css";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import api from "src/api/api";
import Page from "../../components/Page";
import Loader from "src/components/loader";
import Pagination from "react-js-pagination";
import { Button as Bbtn } from "react-bootstrap";
import { Icon, angleDoubleRight, angleDoubleLeft } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function Caisses() {
  const [caisses, setCaisses] = useState(null);

  const fetchData = async (pageNumber = 1) => {
    api
      .get(`api/caisses?page=${pageNumber}`)
      .then((res) => setCaisses(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* useEffect(() => {
    api.get("api/caisses").then((res) => setCaisses(res.data));
  }, []); */
  if (!caisses) {
    return <Loader />;
  }
  return (
    <Page title="Liste des caisses - Pompiste" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "10px" }}>
        <div className=" indexDashbord2 col-xs-10 col-sm-10 col-md-10">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ED1C24, red ,#ED1C24 )",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 60%)",
            }}
          >
            <h2 className="titre">Liste des caisses</h2>
          </div>
          <div
            className=" col-xs-1 col-sm-6 col-md-1 "
            style={{ padding: "1px" }}
          >
            {" "}
          </div>
          <tr style={{ paddingTop: "10px" }}>
            <Table className="table" hover>
              <thead
                style={{
                  background: "linear-gradient(60deg, #ED1C24, red ,#ED1C24 )",
                  color: "white",
                }}
              >
                <tr>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Pompe</th>
                  <th style={{ textAlign: "center" }}>Horaire (H)</th>
                  <th style={{ textAlign: "center" }}>Etats</th>
                </tr>
              </thead>
              <tbody>
                {caisses?.data.map((c) => {
                  return (
                    <tr>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {" "}
                        <Link to={`${c?.id}`}>{c?.date_caisse}</Link>
                      </td>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {c?.pompe_id}
                      </td>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        {c?.horaire}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        {c?.approuve == 1 ? (
                          <span class="badge p-2 bg-success text-light">
                            Approuvé
                          </span>
                        ) : (
                          <span class="badge p-2 bg-warning text-black">
                            Non Approuvé
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </tr>
          <div
            className="row justify-content-center"
            style={{ fontSize: "12px" }}
          >
            <div>
              <Pagination
                activePage={caisses?.current_page ? caisses?.current_page : 0}
                itemsCountPerPage={caisses?.per_page ? caisses?.per_page : 0}
                totalItemsCount={caisses?.total ? caisses?.total : 0}
                onChange={(pageNumber) => {
                  fetchData(pageNumber);
                }}
                pageRangeDisplayed={10}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="Début"
                lastPageText="Fin"
                /*  firstPageText = {angleDoubleLeft} 
               lastPageText = {angleDoubleRight}*/
                // <Icon icon="angleDoubleLeft" style={{ fontSize: '24px' }} />
                
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
