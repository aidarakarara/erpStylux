import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
//import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import ispompiste from "./useIsPompiste";
import isApprouve from "./useIsApprouve";
import Modale from "../../components/Modale";
import Loader from "src/components/loader";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Page from "../../components/Page";
import { useParams } from "react-router-dom";
import "./indexDashboard.css";
import api from "../../api/api";
import { isChefPiste } from "../ficheChefPistes/Syntheses/hooks/useChefPiste";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";

export default function TableList() {
  // var today = new Date().toLocaleDateString();
  let { date } = useParams();
  const [dateEnreg, setDateEnreg] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [tablubs, setTablubs] = useState(null);
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
    api.get("api/tablubs").then((res) => setTablubs(res.data));
    /* api.get("api/tablubs").then((res) => setTablubs(res.data)); */
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
          .post("api/tablubs", { dateEnreg: dateEnreg, user_id: user_id })
          .then((response) => {
            notifier();
            setTablubs([...tablubs, response.data]);
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
    api.get(`api/approuver_fiche/${id}`).then((respone) => {});
    // window.location.reload();
  }

  //supprimer une ligne
  function deleteLine(ligne_id, tablub) {
    if (!tablub.id) {
      setTablubs(tablubs.filter((_, index) => index != ligne_id));
    } else {
      api.delete(`api/tablubs/${tablub.id}`).then((res) => {
        setTablubs(tablubs.filter((_, index) => index != ligne_id));
      });
    }
    handleClose();
    suppr(true);
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [id, setId] = useState(null);
  const [tablub, setTablub] = useState(null);
  function handleShow(i, d) {
    setTablub(d);
    setId(i);
    setShow(true);
  }
  function suppr() {
    toast.warning("Fait !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <Page title="Liste des fiches" className="indexDashbord">
      <div className="row justify-content-center" style={{ marginTop: "10px" }}>
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
            <span>Liste des fiches "Lubrifiants"</span>
          </div>{" "}
          {ispompiste() ? null : (
            <Button
              style={{ width: "200px" }}
              variant="secondary"
              onClick={() => showM()}
            >
              Ajouter une fiche
            </Button>
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
              style={{ marginTop: "60px" }}
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
                  background: "linear-gradient(60deg, #5d5357, #2c2e20)",
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
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tablubs &&
                  tablubs.map((tablub, index) => (
                    <tr key={tablub.id} className="text-center">
                      <Link to={`${tablub.dateEnreg}/ficheLubrifiants`}>
                        <td scope="col" style={{ textAlign: "center" }}>
                          {formatdate(tablub.dateEnreg)}
                        </td>
                      </Link>
                      <td>
                        {tablub && tablub.user_id == account.id ? (
                          <span className="badge">
                            <u>{account.name}</u>
                          </span>
                        ) : (
                          <span class="badge">
                            {/* {tablub.user_id} */}
                            {pompistes &&
                              pompistes.map((pompiste) => {
                                if (pompiste.id == tablub.user_id)
                                  return <span>{pompiste.name}</span>;
                              })}
                          </span>
                        )}
                      </td>
                      <td>
                        {tablub?.approuve == 0 ? (
                          <button
                            onClick={() => approuver(tablub?.id)}
                            className="btn btn-success text-center text-ligh btn-sm"
                            style={{ borderRadius: "5px" }}
                            disabled={isChefPiste() ? false : true}
                          >
                            Approuver
                          </button>
                        ) : (
                          <button
                            onClick={() => approuver(tablub?.id)}
                            className="btn btn-warning text-center  text-ligh btn-sm"
                            style={{ borderRadius: "5px" }}
                            disabled={isChefPiste() ? false : true}
                          >
                            {" "}
                            Désapprouver
                          </button>
                        )}
                      </td>
                      <td>
                        {" "}
                        <button
                          type="button"
                          className="btn  del-btn m-1"
                          onClick={() => handleShow(index, tablub)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </tr>
        </div>
      </div>

      <Modale
        titre="Fiche de tablubs"
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
          <Button variant="success" onClick={addfiche}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modale>
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
          <Button variant="warning" onClick={handleClose}>
            Non
          </Button>
          <Button variant="danger" onClick={() => deleteLine(id, tablub)}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </Page>
  );
}
