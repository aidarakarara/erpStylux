import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import ModaleAddProduct from "./modales/modaleAddProduct";
import api from "src/api/api";
import Pagination from "react-js-pagination";
import Loader from "src/components/loader";

export default function Produits() {
  const [produits, setProduits] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showModalAddProduct, setShowModalAddProduct] = useState(false);
  const [selectProduit, setSelectProduit] = useState(null);
  const [produitsFiltre, setProduitsFiltre] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

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

  function handleSelectProduit(data) {
    setSelectProduit(data);
    setShowModalAddProduct(true);
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

      <table
        className="table table-hover table-responsive-lg table-bordered monTableau"
        size="sm-12"
      >
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "left" }}>Nom produit</th>
            <th>Prix unitaire</th>
            <th>Qte initiale</th>
            <th>Qte disponible</th>
            <th>Action</th>
            {/*  <th>Flux</th>*/}
          </tr>
        </thead>
        {loading ? (
          <tr>
            <td colSpan={4}>
              <Loader />
            </td>
          </tr>
        ) : (
          <tbody>
            {produitsFiltre &&
              produitsFiltre.map((produit) => (
                <tr key={produit.id}>
                  <td style={{ textAlign: "left" }}>{produit?.nom}</td>
                  <td>{produit?.pu}</td>
                  <td>{produit?.qte_initiale}</td>
                  <td>
                    {produit?.qte_initiale + produit?.entres_m_sum_quantite -
                      produit?.sorties_m_sum_quantite}
                  </td>
                  {/*  <td className="py-1">
                  <button
                    type="button"
                    className="btn btn-warning"
                  >
                    <Icon icon={plus} />
                  </button>
                  <button type="button" className="btn btn-danger ml-1">
                    <Icon icon={moins} />
                  </button>
                </td>*/}
                  <td className="py-1">
                    <button
                      type="button"
                      className="btn btn-warning updateBtn"
                      onClick={() => handleSelectProduit(produit)}
                    >
                      <Icon icon={pencilIcon} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ml-1 delBtn"
                    >
                      <Icon icon={deleteIcon} />
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
      <ModaleAddProduct
        produit={selectProduit}
        show={showModalAddProduct}
        onHide={() => setShowModalAddProduct(false)}
      />
    </div>
  );
}
