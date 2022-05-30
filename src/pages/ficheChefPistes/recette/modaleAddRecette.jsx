import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { separateur } from "src/utils/formatNumber";
import api from "src/api/api";
import { ToastContainer, toast } from "react-toastify";
import Loader from "src/components/loader";

export default function ModaleAddProduct(props) {
  let { date } = useParams();

  // //add produit
  // //notification
  // const notifier = (data = "Ajout d'une recette réussie !") =>
  //   toast.success(data, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // const erorMsg = () =>
  //   toast.error("Veuillez renseigner les champs vides !", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // //fin notification
  // const [invalidI, setInvalidI] = useState(false);
  // const [invalid, setInvalid] = useState(false);
  // const [totallub, setTotallub] = useState(null);
  // const [totalacc, setTotalacc] = useState(null);
  // const [totalfut, setTotalfut] = useState(null);
  // const [recettes, setRecettes] = useState(null);

  // const addRecette = () => {
  //   if (
  //     (totallub == "" && totalfut == "" && totalacc == "") ||
  //     totallub == null ||
  //     totalfut == null ||
  //     totalacc == null
  //   ) {
  //     totallub ? setInvalid(false) : setInvalid(true);
  //     totalfut ? setInvalid(false) : setInvalid(true);
  //     totalacc ? setInvalid(false) : setInvalid(true);

  //     erorMsg();
  //   } else {
  //     api.get("sanctum/csrf-cookie").then((response) => {
  //       if (props?.recette?.id) {
  //         api
  //           .put(`api/recettes/${props?.recette?.id}`, {
  //             totallub: totallub,
  //             totalacc: totalacc,
  //             totalfut: totalfut,
  //             date_recette: date,
  //           })
  //           .then((response) => {
  //             notifier("recette modifiée avec succès !");
  //           })
  //           .catch((err) => console.log(err));
  //       } else {
  //         api
  //           .post("api/recettes", {
  //             totallub: totallub,
  //             totalacc: totalacc,
  //             totalfut: totalfut,
  //             date_recette: date,
  //           })
  //           .then((response) => {
  //             setRecettes([...recettes, response.data]);
  //             notifier("Rectte ajoutée avec succès !");
  //           })
  //           .catch((err) => console.log(err));
  //       }
  //     });
  //     props.onHide();
  //     setTotalacc(null);
  //     setTotallub(null);
  //     setTotalfut(null);
  //     setInvalid(false);
  //     setInvalidI(false);
  //   }
  //   //console.log();
  // };
  // function formatdate(date) {
  //   let d = new Date(date);
  //   let mois =
  //     d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  //   let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  //   return `${jour}/${mois}/${d.getFullYear()}`;
  // }
  // //fin add produit
  const [loading, setloading] = useState(false);
  const [id, setId] = useState(null);
  const [recette, setRecette] = useState(null);

  const updateInputRecette = (index) => (e) => {
    let newArr = [...recettes];
    let prop = e.target.name;
    newArr[index][prop] = e.target.value; // Remplacer l'ancien valeur par la nouvelle valeur de l'input
    setRecettes(newArr); // ??
  };

  const [recettes, setRecettes] = useState([]);
  useEffect(() => {
    // setloading(false);
    api.get(`api/recette-date/${date}`).then((res) => {
      if (res.data.length == 0) {
        setRecettes([
          ...recettes,
          {
            totallub: 0,
            totallav: 0,
            totalfut: 0,
            totalacc: 0,
            date_recette: date,
          },
        ]);
      } else {
        setRecettes(res.data);
        // setloading(true);
      }
    });
  }, []);

  function addLine() {
    var line = {
      totallub: 0,
      totallav: 0,
      totalfut: 0,
      totalacc: 0,
      date_recette: date,
    };
    setRecettes([...recettes, line]);
  }

  function deleteLine(ligne_id, recette) {
    if (!recette.id) {
      setRecettes(recettes.filter((recette, index) => index != ligne_id));
    } else {
      api.delete(`api/recettes/${recette.id}`).then((res) => {
        setRecettes(recettes.filter((recette, index) => index != ligne_id));
      });
    }
    handleClose();
  }

  function notifier() {
    toast.success("Sauvegarde recette réussie", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const erorMsg = () =>
    toast.error("Vous devez  renseigner les tous le champs", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  function saveAll() {
    api.get("sanctum/csrf-cookie").then((response) => {
      recettes.map((recette) => {
        if (recette.id) {
          api
            .put(`api/recettes/${recette.id}`, recette)
            .then((res) => console.log("recettes Faites"));
          notifier();
        } else {
          api
            .post("api/recettes", recette)
            .then((res) => console.log("recettes Faites"));
        }
      });
      props.onHide();
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  function handleShow(i, lav) {
    setRecette(lav);
    setId(i);
    setShow(true);
  }

  function montantparligne(index) {
    var ligne = recettes[index];
    var somme = 0;
    somme =
      parseInt(ligne.totallub) +
      parseInt(ligne.totallav) +
      parseInt(ligne.totalacc) +
      parseInt(ligne.totalfut);
    return somme;
  }

  function montanttotal() {
    let total = 0;
    recettes &&
      recettes.map((_, index) => {
        total += montantparligne(index);
      });
    return total;
  }

  const [params, setParams] = useState(useParams());
  function formatdate(date) {
    let d = new Date(date);
    let mois =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    return `${jour}/${mois}/${d.getFullYear()}`;
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ToastContainer
        position="top-right"
        style={{ marginTop: "50px" }}
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          AUTRES RECETTES : {formatdate(date)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <table class="table table-hover table-bordered">
            <tr style={{ textAlign: "center" }}>
              <th
                scope="col"
                style={{
                  verticalAlign: "middle",
                  fontSize: "20px",
                }}
              >
                Lavages
              </th>
              {recettes &&
                recettes.map((recette, index) => (
                  <td key={index}>
                    {" "}
                    <input
                      className="form-control text-center"
                      name="totallav"
                      type="number"
                      value={recette.totallav}
                      onChange={updateInputRecette(index)}
                    />
                    <span></span>
                  </td>
                ))}
            </tr>
            <tr style={{ textAlign: "center" }}>
              <th
                scope="col"
                style={{
                  verticalAlign: "middle",
                  fontSize: "20px",
                }}
              >
                Lubrfiants
              </th>
              {recettes &&
                recettes.map((recette, index) => (
                  <td key={index}>
                    {" "}
                    <input
                      className="form-control text-center"
                      name="totallub"
                      type="number"
                      value={recette.totallub}
                      onChange={updateInputRecette(index)}
                    />
                    <span></span>
                  </td>
                ))}
            </tr>
            <tr style={{ textAlign: "center" }}>
              <th
                scope="col"
                style={{
                  verticalAlign: "middle",
                  fontSize: "20px",
                }}
              >
                Accessoires
              </th>
              {recettes &&
                recettes.map((recette, index) => (
                  <td key={index}>
                    {" "}
                    <input
                      className="form-control text-center"
                      name="totalacc"
                      type="number"
                      value={recette.totalacc}
                      onChange={updateInputRecette(index)}
                    />
                    <span></span>
                  </td>
                ))}
            </tr>
            <tr style={{ textAlign: "center" }}>
              <th
                scope="col"
                style={{
                  verticalAlign: "middle",
                  fontSize: "20px",
                }}
              >
                Fûts
              </th>
              {recettes &&
                recettes.map((recette, index) => (
                  <td key={index}>
                    {" "}
                    <input
                      className="form-control text-center"
                      name="totalfut"
                      type="number"
                      value={recette.totalfut}
                      onChange={updateInputRecette(index)}
                    />
                    <span></span>
                  </td>
                ))}
            </tr>
            <tr>
              <th colSpan={1} style={{ textAlign: "center", fontSize: "20px" }}>
                TOTAL autres recettes
              </th>
              <td
                style={{
                  backgroundColor: "rgb(238, 238, 238)",
                  fontWeight: "bold",
                }}
              >
                {separateur(montanttotal())} FCFA
              </td>
            </tr>
          </table>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn" onClick={() => saveAll()}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
