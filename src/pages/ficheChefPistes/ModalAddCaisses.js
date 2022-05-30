import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "src/api/api";
import DateJour from "../../components/DateJour";


export default function ModalAddCaisses(props) {

  const [pompes, setPompes] = useState([]);
  const [pompistes, setPompistes] = useState([]);
  const [caisses, setCaisses] = useState([]);
  let caissesTmp = [];

  const [modifier, setModifier] = useState(false);

  function addCaisses() {
    console.log("caisses add", caisses);
    caisses.forEach(caisse => {
      api.get("sanctum/csrf-cookie").then((response) => {
        const {id, ...caissesTmp} = caisse;
        api.post("api/caisses", caissesTmp).then((res) => {
          console.log("save", res);
          props.onHide();
        });
        props.reloadJournee();
      });
    });
  }

  function updateCaisses() {
    console.log("caisses updateCaisses", caisses);
    caisses.forEach(caisse => {
      api.get("sanctum/csrf-cookie").then((response) => {
        api.put(`api/caisses/${caisse.id}`, caisse).then((res) => {
          console.log("update", res);
          props.onHide();
        });
        props.reloadJournee();
      });
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (props.caisses) {
      updateCaisses();
    } else {
      addCaisses();
    }
  }

  useEffect(() => {

    api.get("api/users").then((res) => { setPompistes(res.data); console.log("users", res.data) });
    console.log("journee", props.caisses);

    api.get("api/pompes").then((res) => {
      setPompes(res.data);
      res.data.forEach((pompe) => {
        var user_id = null;
        var id = null;
        props.caisses && props.caisses.map((j) => {
          if (j.pompe.numero == pompe.numero) {
            id = j.id;
            user_id = j.user_id;
          }
        });

        var caisse = {
          id: id,
          user_id: user_id ? user_id : "",
          date_caisse: props.date,
          pompe_id: pompe.id,
          horaire: "24",
        };

        caissesTmp.push(caisse);
      });
      setCaisses(caissesTmp);
    });

  }, [props.caisses]);

  return (
    <Modal

      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1300 }}
      {...props}

    >
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modifier ? "Modifer une caisse" : "Ajouter une caisse"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* --------------------INPUTS POMPES--------------------- */}
          {caisses && caisses.map((caisse, index) => {
            return (
              <div className="row">

                <div className="col-sm-4" >
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      value={`POMPE ${pompes[index].numero}`}
                      style={{ backgroundColor: "white" }}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <select
                    className="form-control"
                    aria-label="Default select example"
                    value={caisse.user_id}
                    onChange={(e) => {
                      caissesTmp = [...caisses];
                      caissesTmp[index].user_id = e.target.value;
                      setCaisses(caissesTmp);
                    }}
                    required
                  >
                    <option value="">Pompiste</option>
                    {pompistes && pompistes.map((pompiste) => {
                      if (pompiste.role_id == 1)
                        return (<option value={pompiste.id} key={pompiste.id}>{pompiste.name}</option>)
                    })}
                  </select>
                </div>

                <div className="col-sm-4">
                  <select
                    className="form-control"
                    aria-label="Default select example"
                    defaultValue={caisses[index] && caisses[index].horaire}
                    onChange={(e) => {
                      caissesTmp = caisses;
                      caissesTmp[index].horaire = e.target.value;
                      setCaisses(caissesTmp);
                    }}
                    required
                  >
                    <option value="">Horaire (H)</option>
                    <option value="24">24</option>
                  </select>
                </div>

              </div>
            );
          })}
          {/* --------------------END INPUTS POMPES--------------------- */}

        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            Enregistrer
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
