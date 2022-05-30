import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Grid, Button, Container, Stack, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import Modale from "../../components/Modale";
import TableList from "./TableList";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import { useEffect } from "react";
import api from "../../api/api";

// ----------------------------------------------------------------------

export default function IlotList() {
  const [modalShow, setModalShow] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [ilots, setIlots] = useState(null);
  const [numero, setNumero] = useState(null);

  useEffect(() => {
    api.get("api/ilots").then((res) => setIlots(res.data));
  }, []);

  //Suprimer un ILOt
  const suprimer = (id) => {
    api.delete(`api/ilots/${id}`).then((res) => {
      toast.warn(`Suppression de l'ilot réussie !!!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIlots(ilots.filter((el) => el.id != id));
    });
  };

  //Modifier
  const modiferIlot = (id, number) => {
    const data = { numero: number };
    api.get("sanctum/csrf-cookie").then((response) => {
      api
        .put(`api/ilots/${id}`, data)
        .then((res) => {
          modifierNotiff(number);
          api.get("api/ilots").then((res) => setIlots(res.data));
        })
        .catch((err) => console.log(err));
    });
  };
  const modifierNotiff = (id) =>
    toast.success(`Modification de l'ilot ${id} réussie`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifier = () =>
    toast.success("Ajout d'un ilot réussi !!!", {
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

  const addIlot = async () => {
    /*   const data = { email: "diattamohamet30@gmail.com", password: "1234" };
     api.get("sanctum/csrf-cookie").then(()=>{
      api.post("api/login", data).then((res)=>{
        console.log(res)
      })
    })*/

    if (numero == "" || numero == null) {
      setInvalid(true);
      erorMsg();
    } else {
      const data = { numero: numero };
      api.get("sanctum/csrf-cookie").then((response) => {
        api
          .post("api/ilots", data)
          .then((response) => {
            notifier();
            setIlots([...ilots, response.data]);
          })
          .catch((err) => console.log(err));
      });

      setModalShow(false);

      setNumero(null);
      setInvalid(false);
    }
    //console.log();
  };
  function showM() {
    setModalShow(true);
  }
  return (
    <Page title="Liste des ilots - Admin">
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
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
        
          <Modale
            titre="Ajouter un ilot"
            show={modalShow}
            onHide={() => setModalShow(false)}
          >
            <Modal.Body>
              <div className="row">
                <div className="col">
                  <input
                    type="number"
                    className={`form-control ${invalid ? "is-invalid" : ""}`}
                    placeholder="Numéro Ilot"
                    aria-label="Numéro Ilot"
                    required
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Bbtn onClick={addIlot} variant="success">
                Sauvegarder
              </Bbtn>
            </Modal.Footer>
          </Modale>
        </Stack>

        <div className="container">
          <div className="mt-0">
            {ilots && (
              <TableList
                showM={showM}
                suprimer={suprimer}
                modiferIlot={modiferIlot}
                ilots={ilots}
              />
            )}
          </div>
        </div>
      </Container>
    </Page>
  );
}
