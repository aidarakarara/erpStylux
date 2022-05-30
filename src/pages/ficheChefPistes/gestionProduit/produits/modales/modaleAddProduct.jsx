import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "src/api/api";
import { ToastContainer, toast } from "react-toastify";

export default function ModaleAddProduct(props) {
  //select option
  const [categories, setCategories] = useState(null);
  const [produits, setProduits] = useState(null);
  useEffect(() => {
    api.get("api/categories").then((res) => setCategories(res.data));
    if (props.produit) {
      const { produit, ...autres } = props;
      setCategorie(produit.categorie_id);
      setNom(produit.nom);
      setPu(produit.pu);
      setQteInitiale(produit.qte_initiale);
    }
  }, [props.produit]);
  //fin select option

  //add produit
  //notification
  const notifier = (data = "Ajout d'un produit réussi !!!") =>
    toast.success(data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const erorMsg = () =>
    toast.error("Veuillez renseigner les champs vides !!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //fin notification
  const [invalidI, setInvalidI] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [categorie, setCategorie] = useState(null);
  const [nom, setNom] = useState(null);
  const [pu, setPu] = useState(null);
  const [qte_initiale, setQteInitiale] = useState(null);

  const addProduit = () => {
    if (
      (categorie == "" && nom == "" && pu == "" && qte_initiale == "") ||
      categorie == null ||
      nom == null ||
      pu == null ||
      qte_initiale == null
    ) {
      categorie ? setInvalid(false) : setInvalid(true);
      nom ? setInvalid(false) : setInvalid(true);
      pu ? setInvalid(false) : setInvalid(true);
      qte_initiale ? setInvalid(false) : setInvalid(true);

      erorMsg();
    } else {
      api.get("sanctum/csrf-cookie").then((response) => {
        if (props?.produit?.id) {
          api
            .put(`api/produits/${props?.produit?.id}`, {
              categorie_id: categorie,
              nom: nom,
              pu: pu,
              qte_initiale: qte_initiale,
            })
            .then((response) => {
              notifier("Produit modifié avec succès !");
            })
            .catch((err) => console.log(err));
        } else {
          api
            .post("api/produits", {
              categorie_id: categorie,
              nom: nom,
              pu: pu,
              qte_initiale: qte_initiale,
            })
            .then((response) => {
              setProduits([...produits, response.data]);
              notifier("Produit ajouté avec succès !");
            })
            .catch((err) => console.log(err));
        }
      });
      props.onHide();
      setCategorie(null);
      setNom(null);
      setPu(null);
      setQteInitiale(null);

      setInvalid(false);
      setInvalidI(false);
    }
    //console.log();
  };
  //fin add produit

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
          <h2 className="titre-dash">
            {props.produit ? "Modification d'un produit" : "Ajout d'un produit"}
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Catégorie du produit</label>
                <select
                  required
                  className={`custom-select ${invalid ? "is-invalid" : ""}`}
                  name="categorie_id"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                >
                  <option selected>Choix</option>
                  {categories &&
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nom}
                      </option>
                    ))}
                </select>
                {/*  <small id="textHelp" className="form-text text-muted">
                  Si vous ne voyez pas la catégorie, veuillez l'ajouter d'abord
                  !
                </small> */}
              </div>
              <div className="col">
                <label>Libellé </label>
                <input
                  required
                  autoComplete="off"
                  type="text"
                  className={`form-control ${invalid ? "is-invalid" : ""}`}
                  placeholder="Remplir"
                  name="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Quantité initiale </label>
                <input
                  required
                  autoComplete="off"
                  type="text"
                  className={`form-control form-control-lg ${invalid ? "is-invalid" : ""}`}
                  placeholder="Remplir"
                  name="qte_initiale"
                  value={qte_initiale}
                  onChange={(e) => setQteInitiale(e.target.value)}
                />
              </div>
              <div className="col">
                <label>Prix unitaire </label>
                <input
                  required
                  type="number"
                  className={`form-control ${invalid ? "is-invalid" : ""}`}
                  placeholder="Remplir"
                  name="pu"
                  value={pu}
                  onChange={(e) => setPu(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <button
          type="button"
          className="btn btn-primary monBtn"
          onClick={() => addProduit()}
        >
          {props.produit ? "Modifier" : "Enregistrer"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
