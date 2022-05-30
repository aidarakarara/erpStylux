import React, { useState, useEffect } from "react";
import { formatdate } from "src/utils/formatTime";
import Pagination from "react-js-pagination";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import api from "src/api/api";
import ModaleAddEntree from "../modales/modaleAddEntree";
import Loader from "src/components/loader";

function Entrees({ produit, entree, ...props }) {
  const [entrees, setEntrees] = useState(null);
  const [loading, setloading] = useState(false);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [showModalAddEntree, setShowModalAddEntree] = useState(false);
  const [selectEntree, setSelectEntree] = useState(null);

  const fetchData = async (pageNumber = 1) => {
    setloading(true);
    api.get(`api/entres_m?page=${pageNumber}`).then((res) => {
      setEntrees(res.data);
      setloading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  function handleSelectEntree(data) {
    setSelectEntree(data);
    setShowModalAddEntree(true);
  }

  //notification
  const notifier = (data = "Ajout d'une entrée réussie !") =>
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
    toast.error("Veuillez renseigner le champ !", {
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
  const deleteEntree = () => {
    api.get("sanctum/csrf-cookie").then((response) => {
      api
        .delete(`api/entres_m/${id}`)
        .then((response) => {
          notifier("Suppression de l'entrée réussie !");
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
      <table class="table table-hover table-bordered">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th scope="col" style={{ textAlign: "left" }}>
              #
            </th>
            <th scope="col" style={{ textAlign: "left" }}>
              Produits 
            </th>
            <th scope="col">Quantité</th>
            <th scope="col">Prix (FCFA)</th>
            <th scope="col">Date d'entrée </th>
            <th> Action</th>
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
            {entrees &&
              entrees?.data.map((entree, index) => (
                <tr key={entrees?.id} style={{ textAlign: "center" }}>
                  <th style={{ textAlign: "left" }}>{index + 1}</th>
                  <td style={{ textAlign: "left" }}>{entree?.produit?.nom}</td>
                  <td>{entree.quantite}</td>
                  <td>{entree.prix}</td>
                  <td>{formatdate(entree.date_entre)}</td>
                  <td className="py-1">
                    <button
                      type="button"
                      className="btn btn-warning updateBtn"
                      onClick={() => handleSelectEntree(entree)}
                    >
                      <Icon icon={pencilIcon} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ml-1 delBtn"
                      onClick={() => handleShow(entree.id)}
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
              activePage={entrees?.current_page ? entrees?.current_page : 0}
              itemsCountPerPage={entrees?.per_page ? entrees?.per_page : 0}
              totalItemsCount={entrees?.total ? entrees?.total : 0}
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
        entree={selectEntree}
        show={showModalAddEntree}
        modifier={true}
        onHide={() => setShowModalAddEntree(false)}
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
          <Button variant="danger" onClick={() => deleteEntree()}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Entrees;
