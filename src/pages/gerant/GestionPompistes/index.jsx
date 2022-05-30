import React, { useEffect, useState } from "react";
import "./index.css";

import api from "src/api/api";
import { useParams } from "react-router-dom";
import TimeLine from "./partials/timeline";
import { separateur } from "src/utils/formatNumber";
import Loader from "src/components/loader";

export default function Pompiste() {
  const date = new Date();
  let { id } = useParams();
  const mois = date.getMonth() + 1;
  const annee = date.getFullYear();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   *
   * @param {mois:number} lemois
   * @param {annee:number} lannee
   * charger les données du pompiste
   */
  function loadDetail(lemois, lannee) {
    setLoading(true);
    api.get(`api/detail-pompistes/${id}/${lannee}/${lemois}`).then((res) => {
      setDetail(res.data);
      setLoading(false);
    });
  }

  /**
   *
   * @returns String total carburant du mois choisi
   */
  function tolalcarburant() {
    var totalSuper =
      detail &&
      detail?.details
        .map((det) => det?.super)
        .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);

    var totalGasoil =
      detail &&
      detail?.details
        .map((det) => det?.gasoil)
        .reduce((prev = 0, next = 0) => Number(prev) + Number(next), 0);

    return separateur(totalGasoil + totalSuper);
  }

  function choisir(data) {
    let ladat = new Date(data);
    loadDetail(ladat.getMonth() + 1, ladat.getFullYear());
  }

  useEffect(() => {
    loadDetail(mois, annee);
  }, []);
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          {/* les cards  */}
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 ">
            {/*   <h2 className="titre-da"> les cards</h2> */}
            <div className="row">
              {/* Card heurre */}
              <div className="col  mb-1 ">
                <div className="card mcard mcardheur">
                  <div className="card-header maHeader">
                    <div className="row">
                      <div className="col">
                        <h6 className="titre-card">Nombre de caisses</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5>{separateur(detail?.nbCaisse)} caisses</h5>
                  </div>
                </div>
              </div>
              {/* Fin Card heurre */}

              {/*  Card Volume */}
              <div className="col">
                <div className="card mcard mcardcarbur">
                  <div className="card-header maHeadercarbu">
                    <div className="row">
                      <div className="col">
                        <h6 className="titre-card">Carburants vendus</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5> {tolalcarburant()} litres</h5>
                  </div>
                </div>
              </div>

              {/* Fin Card Volume */}
            </div>
          </div>
          {/* fin des cards */}
          {/*  pompiste information */}
          <div className="col-12 col-sm-12 col-md-6 col-lg-8 ">
            {/* infos personsone */}

            <div className="card infos-card">
              <div className="row">
                <div className=" col-12 col-sm-12 col-md-2">
                  <img
                    src="https://picsum.photos/200/300"
                    className="img-fluid rounded-start profile"
                    alt="random photo"
                  />
                </div>
                {/* prenom adresse */}
                <div className=" col-12 col-sm-12 col-md-6">
                  <h5 className="titre-dash">{detail?.user?.name}</h5>
                  <p>{detail?.user?.email}</p>
                  <p>
                    <small className="text-muted">Pompiste</small>
                  </p>
                </div>
                {/* fin prenom et adresse */}
              {/*   <div className=" col-12 col-sm-12 col-md-4 d-flex justify-content-center ">
                  <div className="d-flex align-items-center mr-2">
                    <button className="btn btn-primary monBtn ">
                      + Modifier
                    </button>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-primary monBtn ">
                      + Produit
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
            {/*  fin infos */}
            {/* les actions */}
            <div className="row  mt-3">
              <div className="col-12 col-md-6  ">
                <input
                  type="month"
                  className="form-control"
                  onChange={(e) => {
                    choisir(e.target.valueAsDate);
                  }}
                />
              </div>
            </div>
            {/* Fin les actions */}

            {/*  Canlendar Or Timeline */}
            <div className="row mt-3">
              {detail && !loading ? (
                <TimeLine details={detail && detail?.details} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
          {/* fin pompiste information */}
        </div>
      </div>
    </div>
  );
}
