import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "src/api/api";
import DateJour from "../../components/DateJour";

export default function ModalAddCaisses(props) {
  var today = new Date().toLocaleDateString();
  const [date, setDate] = useState(null);
  const [pompe, setPompe] = useState("");
  const [horaire, setHoraire] = useState("24");
  const [user, setUser] = useState([]);

  const [dateE, setDateE] = useState(true);
  const [pompeE, setPompeE] = useState(true);
  const [horaireE, setHoraireE] = useState(true);

  const [modifier, setModifier] = useState(false);
  const [calendarPicker, setCalendarPicker] = useState(false);

  function funcSetDate(date) {
    setDate(date);
  }

  function add() {
    if (controlChamps()) {
      var c = {
        user_id: user.id,
        date_caisse: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`,
        pompe_id: pompe,
        horaire: horaire,
      };
      props.addCaisse(c);
      props.onHide();
    }
  }

  function update() {
    if (controlChamps()) {
      var c = {
        id: props.caisse.id,
        date_caisse: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`,
        pompe_id: pompe.id,
        horaire: horaire,
      };
      props.updateCaisse(c);
      props.onHide();
    }
  }

  function controlChamps() {
    setPompeE(true);
    setHoraireE(true);
    pompe == "" && setPompeE(false);
    horaire == "" && setHoraireE(false);
    if (pompe != "" && horaire != "") {
      return true;
    }
    return false;
  }

  useEffect(() => {
    api.get("api/user").then((res) => setUser(res.data));
    props.caisse ? setModifier(true) : setModifier(false);
    setPompeE(true);
    setHoraireE(true);
    if (props.caisse != null) {
      setPompe(props.caisse.pompe);
      setHoraire(props.caisse.horaire);
    } else {
      setPompe("");
      setHoraire("24");
    }
    console.log("useEffect add caisse");
  }, [props.caisse]);

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1300 }}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modifier ? "Modifer une caisse" : "Ajouter une caisse"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row ">
          <div className="col-sm-4">
            <input
              type="text"
              className={`form-control`}
              placeholder="Date"
              value={date}
              onClick={() => setCalendarPicker(true)}
            />
            {calendarPicker && (
              <DateJour funcSetDate={funcSetDate} show={setCalendarPicker} />
            )}
          </div>
          <div className="col-sm-4">
            <select
              className={`form-control  ${!pompeE && "is-invalid"}`}
              aria-label="Default select example"
              value={pompe}
              onChange={(e) => {
                setPompe(e.target.value);
                setPompeE(true);
              }}
            >
              <option value="">Pompe</option>
              <option value="1">POMPE 1</option>
              <option value="2">POMPE 2</option>
            </select>
          </div>
          <div className="col-sm-4">
            <select
              className={`form-control  ${!horaireE && "is-invalid"}`}
              aria-label="Default select example"
              value={horaire}
              onChange={(e) => {
                setHoraire(e.target.value);
                setHoraireE(true);
              }}
            >
              <option value="">Horaire (H)</option>
              <option value="24">24</option>
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={modifier ? update : add}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
