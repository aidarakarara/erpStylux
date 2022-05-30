import React, { useState, useEffect } from "react";
import Cartes from "./partials/cartes";
import api from "src/api/api";
import Pagination from "react-js-pagination";
import Loader from "src/components/loader";
import ModaleAddInventaire from "../inventaire/modaleAddInventaire";

const MesCartes = [
  {
    total: 49,
    titre: "total produits",
    details: [1, 2, 500],
  },
  {
    total: 23,
    titre: "Entrees",
    details: [1, 2, 500],
  },
  {
    total: 26,
    titre: "Sortie",
    details: [1, 2, 500],
  },
  {
    total: 26,
    titre: "Sortie",
    details: [1, 2, 500],
  },
];
export default function Inventaire() {
  const [produits, setProduits] = useState(null);
  const [entrees, setEntrees] = useState(null);
  const [categories, setCategories] = useState([]);
  const [produitsFiltre, setProduitsFiltre] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [showModalAddInventaire, setShowModalAddInventaire] = useState(false);

  function search(term = "") {
    const delayDebounceFn = setTimeout(() => {
      setloading(true);
      api.get(`api/produits?search=${term}`).then((res) => {
        setProduitsFiltre(res.data.data);
        setProduits(res.data);
        clearTimeout(delayDebounceFn);
        setloading(false);
      });
    }, 3000);
  }

  function handleCherche(term = null) {
    if (term === "tous") {
      setProduitsFiltre(produits.data);
    } else {
      setProduitsFiltre(
        produits.data.filter((produit) => produit?.categorie_id === term)
      );
    }
  }

  const fetchData = async (pageNumber = 1) => {
    setloading(true);
    api.get(`api/produits?page=${pageNumber}`).then((res) => {
      setProduitsFiltre(res.data.data);
      setProduits(res.data);
      setloading(false);
    });
  };

  useEffect(() => {
    fetchData();
    api.get("api/categories").then((res) => setCategories(res.data));
  }, []);
  // useEffect(() => {
  //   fetchData();
  //   api.get("api/entres_m").then((res) => setEntrees(res.data));
  // }, []);

  return (
    <div className=" indexDashbord mr-3" style={{ marginTop: "-60px" }}>
      <div className="container-fluid m-2 card content-center">
        <h2
          className="titre-dash "
          style={{
            textAlign: "center",
            fontSize: "25px",
            letterSpacing: "20px",
          }}
        >
          Etat des stocks
        </h2>
        <button
          className="btn btn-primary center"
          style={{
            textAlign: "center",
            fontSize: "25px",
            justifyContent: "center",
          }}
          onClick={() => setShowModalAddInventaire(true)}
        >
          Faire un inventaire
        </button>

        <div>
          <div className="row my-3">
            <div className="col-8">
              <button
                class="btn btn-outline-secondary youtube"
                onClick={() => handleCherche("tous")}
              >
                Tous
              </button>
              {categories &&
                categories.map((categorie, index) => (
                  <button
                    key={index}
                    class="btn btn-outline-secondary mx-2 youtube"
                    onClick={() => handleCherche(categorie?.id)}
                  >
                    {categorie?.nom}
                  </button>
                ))}
            </div>
            <div className="input-group col-4 justify-content-end">
              <div className="form-outline">
                <input
                  type="search"
                  className="form-control"
                  placeholder="search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    search(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <table className="table table-responsive-lg table-hover table-bordered monTableau">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th rowSpan={1} style={{ textAlign: "left", width: "20%" }}>
                  Nom produit
                </th>
                <th colSpan={3}>STOCK INITIAL</th>
                <th colSpan={3}>ENTREES</th>
                <th colSpan={3}>SORTIES</th>
                <th colSpan={2}>STOCK FINAL</th>
                <th colSpan={2}>STOCK REEL</th>
                <th colSpan={1}>Difference inventaire</th>
              </tr>
            </thead>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Nom produit</th>
                {/*Stock initial*/}
                <th>Qte</th>
                <th>PU</th>
                <th>Montant</th>
                {/*Entrees*/}
                <th>Qte</th>
                <th>PU</th>
                <th>Montant</th>
                {/*Sorties*/}
                <th>Qte</th>
                <th>PU</th>
                <th>Montant</th>
                {/*Stock final*/}
                <th>Qte</th>
                <th>Montant</th>
                {/*Stock reel*/}
                <th>Qte</th>
                <th>Montant</th>
                {/*Dif inv*/}
                <th>Dif inv</th>
              </tr>
            </thead>
            {loading ? (
              <tr>
                <td colSpan={14}>
                  <Loader />
                </td>
              </tr>
            ) : (
              <tbody>
                {produitsFiltre &&
                  produitsFiltre.map((produit) => (
                    <tr key={produit.id}>
                      <td style={{ textAlign: "left" }}>{produit?.nom}</td>
                      {/*Stock initial*/}
                      <td>{produit?.qte_initiale}</td>
                      <td>{produit?.pu}</td>
                      <td>{produit?.qte_initiale * produit?.pu}</td>
                      {/*Entrees*/}
                      <td>
                        {produit?.entres_m_sum_quantite
                          ? produit?.entres_m_sum_quantite
                          : 0}
                      </td>
                      <td>#####</td>
                      <td>-</td>

                      {/*Sorties*/}
                      <td>
                        {produit?.sorties_m_sum_quantite
                          ? produit?.sorties_m_sum_quantite
                          : 0}
                      </td>
                      <td>{produit?.pu}</td>
                      <td>{produit?.sorties_m_sum_quantite * produit?.pu}</td>
                      {/*Stock final*/}
                      <td>
                        {" "}
                        {produit.qte_initiale +
                          produit.entres_m_sum_quantite -
                          produit.sorties_m_sum_quantite}
                      </td>
                      <td>-</td>
                      {/*Stock reel*/}
                      <td>{produit?.inventaires_sum_qte_reelle}</td>
                      <td>
                        {produit?.inventaires_sum_qte_reelle * produit?.pu}
                      </td>

                      {/*Dif inv*/}
                      <td>-</td>
                      {/*action*/}
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
          <div className="row justify-content-center">
            <table>
              <div>
                <Pagination
                  activePage={
                    produits?.current_page ? produits?.current_page : 0
                  }
                  itemsCountPerPage={
                    produits?.per_page ? produits?.per_page : 0
                  }
                  totalItemsCount={produits?.total ? produits?.total : 0}
                  onChange={(pageNumber) => {
                    fetchData(pageNumber);
                  }}
                  pageRangeDisplayed={10}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="Début"
                  lastPageText="Fin"
                />
              </div>
            </table>
          </div>
        </div>
      </div>
      <ModaleAddInventaire
        show={showModalAddInventaire}
        onHide={() => {
          setShowModalAddInventaire(false);
        }}
      />
    </div>
  );
}
