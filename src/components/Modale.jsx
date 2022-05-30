import React from "react";
import { Modal } from "react-bootstrap";
export default function Modale(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1300 }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.titre}
        </Modal.Title>
      </Modal.Header>
      {props.children}
    </Modal>
  );
}
