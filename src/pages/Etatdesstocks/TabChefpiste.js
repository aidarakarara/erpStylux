import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
//import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import isGerant from "./useIsGerant";
import isApprouve from "./useIsApprouve";
import Modale from "../../components/Modale";
import Loader from "src/components/loader";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Page from "../../components/Page";
import { useParams } from "react-router-dom";
import "./indexDashboard.css";
import api from "../../api/api";
import { isChefPiste } from "../ficheChefPistes/Syntheses/hooks/useChefPiste";

export default function TableList() {
  // var today = new Date().toLocaleDateString();
  let { date } = useParams();
  const [date_inv, setDateInv] = useState(null);
  const [tabinventaires, setTabinventaires] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [invalidI, setInvalidI] = useState(false);

  useEffect(() => {
    api.get("api/tabinventaires").then((res) => setTabinventaires(res.data));
  }, []);

  //ajouter une fiche
  function notifier() {
    toast.success("Sauvegarde fiche réussie", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const erorMsg = () =>
    toast.error("Vous devez renseigner les champs", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const addfiche = async () => {
    if (date_inv == "" || date_inv == null) {
      date_inv ? setInvalid(false) : setInvalid(true);
      erorMsg();
    } else {
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/tabinventaires", {
            date_inv: date_inv,
          })
          .then((response) => {
            notifier();
            setTabinventaires([...tabinventaires, response.data]);
          })
          .catch((err) => console.log(err));
      });
      setModalShow(false);
      setDateInv(null);
      setInvalid(false);
    }
    //console.log();
  };
  function showM() {
    setModalShow(true);
  }
  //fin fiche

  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour} - ${mois} - ${d.getFullYear()}`;
  }

  function approuver(id) {
    api.get(`api/approuver_stock/${id}`).then((respone) => {});
    // window.location.reload();
  }

  return (
    <Page title="Liste des fiches" className="indexDashbord">
      <div
        className="row justify-content-center  clients"
        style={{ marginTop: "10px" }}
      >
        <div className=" indexDashbord2 col-xs-8 col-sm-10 col-md-10">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #5d5357, #2c2e20)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(108 120 132 / 40%)",
            }}
          >
            <span>Tableau des inventaires</span>
          </div>{" "}
          {isGerant() ? (
            <Bbtn
              style={{ width: "200px" }}
              variant="secondary"
              onClick={() => showM()}
            >
              Ajouter une fiche
            </Bbtn>
          ) : null}
          <div
            className=" col-xs-1 col-sm-6 col-md-1 "
            style={{ padding: "1px" }}
          >
            {" "}
          </div>
          <tr style={{ paddingTop: "10px" }}>
            {" "}
            <ToastContainer
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
            <table className="table table-responsive-lg table-hover" hover>
              <thead
                style={{
                  background: "linear-gradient(60deg, #5d5357, #2c2e20)",
                  color: "white",
                }}
              >
                <tr>
                  <th scope="col" style={{ textAlign: "center" }}>
                    #
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Date inventaire
                  </th>
                  <th scope="col" style={{ textAlign: "left", width: "20%" }}>
                    Etat
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabinventaires &&
                  tabinventaires.map((tabinv) => (
                    <tr key={tabinv.id} className="text-center">
                      <Link to={`${tabinv.date_inv}/ficheEtat`}>
                        <td>##{tabinv.id}</td>
                      </Link>
                      <td scope="col" style={{ textAlign: "center" }}>
                        {formatdate(tabinv.date_inv)}
                      </td>
                      <td style={{ textAlign: "left", width: "20%" }}>
                        {tabinv.approuve == 1 ? (
                          <span class="badge p-2 rounded-pill bg-success text-light">
                            Approuvé
                          </span>
                        ) : (
                          <span class="badge p-2 rounded-pill bg-warning text-black">
                            Non Approuvé
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </tr>
        </div>
      </div>

      <Modale
        titre="Fiche de Lubrifiants"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Body>
          <div className="row">
            <div className="col">
              <label>Date d'enregistrement</label>
              <input
                type="date"
                className="form-control"
                placeholder="Date d'enregistrement"
                aria-label="Date d'enregistrement"
                onChange={(e) => setDateInv(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Bbtn variant="success" onClick={addfiche}>
            Sauvegarder
          </Bbtn>
        </Modal.Footer>
      </Modale>
    </Page>
  );
}
