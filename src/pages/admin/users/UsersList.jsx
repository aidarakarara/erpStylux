import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Grid, Button, Container, Stack, Typography } from "@material-ui/core";
// components
import Page from "src/components/Page";
import { Modal } from "react-bootstrap";
import Modale from "src/components/Modale";
import TableList from "src/pages/admin/users/TableList";

import api from "../../../api/api";
import { Button as Bbtn } from "react-bootstrap";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [nom, setNom] = useState(null);
  const [email, setEmail] = useState(null);
  const [role_id, setRole] = useState(null);
  const password = "1234";
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    loadUser();
    api.get("api/roles").then((res) => setRoles(res.data));
  }, []);

  const ajouter = () => {
    const data = { name: nom, email, role_id, password };
    api.get("sanctum/csrf-cookie").then((response) => {
      api.post("api/users", data).then((res1) => {
        api.get("api/users").then((res) => setUsers(res.data));
        setModalShow(false);
      });
    });
    // console.log(data);
  };

  const restaurer = (id) => {
    api.get("sanctum/csrf-cookie").then((response) => {
      api.post(`api/users/restaurer/${id}`).then((res1) => {
        loadUser();
        setModalShow(false);
      });
    });
    // console.log(data);
  };
  function loadUser() {
    api.get("api/users").then((res) => setUsers(res.data));
  }

  const supprimer = (id) => {
    api.delete(`api/users/${id}`).then((res) => {
      loadUser();
    });
    console.log(id);
  };
  function showM() {
    setModalShow(true);
  }
  // function generer() {
  //   if (nom) {
  //     var tmpEmail = nom;
  //     var random = Math.round(Math.random() * 1000);
  //     tmpEmail = `${tmpEmail}${random}@gmail.com`;
  //     tmpEmail = tmpEmail.toLowerCase();
  //     tmpEmail = tmpEmail.replace(/ +/g, "");
  //     setEmail(tmpEmail);
  //   }
  // }
  // useEffect(() => {
  //   generer();
  // }, [nom]);
  return (
    <Page title="Utilisateurs">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        ></Stack>

        {users && (
          <TableList
            showM={showM}
            supprimer={supprimer}
            users={users}
            restaurer={restaurer}
          />
        )}

        <Modale
          titre="Ajouter  un utilisateur"
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <Modal.Body>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  onChange={(e) => {
                    setNom(e.target.value);
                    //  generer();
                  }}
                  className="form-control"
                  placeholder="Nom complet"
                  required
                />
              </div>
              <div class="col">
                <input
                  type="number"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    //  generer();
                  }}
                  className="form-control"
                  placeholder="Téléphone"
                  required
                />
              </div>
              <div class="col">
                <select
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control"
                >
                  <option>Role</option>
                  {roles.map((role) => (
                    <option value={role.id}>{role.nom}</option>
                  ))}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Bbtn
              variant="success"
              onClick={() => {
                ajouter();
              }}
            >
              Sauvegarder
            </Bbtn>
          </Modal.Footer>
        </Modale>
      </Container>
    </Page>
  );
}
