import React, { useState, useEffect } from "react";
import "./index.css";
import { Tabs, Tab } from "react-bootstrap";
import TableBord from "./table_bord/tableBord";
import Produits from "./produits/Produits";
import Flux from "./produits/Flux";
import ModaleAddProduct from "./produits/modales/modaleAddProduct";
import ModaleAddCategorie from "./produits/modales/modaleAddCategorie";
import ListeSortie from "./produits/listesES/Sorties";
import ListeEntree from "./produits/listesES/Entrees";
import Inventaire from './inventaire/index'
import api from "src/api/api";

export default function GestionProduit() {
  //produit dispo
  const [categories, setCategories] = useState([]);
  const [showProdM, setShowprodM] = useState(false);
  const [component, setComponent] = useState("bord");
  useEffect(() => {
    api.get("api/categories").then((res) => setCategories(res.data));
  }, []);
  //fin produit dispo

  const [showModalAddProduct, setShowModalAddProduct] = useState(false);
  const [showModalAddCategorie, setShowModaleAddCategorie] = useState(false);
  return (
    <div className="container-fluid" style={{ marginTop: "-60px" }}>
      <div className="card">
        <div className="card-body">
          <div className="row d-flex justify-content-between px-3">
            <div className="col-m-6">
              <h2 className="titre-dash"> Gestion de Stock </h2>
            </div>
            <div className="col-m-6">
              <button
                className="btn btn-primary monBtnCat "
                onClick={() => setShowModaleAddCategorie(true)}
              >
                + Ajouter une catégorie
              </button>
              <button
                className="btn btn-primary monBtn ml-2"
                onClick={() => {
                  setShowModalAddProduct(true);
                  setShowprodM(true);
                }}
              >
                + Ajouter un Produit
              </button>
            </div>
          </div>
          <div className="row py-5">
            <div className="col-12 col-sm-12 col-md-8">
              <h2 className="titre-dash">
                15 005 550
                <sup>
                  {" "}
                  <small className="lead">F CFA</small>{" "}
                </sup>
              </h2>
              <h6 className="text-success enEvidence">
                +10 000 000 (+5,10 %){" "}
              </h6>
              <Tabs defaultActiveKey="bord" className="my-4 tabP">
                <Tab
                  eventKey="bord"
                  title="Tableau de bord"
                  onEntered={() => setComponent("bord")}
                >
                  {component === "bord" ? <TableBord /> : null}
                </Tab>
                <Tab
                  eventKey="produits"
                  title="Produits"
                  onEntered={() => setComponent("produits")}
                >
                  {component === "produits" ? <Produits /> : null}
                </Tab>
                <Tab
                  eventKey="flux"
                  title="Flux magasin"
                  onEntered={() => setComponent("flux")}
                >
                  {component === "flux" ? <Flux /> : null}
                </Tab>
                <Tab
                  eventKey="entrees"
                  title="Entrées"
                  onEntered={() => setComponent("entrees")}
                >
                  {component === "entrees" ? <ListeEntree /> : null}
                </Tab>
                <Tab
                  eventKey="sorties"
                  title="Sorties"
                  onEntered={() => setComponent("sorties")}
                >
                  {component === "sorties" ? <ListeSortie /> : null}
                </Tab>
                {/* <Tab
                  eventKey="inventaires"
                  title="Inventaires"
                  onEntered={() => setComponent("inventaires")}
                >
                  {component === "inventaires" ? <Inventaire /> : null}
                </Tab> */}
              </Tabs>
            </div>
            <div className="col-12 col-sm-12 col-md-4">
              {/* premier card */}
              <div className="card maCard">
                <div className="card-header monHeader">
                  <h3 className="titre-dash">Produits Disponibles </h3>
                </div>
                <div className="card-body">
                  <table className=" table-produit table table-borderless table-hover">
                    <thead>
                      <tr>
                        <th>Catégories </th>
                        <td style={{ fontWeight: "bold" }}> Quantités </td>
                      </tr>
                    </thead>
                    <tbody>
                      {categories &&
                        categories.map((cat) => (
                          <tr key={cat.id}>
                            <th
                              style={{
                                fontWeight: "normal",
                                textTransform: "capitalize",
                              }}
                            >
                              {" "}
                              {cat?.nom}{" "}
                            </th>
                            <td>
                              {" "}
                              {cat?.produits_sum_qte_theorique
                                ? cat?.produits_sum_qte_theorique
                                : 0}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* fin premier */}
              <div className="card mt-5 maCard">
                <div className="card-header monHeader">
                  <h3 className="titre-dash">
                    Sortie Récente
                    <small className="text-success enEvidence">
                      {" "}
                      (unitée)
                    </small>{" "}
                  </h3>
                </div>
                <div className="card-body">
                  <table className=" table-produit table table-borderless table-hover">
                    <tbody>
                      <tr>
                        <th>H152X </th>
                        <td> 500 </td>
                      </tr>
                      <tr>
                        <th>H452 </th>
                        <td> 200</td>
                      </tr>
                      <tr>
                        <th>HGP</th>
                        <td> 4000 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer monHeader">
                  <button className="btn btn-primary btn-block monBtn ">
                    VOIR PLUS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showProdM && (
        <ModaleAddProduct
          show={showModalAddProduct}
          onHide={() => {
            setShowModalAddProduct(false);
            setShowprodM(false);
          }}
        />
      )}
      <ModaleAddCategorie
        show={showModalAddCategorie}
        onHide={() => setShowModaleAddCategorie(false)}
      />
    </div>
  );
}
