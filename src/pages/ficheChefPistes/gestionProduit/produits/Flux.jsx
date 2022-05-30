import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import moins from "@iconify-icons/mdi/minus";
import plus from "@iconify-icons/mdi/plus";
import ModaleAddEntree from "src/pages/ficheChefPistes/gestionProduit/produits/modales/modaleAddEntree";
import ModaleAddSortie from "src/pages/ficheChefPistes/gestionProduit/produits/modales/modaleAddSortie";
import api from "src/api/api";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "src/components/loader";

export default function Flux() {
  const [produits, setProduits] = useState(null);
  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showModalAddEntree, setShowModalAddEntree] = useState(false);
  const [showModalAddSortie, setShowModalAddSortie] = useState(false);
  const [selectProduit, setSelectProduit] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [produitsFiltre, setProduitsFiltre] = useState([]);

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

  function handleSelectProduit(data) {
    setSelectProduit(data);
    setShowModalAddSortie(true);
  }
  function handleSelectProduitEntree(data) {
    setSelectProduit(data);
    setShowModalAddEntree(true);
  }
  function search(term = "") {
    api.get(`api/produits?search=${term}`).then((res) => {
      setProduitsFiltre(res.data.data);
      setProduits(res.data);
    });
  }
  useEffect(() => {
    fetchData();
    api.get("api/categories").then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="lub">
      <h2 className="titre-dash mt-3">Liste des Produits</h2>
      <div className="row my-3">
        <div className="col-8">
          <button
            className="btn btn-outline-secondary mx-1 youtube"
            onClick={() => handleCherche("tous")}
          >
            Tous
          </button>
          {categories &&
            categories.map((categorie, index) => (
              <button
                key={index}
                className="btn btn-outline-secondary mx-1 youtube"
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

      <table className="table table-hover table-responsive-lg table-bordered monTableau">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "left" }}>Nom produit</th>
           {/*  <th>Qtes Initiales</th> */}
            <th>Qtes Entrées</th>
            <th>Qtes Sorties</th>
            <th>Qte disponible</th>
            <th>Action</th>
          </tr>
        </thead>
        {loading ? (
          <tr>
            <td colSpan={6}>
              <Loader />
            </td>
          </tr>
        ) : (
          <tbody>
            {produitsFiltre &&
              produitsFiltre.map((produit) => (
                <tr key={produit.id}>
                  <td style={{ textAlign: "left" }}>{produit?.nom}</td>
                {/*   <td>-</td> */}
                  <td>
                    {produit?.entres_m_sum_quantite
                      ? produit?.entres_m_sum_quantite
                      : 0}
                  </td>
                  <td>
                    {produit?.sorties_m_sum_quantite
                      ? produit?.sorties_m_sum_quantite
                      : 0}
                  </td>
                  <td>
                    {produit?.qte_initiale + produit?.entres_m_sum_quantite -
                      produit?.sorties_m_sum_quantite}
                  </td>
                  <td className="py-1">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleSelectProduitEntree(produit)}
                    >
                      <Icon icon={plus} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-info ml-1"
                      onClick={() => handleSelectProduit(produit)}
                    >
                      <Icon icon={moins} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
      <div className="row justify-content-center">
        <table>
          <div>
            <Pagination
              activePage={produits?.current_page ? produits?.current_page : 0}
              itemsCountPerPage={produits?.per_page ? produits?.per_page : 0}
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
      <ModaleAddEntree
        show={showModalAddEntree}
        produit={selectProduit && selectProduit}
        onHide={() => setShowModalAddEntree(false)}
      />
      <ModaleAddSortie
        show={showModalAddSortie}
        produit={selectProduit && selectProduit}
        onHide={() => setShowModalAddSortie(false)}
      />
    </div>
  );
}
