import React, { useEffect } from "react";
import "./cuves.css";
import ModalAddCuve from "./ModalAddCuve";
import MdalDeleteCuve from "./MdalDeleteCuve";
import { Table, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify-icons/mdi/pencil";
import deleteIcon from "@iconify-icons/mdi/delete";
import api from "../../api/api";
import Page from "../../components/Page";
import { ToastContainer, toast } from "react-toastify";
import "./indexDashboard.css";

export default function Cuves() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);
  const [cuves, setCuves] = React.useState([]);
  const [cuve, setCuve] = React.useState(null);

  useEffect(() => {
    api.get("api/reservoirs").then((res) => setCuves(res.data));
  }, []);

  function addCuve(cuve) {
    //  console.log(cuve);

    api.get("sanctum/csrf-cookie").then((response) => {
      api
        .post("api/reservoirs", cuve)
        .then((res) => setCuves([...cuves, res.data]));
    });
  }
  function deleteCuve(cuve) {
    // console.log(cuve.id);
    api.delete(`api/reservoirs/${cuve.id}`).then((res) => {
      setCuves(cuves.filter((el) => el.id != cuve.id));
      setModalDeleteShow(false);
    });
  }
  const modifierCuve = (cuve) => {
    api.get("sanctum/csrf-cookie").then((response) => {
      api
        .put(`api/reservoirs/${cuve.id}`, cuve)
        .then((res) =>
          api.get("api/reservoirs").then((res) => setCuves(res.data))
        );
    });
  };

  return (
    <Page title="Liste des cuves - Admin" className="indexDashbord">
      <div
        className="row justify-content-center"
        style={{ marginTop: "-30px" }}
      >
        <div className=" indexDashbord2 col-xs-8 col-sm-8 col-md-8">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ef5350, #e53935)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "75%",
              marginBottom: "15px",
              marginTop: "-35px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 60%)",
            }}
          >
            <h2 className="titre">Liste des cuves </h2>
          </div>{" "}
          <Button
            style={{ width: "200px" }}
            variant="secondary"
            onClick={() => {
              setCuve(null);
              setModalShow(true);
            }}
          >
            Ajouter une cuve
          </Button>
          <div
            className=" col-xs-1 col-sm-6 col-md-1 "
            style={{ padding: "1px" }}
          >
            {" "}
          </div>{" "}
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
          <table size="sm" className="table table-responsive" hover>
            <thead
              style={{
                background: "linear-gradient(60deg, #ef5350, #e53935)",
                color: "white",
              }}
            >
              <tr>
                <th
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    width: "250px",
                  }}
                >
                  Numéro
                </th>
                <th
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    width: "25%",
                  }}
                >
                  Carburant
                </th>
                <th
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    width: "25%",
                  }}
                >
                  Volume (en L)
                </th>
                <th
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    width: "25%",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cuves.map((cuve) => {
                return (
                  <tr>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        cursor: "default",
                      }}
                    >
                      {cuve.numero}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        cursor: "default",
                      }}
                    >
                      {cuve.carburant}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        cursor: "default",
                      }}
                    >
                      {cuve.capacite}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        cursor: "default",
                      }}
                    >
                      <Button
                        type="button"
                        variant="info"
                        className="mx-2"
                        onClick={() => {
                          setCuve(cuve);
                          setModalShow(true);
                        }}
                      >
                        <Icon icon={pencilIcon} />
                      </Button>{" "}
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                          setCuve(cuve);
                          setModalDeleteShow(true);
                        }}
                      >
                        <Icon icon={deleteIcon} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddCuve
        show={modalShow}
        onHide={() => setModalShow(false)}
        addCuve={addCuve}
        cuve={cuve}
        modifierCuve={modifierCuve}
      />
      <MdalDeleteCuve
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
        cuve={cuve}
        deleteCuve={deleteCuve}
      />
    </Page>
  );
}
