import React, { useState, useEffect } from "react";
// material
import { Container, Stack } from "@material-ui/core";
import Page from "../../components/Page";
import Modale from "../../components/Modale";
import TableList from "./TableList";
import { Modal } from "react-bootstrap";
import { Button as Bbtn } from "react-bootstrap";
import api from "../../api/api";
import Loader from "src/components/loader";
// ----------------------------------------------------------------------

export default function PompestList() {
  const [clients, setClients] = useState(null);
  const [nom, setNom] = useState(null);
  const [tel, setTel] = useState(null);
  const [email, setEmail] = useState(null);
  const [adresse, setAdresse] = useState(null);
  const [nomErr, setNomErr] = useState(false);
  const [telErr, setTelErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [adresseErr, setAdresseErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    api.get(`api/clients?page=${pageNumber}`).then((res) => {
      setClients(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [modalShow, setModalShow] = useState(false);

  const addClient = () => {
    if (nom && tel && email && adresse) {
      api.get("sanctum/csrf-cookie").then((response) => {
        var data = { nom, telephone: tel, email, adresse };
        api.post("api/clients", data).then((res) => {
          fetchData();
          setModalShow(false);
        });
      });
    } else {
      if (!nom) setNomErr(true);
      if (!tel) setTelErr(true);
      if (!email) setEmailErr(true);
      if (!adresse) setAdresseErr(true);
    }
  };

  function showM() {
    setModalShow(true);
  }

  return (
    <Page title="Liste des Clients">
      <div classNae="row">
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={0}
          >
            {/*  <Button
              variant="contained"
              component={RouterLink}
              to="#"
              onClick={() => setModalShow(true)}
              type="button"
              startIcon={<Icon icon={plusFill} />}
            >
              Ajouter
            </Button> */}
            <Modale
              titre="Ajouter un Client/ Entreprise"
              show={modalShow}
              onHide={() => setModalShow(false)}
            >
              <Modal.Body>
                <div className="row">
                  <div className="col col-md -6">
                    <input
                      type="text"
                      onChange={(e) => setNom(e.target.value)}
                      className={`form-control ${nomErr ? "is-invalid" : ""}`}
                      placeholder="Nom client"
                    />
                  </div>
                  <div className="col col-md -6">
                    <input
                      type="tel"
                      onChange={(e) => setTel(e.target.value)}
                      className={`form-control ${telErr ? "is-invalid" : ""}`}
                      placeholder="Numéro de téléphone"
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col col-md -6">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={`form-control ${emailErr ? "is-invalid" : ""}`}
                      placeholder="Email"
                    />
                  </div>
                  <div className="col col-md -6">
                    <input
                      type="text"
                      onChange={(e) => setAdresse(e.target.value)}
                      className={`form-control ${
                        adresseErr ? "is-invalid" : ""
                      }`}
                      placeholder="Adresse"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Bbtn onClick={addClient} variant="success">
                  Sauvegarder
                </Bbtn>
              </Modal.Footer>
            </Modale>
          </Stack>

          <div className="container">
            <div>
              {clients && !loading ? (
                <TableList
                  clients={clients}
                  fetchData={fetchData}
                  showM={showM}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </Container>
      </div>
    </Page>
  );
}
