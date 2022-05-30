import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { formatdate } from "src/utils/formatTime";
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import Pagination from "react-js-pagination";
import { Button, Modal } from "react-bootstrap";
import api from "src/api/api";
import ModaleAddSortie from "../modales/modaleAddSortie";
import Loader from "src/components/loader";

function Sorties({ produit, sortie, ...props }) {
  const [sorties, setSorties] = useState(null);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [showModalAddSortie, setShowModalAddSortie] = useState(false);
  const [selectSortie, setSelectSortie] = useState(null);
  const [loading, setloading] = useState(false);
  const fetchData = async (pageNumber = 1) => {
    setloading(true);
    api.get(`api/sorties_m?page=${pageNumber}`).then((res) => {
      setSorties(res.data);
      setloading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  function handleSelectSortie(data) {
    setSelectSortie(data);
    setShowModalAddSortie(true);
  }

  //notification
  const notifier = (data = "Ajout d'une sortie réussie !!!") =>
    toast.success(data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const erorMsg = () =>
    toast.error("Veuillez renseigner le champ !!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //fin notification

  //supprimer
  const deleteSortie = () => {
    api.get("sanctum/csrf-cookie").then((response) => {
      api
        .delete(`api/sorties_m/${id}`)
        .then((response) => {
          notifier("Sortie supprimée !");
        })
        .catch((err) => console.log(err));
    });
    handleClose();
  };

  const handleClose = () => setShow(false);
  function handleShow(data) {
    setId(data);
    setShow(true);
  }
  //fin supprimer

  return (
    <div>
      <ToastContainer
        style={{ marginTop: "40px" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <table class="table table-hover table-responsive-lg table-bordered">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th scope="col" style={{ textAlign: "left" }}>
              #
            </th>
            <th scope="col" style={{ textAlign: "left" }}>
              Produit
            </th>
            <th scope="col">Quantité</th>
            <th scope="col">Prix (FCFA)</th>
            <th scope="col">Date de sortie</th>
            <th scope="col">Action</th>
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
            {sorties &&
              sorties?.data.map((sortie, index) => (
                <tr key={sorties?.id} style={{ textAlign: "center" }}>
                  <th style={{ textAlign: "left" }}>{index + 1}</th>
                  <td style={{ textAlign: "left" }}>{sortie?.produit?.nom}</td>
                  <td>{sortie.quantite}</td>
                  <td>{sortie.prix}</td>
                  <td>{formatdate(sortie.date_sortie)}</td>
                  <td className="py-1">
                    <button
                      type="button"
                      className="btn btn-warning updateBtn"
                      onClick={() => handleSelectSortie(sortie)}
                    >
                      <Icon icon={pencilIcon} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ml-1 delBtn"
                      onClick={() => handleShow(sortie.id)}
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
              activePage={sorties?.current_page ? sorties?.current_page : 0}
              itemsCountPerPage={sorties?.per_page ? sorties?.per_page : 0}
              totalItemsCount={sorties?.total ? sorties?.total : 0}
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
      <ModaleAddSortie
        sortie={selectSortie}
        show={showModalAddSortie}
        modifier={true}
        onHide={() => setShowModalAddSortie(false)}
      />
      <Modal
        style={{ margin: "50px" }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment effectuer ses changements ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => handleClose()}>
            Non
          </Button>
          <Button variant="danger" onClick={() => deleteSortie()}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sorties;
