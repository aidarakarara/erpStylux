import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "src/api/api";
import { separateur } from "src/utils/formatNumber";
import Loader from 'src/components/loader';

import { isChefPiste, isApprouved } from "../hooks/useChefPiste";

export default function BonClientModale({ client, ...other }) {
  let { date } = useParams();
  const [bons, setBons] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [synthese_id, setSynthese_id] = useState(0);
  const [type, setType] = useState("");
  const [synthesEtat, setSynthesEtat] = useState(false);
  const [next, setNext] = useState(false);
  const [load, setLoad] = useState(true);

  /**
   *
   * @param {*} index
   */
  function selectBon(index) {
    let newArr = [...bons];
    newArr[index].selected = !newArr[index].selected;
    setBons(newArr);
  }

  function selectAll() {
    setSelectedAll(!selectedAll);
    let newArr = [...bons];
    newArr.map((_, index) => {
      newArr[index].selected = true;
    });
    setBons(newArr);
  }

  function deselectAll() {
    setSelectedAll(!selectedAll);
    let newArr = [...bons];
    newArr.map((_, index) => {
      newArr[index].selected = false;
    });
    setBons(newArr);
  }

  function toglselectedAll() {
    if (selectedAll) {
      deselectAll();
    } else {
      selectAll();
    }
  }

  function formateDate(madate) {
    let date = new Date(madate);
    let lemois =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    let lejour = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let lannee = date.getFullYear();
    return `${lejour}/${lemois}/${lannee}`;
  }
  // console.log(client);

  //  SAVE ENCAISSEMENTS
  function saveEncaissement() {
    var nbEcaissement = 0;
    var nbEcaisser = 0;
    bons.map((bon) => {
      if (bon.selected) {
        nbEcaissement++;
      }
    });

    bons.map((bon) => {
      if (bon.selected) {
        var encaisssement = {
          client_id: bon.client_id,
          synthese_id: synthese_id,
          type: type,
        };
        console.log("bon", bon);
        console.log("Enc", encaisssement);
        api.get("sanctum/csrf-cookie").then((response) => {
          api.post("api/encaissements", encaisssement).then((res) => {
            bon.encaissement_id = res.data.id;
            const { selected, ...bon2 } = bon;
            api.put(`api/bonClients/${bon2.id}`, bon2).then((res) => {
              console.log(res.data);
              nbEcaisser++;
              if (nbEcaissement === nbEcaisser) {
                other.onHide();
              }
            });
          });
        });
      }
    });
  }

  useEffect(() => {
    setLoad(true);
    const tmpBon = [];
    api
      .get(`api/clients/${client.id}/bons`)
      .then((res) => {
        res.data.map((b) => {
          var bon = {
            caisse_id: b.caisse_id,
            client_id: b.client_id,
            encaissement_id: b.encaissement_id,
            created_at: b.created_at,
            id: b.id,
            montant: b.montant,
            selected: false,
          };
          tmpBon.push(bon);
        });
        setBons(tmpBon);
      })
      .catch((err) => console.log(err));

    api.get("sanctum/csrf-cookie").then((response) => {
      api.post("api/syntheses", { date }).then((res) => {
        setSynthese_id(res.data.id);

        setLoad(false);

        setSynthesEtat(res.data.etat);

      });
    });
  }, [client]);

  function totalBonSeleted() {
    var total = 0;
    total = bons
      .map((bon) => {
        return bon.selected ? bon.montant : 0;
      })
      .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);

    return total;
  }
  function totalBon() {
    var total = 0;
    total = bons
      .map((bon) => bon.montant)
      .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);

    return total;
  }

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1300 }}
      {...other}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Liste des bons de{" "}
          <b>{client.nom}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!next && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={() => toglselectedAll()}
                  />
                </td>
                <th>Date du bon</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              {load ?
                <tr>
                  <td colSpan={3}>
                      <Loader />
                  </td>
                </tr>
                :
                bons.map((bon, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        name=""
                        checked={bon.selected}
                        onChange={() => selectBon(index)}
                      />
                    </td>
                    <td>{formateDate(bon.created_at)}</td>
                    <td>{bon.montant}</td>
                  </tr>
                ))
              }

              <tr>
                <th className="text-center" colSpan="2">
                  Total
                </th>
                <th className="text-center">{separateur(totalBon())} F CFA </th>
              </tr>
            </tbody>
          </Table>
        )}

        {next && (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Date du bon</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {bons &&
                  bons.map(
                    (bon, index) =>
                      bon.selected && (
                        <tr key={index}>
                          <td>{formateDate(bon.created_at)}</td>
                          <td>{bon.montant}</td>
                        </tr>
                      )
                  )}

                <tr>
                  <th className="text-center">Total</th>
                  <th className="text-center">
                    {separateur(totalBonSeleted())} F CFA{" "}
                  </th>
                </tr>
              </tbody>
            </Table>
            <div>
              <b>TYPE</b> : {type}
            </div>
          </>
        )}

        <div>
          {!next && (
            <select
              value={type}
              className={`form-control`}
              onChange={(e) => {
                setType(e.target.value);
              }}
              name="type"
            >
              <option value="">Choisir le mode de paiement</option>
              <option value="tpe">TPE</option>
              <option value="cheque">CHEQUE</option>
              <option value="espece">ESPECE</option>
              <option value="virement">VIREMENT</option>
            </select>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {!next && (
          <Button
            disabled={type == "" || totalBonSeleted() == 0}
            onClick={() => setNext(true)}
          >
            Suivant
          </Button>
        )}
        {next && (
          <Button className="btn btn-secondary" onClick={() => setNext(false)}>
            Précedent
          </Button>
        )}
        {next && isChefPiste() && !isApprouved(synthesEtat) && (
          <Button className="btn btn-success" onClick={saveEncaissement}>
            Encaisser
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
