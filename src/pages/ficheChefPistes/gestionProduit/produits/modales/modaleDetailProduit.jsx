import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "src/api/api";
import { ToastContainer, toast } from "react-toastify";
import Loader from "src/components/loader";

export default function ModaleDetailProduit(props) {

  //add produit
  //notification
  
  //fin notification
  //
  const [produits, setProduits] = useState(null);
  const [produitsFiltre, setProduitsFiltre] = useState([]);
  const [entreeMagasins, setEntreeMagasins] = useState([]);
  const [entrees, setEntrees] = useState(null);
  const [loading, setloading] = useState(false);
  /////////Api affichage
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.get("api/categories").then((res) => setCategories(res.data));
  }, []);
  /////
  const fetchData = async (pageNumber = 1) => {
   setloading(true);
    api.get(`api/produits?page=${pageNumber}`).then((res) => {
      setProduitsFiltre(res.data.data);
      setProduits(res.data);
      setloading(false);
    });
  };
//----------
////////

  ///////
  useEffect(() => {
    api.get("api/entreeMagasin").then((res) => setEntrees(res.data));
  }, []);
  //
 
  useEffect(() => {
    api.get("api/entreeMagasin").then((res) => setEntreeMagasins(res.data));
  }, []);
//////////////////
/*useEffect(() => {
    if (produit) {
      setPrix(produit?.prix);
    //  setProduitId(entree?.produit_id);
      setQuantite(produit?.quantite);
      setDateEntre(produit?.date_entre);
    }
  }, [produit]);
*/
   

  return (
    <Modal
      {...props}
      size="lg"
      style={{zIndex:3000,backgroundColor:"rgba(0,0,0,0.4)"}}
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
            {props.produit ? "Détail du produit" : "Détail du Produit choisi"}
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
          <div className="form-row">
        
            <div className="col">
            <label >Catégorie produit : <span className="badge bg-secondary text-light py-1">
                </span>
                 </label>
            </div>
              <div className="col">
               <label >Libellé produit : <span className="badge bg-success  text-light py-1">
               {//produit && produit?.nom
               }
               {props.produit.nom }
                </span> 
            </label>
            </div>
          </div> 
          </div>
           
          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Prix unitaire :  <span className="badge bg-dark  text-light py-1">
                  {props.produit.pu }
                </span>
                 </label>
              </div>
              <div className="col">
                <label>Qte réelle :  <span className="badge bg-success text-light py-1">
                0
                </span> 
                </label>
              </div>
              <div className="col">
                <label>Qte théorique : <span className="badge bg-primary text-light py-1">
                0 
                </span> 
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-row">
              <div className="col">
                <label>Entrée : </label> <span className="badge bg-warning  text-light py-1">
                {props.produit.entres_m_sum_quantite}
                </span> 
              </div>
              <div className="col">
                <label> Sortie : </label>  <span className="badge bg-info text-light py-1">
                   {props.produit.sorties_m_sum_quantite} 
                </span> 
              </div>
              <div className="col">
                <label> Restant : </label> <span className="badge bg-danger text-light py-1">
                0
                </span> 
              </div>
            </div>
          </div> 

         

        </form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
       
      </Modal.Footer>
    </Modal>
  );
}
