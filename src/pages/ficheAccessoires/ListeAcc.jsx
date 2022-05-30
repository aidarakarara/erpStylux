import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
//import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import ispompiste from "./useIsPompiste";
import { isChefPiste } from "../ficheChefPistes/Syntheses/hooks/useChefPiste";
import Modale from "../../components/Modale";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Page from "../../components/Page";
import { useParams } from "react-router-dom";
import "./indexDashboard.css";
import api from "../../api/api";

export default function TableList() {
  // var today = new Date().toLocaleDateString();
  let { date } = useParams();
  const [dateEnreg, setDateEnreg] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [tabaccs, setTabaccs] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [invalidI, setInvalidI] = useState(false);

  const [pompistes, setPompistes] = useState([]);
  const [account, setAccount] = useState({});
  useEffect(() => {
    api.get("api/user").then((res) => {
      setAccount(res.data);
    });
  }, []);

  const [users, setUsers] = useState(null);
  useEffect(() => {
    api.get("api/users").then((res) => {
      setPompistes(res.data);
      console.log("users", res.data);
    });
    api.get("api/users").then((res) => setUsers(res.data));
    api.get("api/tabaccs").then((res) => setTabaccs(res.data));
    /* api.get("api/lubrifiants").then((res) => setLubrifiants(res.data)); */
  }, []);

  const [accessoires, setAccessoires] = useState([]);

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
    if (
      (dateEnreg == "" && user_id == "") ||
      dateEnreg == null ||
      user_id == null
    ) {
      dateEnreg ? setInvalid(false) : setInvalid(true);
      user_id ? setInvalidI(false) : setInvalidI(true);
      erorMsg();
    } else {
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/tabaccs", { dateEnreg: dateEnreg, user_id: user_id })
          .then((response) => {
            notifier();
            setAccessoires([...tabaccs, response.data]);
          })
          .catch((err) => console.log(err));
      });
      setModalShow(false);
      setDateEnreg(null);
      setUserId(null);
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
    api.get(`api/approuver_ficheA/${id}`).then((respone) => {});
    // window.location.reload();
  }
  return (
    <Page title="Liste des fiches" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "10px" }}>
        <div className=" indexDashbord2 col-xs-8 col-sm-10 col-md-10">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 40%)",
            }}
          >
            <span>Liste des fiches "accessoires"</span>
          </div>{" "}
          {ispompiste() ? null : (
            <Bbtn
              style={{ width: "200px" }}
              variant="secondary"
              onClick={() => showM()}
            >
              Ajouter une fiche
            </Bbtn>
          )}
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
            <table className="table table-responsive-sm table-hover" hover>
              <thead
                style={{
                  background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
                  color: "white",
                }}
              >
                <tr>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Date
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Pompiste
                  </th>

                  <th scope="col" style={{ textAlign: "center" }}>
                    Etat
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabaccs &&
                  tabaccs.map((tabacc) => (
                    <tr key={tabacc.id} className="text-center">
                      {tabacc && tabacc.user_id == account.id ? (
                        <>
                          <Link to={`${tabacc.dateEnreg}/ficheAccessoires`}>
                            <td scope="col" style={{ textAlign: "center" }}>
                              {formatdate(tabacc.dateEnreg)}
                            </td>
                          </Link>
                          <td>
                            {" "}
                            <span className="badge">
                              <u>{account.name}</u>
                            </span>
                          </td>
                          <td>
                            {tabacc?.approuve == 0 ? (
                              <button
                                onClick={() => approuver(tabacc?.id)}
                                className="btn btn-warning text-center text-ligh btn-sm"
                                style={{ borderRadius: "5px" }}
                                disabled={isChefPiste() ? false : true}
                              >
                                Désapprouvée
                              </button>
                            ) : (
                              <button
                                onClick={() => approuver(tabacc?.id)}
                                className="btn btn-success text-center  text-ligh btn-sm"
                                style={{ borderRadius: "5px" }}
                                disabled={isChefPiste() ? false : true}
                              >
                                {" "}
                                Approuvée
                              </button>
                            )}
                          </td>
                        </>
                      ) : null}
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
                onChange={(e) => setDateEnreg(e.target.value)}
              />
            </div>
            <div className="col">
              <label>Pompiste</label>
              <select
                className={`form-control ${invalidI ? "is-invalid" : ""}`}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option selected>- - -</option>
                {pompistes &&
                  pompistes.map((pompiste) => {
                    if (pompiste.role_id == 1)
                      return (
                        <option value={pompiste.id} key={pompiste.id}>
                          {pompiste.name}
                        </option>
                      );
                  })}
              </select>
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
