import React, { useState } from "react";
import "./indexDashboard.css";
import Pagination from "react-js-pagination";

//import { Icon, InlineIcon } from '@iconify/react';

import { Button as Bbtn } from "react-bootstrap";
import Page from "../../components/Page";
import { Link } from "react-router-dom";
export default function TableList({ showM, clients, fetchData }) {
  return (
    <Page title="Liste des clients/Entreprise" className="indexDashbord">
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
            <span>Liste des clients</span>
          </div>{" "}
          <Bbtn
            style={{ width: "200px", marginBottom: "10px" }}
            variant="secondary"
            onClick={() => showM()}
          >
            Ajouter un client
          </Bbtn>
          <table size="sm" className="table table-responsive-lg" hover>
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
                    verticalAlign: "middle",
                  }}
                >
                  Nom Client
                </th>
                <th
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Téléphone
                </th>
                <th
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    textAlign: "center",

                    verticalAlign: "middle",
                  }}
                >
                  Adresse
                </th>

                {/* <th style={{ textAlign: "center" }}>Action</th>*/}
              </tr>
            </thead>
            <tbody>
              {clients &&
                clients?.data.map((client, id) => (
                  <tr
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                    key={id}
                  >
                    <Link to={`${client.id}`}>
                      <td>{client.nom}</td>
                    </Link>

                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {client.telephone}
                    </td>

                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {client.email}
                    </td>

                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {client.adresse}
                    </td>
                  </tr>
                ))}
                
            </tbody>
            <tfooter>
              <tr colSpan={4} className="row justify-content-center mt-1">
                {" "}
                <Pagination
                  activePage={clients?.current_page ? clients?.current_page : 0}
                  itemsCountPerPage={clients?.per_page ? clients?.per_page : 0}
                  totalItemsCount={clients?.total ? clients?.total : 0}
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
              </tr>
            </tfooter>
          </table>
        </div>
      </div>
    </Page>
  );
}
