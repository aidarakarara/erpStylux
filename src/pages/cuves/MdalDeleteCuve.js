import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function MdalDeleteCuve(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Suprimer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Voulez vous supprimer la cuve { props.cuve && props.cuve.numero }
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="secondary">NON</Button>
                <Button onClick={() => {props.deleteCuve(props.cuve)}} variant="danger">OUI</Button>
            </Modal.Footer>
        </Modal>
    )
}
