import { Modal, Button } from "react-bootstrap";
import Iframe from "src/components/Iframe";
export default function FactureModale({ lien, ...props }) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      scrollable={true}
      animation={true}
      size="lg"
      style={{ zIndex: 1500, backgroundColor: "rgba(0,0,0,0.5)" }}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Facture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Iframe lien={lien} />
      </Modal.Body>
      <Modal.Footer>
        <Button>Imprimer</Button>
      </Modal.Footer>
    </Modal>
  );
}
