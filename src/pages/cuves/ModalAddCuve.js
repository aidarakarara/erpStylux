import { startCase } from "lodash";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalAddCuve(props) {
  const [numero, setNumero] = useState("");
  const [carburant, setCarburant] = useState("");
  const [volume, setVolume] = useState("");

  const [numeroE, setNumeroE] = useState(true);
  const [carburantE, setCarburantE] = useState(true);
  const [volumeE, setVolumeE] = useState(true);
  const [modifier, setModifier] = useState(false);

  function add() {
    setNumeroE(true);
    setCarburantE(true);
    setVolumeE(true);
    numero == "" && setNumeroE(false);
    carburant == "" && setCarburantE(false);
    volume == "" && setVolumeE(false);
    console.log(props.cuve);
    if (numero != "" && carburant != "" && volume != "") {
      const cuve = { numero: numero, carburant: carburant, capacite: volume };
      props.addCuve(cuve);
      props.onHide();
    }
  }
  function updateCuve() {
    setNumeroE(true);
    setCarburantE(true);
    setVolumeE(true);
    numero == "" && setNumeroE(false);
    carburant == "" && setCarburantE(false);
    volume == "" && setVolumeE(false);
    if (numero != "" && carburant != "" && volume != "") {
      const cuve = {
        id: props.cuve.id,
        numero: numero,
        carburant: carburant,
        capacite: volume,
      };
      props.modifierCuve(cuve);
      props.onHide();
    }
  }

  useEffect(() => {
    props.cuve ? setModifier(true) : setModifier(false);
    setNumeroE(true);
    setCarburantE(true);
    setVolumeE(true);
    if (props.cuve != null) {
      setNumero(props.cuve.numero);
      setCarburant(props.cuve.carburant);
      setVolume(props.cuve.capacite);
    } else {
      setNumero("");
      setCarburant("");
      setVolume("");
    }
    console.log("useEffect add cuve");
  }, [props.cuve]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1200 }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modifier ? "Modifer une cuve" : "Ajouter une cuve"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-3">
            <select
              value={numero}
              onChange={(e) => {
                setNumero(e.target.value);
                setNumeroE(true);
              }}
              className={`${!numeroE && "is-invalid"} form-control`}
              aria-label="Default select example"
            >
              <option value="">Numéro de cuve</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="col-sm-4">
            <select
              value={carburant}
              onChange={(e) => {
                setCarburant(e.target.value);
                setCarburantE(true);
              }}
              className={`${!carburantE && "is-invalid"} form-control`}
              aria-label="Default select example"
            >
              <option value="" selected>
                Carburant
              </option>
              <option value="Gasoil">Gasoil</option>
              <option value="Super">Super</option>
            </select>
          </div>
          <div className="col-sm-5">
            <input
              value={volume}
              onChange={(e) => {
                setVolume(e.target.value);
                setVolumeE(true);
              }}
              type="number"
              className={`${!volumeE && "is-invalid"} form-control`}
              placeholder="Volume de la cuve (en L)"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            modifier ? updateCuve() : add();
          }}
          variant="success"
        >
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
