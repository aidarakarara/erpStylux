import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar-custom.css";
import "./rapport.css";
import { formatdate } from "src/utils/formatTime";

function Rapport() {
  const [value, setValue] = useState([new Date(), new Date()]);
  return (
    <div className="container-fluid p-2 rapport">
      <div className="card p-5">
        {/* titre */}
        <h3 className="rappot-titre">
          Rapport du
          <small className="date-rapport">
           {" "}
            {value && formatdate(value[0])} au {value && formatdate(value[1])}
          </small>
        </h3>
        {/* fin titre */}

        {/* le conteneur */}
        <div className="row pl-2">
          <div className="col col-sm-12 col-md-8">
            <h2 className="titre-dash">Rapport</h2>

            {/* les cardes */}
            <div className="row">
              <div className="col col-sm-6 col-md-6">
                <div className="card maCard chiffreAff">
                  <div className="card-body">
                    <h5 className="card-title titre-dash">Chiffre d'affaire</h5>
                    <p className="card-text">12 000 000 000 </p>
                  </div>
                </div>
              </div>
              <div className="col col-sm-6 col-md-6 ">
                <div className="card maCard carburantVend">
                  <div className="card-body">
                    <h5 className="card-title titre-dash">
                      {" "}
                      Voulume Carburant vendus
                    </h5>
                    <p className="card-text">40 000 000</p>
                  </div>
                </div>
              </div>
            </div>
            {/*  fin des Carde */}
          </div>

          <div className="col col-sm-12 col-md-4 py-2">
            <h2 className="titre-dash">Choisir </h2>
            <Calendar
              className={"maCard calendar"}
              selectRange={true}
              onChange={(e) => {
                setValue(e);
                console.log(e);
              }}
              value={value}
            />
          </div>
        </div>
        {/*  Finle conteneur */}

        {/*   La liste des rapport */}
        <div className="row">
          <h2 className="titre-dash">Bonjour</h2>

          <div className="col-12">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad hic
              quaerat impedit saepe possimus ratione aut harum similique, sunt
              quibusdam, autem cum veniam, obcaecati vel eligendi perferendis
              tenetur dolores doloribus?
            </p>
          </div>
        </div>
        {/* Fin de  La liste des rapport */}
      </div>
    </div>
  );
}

export default Rapport;
