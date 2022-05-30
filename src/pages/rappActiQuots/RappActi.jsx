import React, { useState, useEffect } from "react";
import "./rappActi.css";
import { Table } from "react-bootstrap";
//IMPORT DES TABLEAUX POUR LE RAPPORT D'ACTIVITES QUOTIDIENT
import IndeComp from "./IndeComp";
import AutrRece from "./AutrRece";
import JaugManuRele from "./JaugManuRele";
import GestStocCarb from "./GestStocCarb";
import TenuCaisIntePoinEau from "./TenuCaisIntePoinEau";
import CumuReceCarbMois from "./CumuReceCarbMois";
import CumuVentTpeMois from "./CumuVentTpeMois";
import VentGimMois from "./VentGimMois";
import CumuRechCartTpeMois from "./CumuRechCartTpeMois";
import TenuCaisRegiShel from "./TenuCaisRegiShel";
import RegiGestInde from "./RegiGestInde";
import CaisPomp15H from "./CaisPomp15H";
import LubrPompPomp from "./LubrPompPomp";
//row justify-content-start
import api from "src/api/api";
import { useParams } from "react-router-dom";
import PageLoad1 from "src/pages/pageLoad1";

export default function RappActi() {
  let { date } = useParams();
  const [rappActi, setRappActi] = useState(null);
  const [caisses, setCaisses] = useState(null);
  const [synthese, setSynthese] = useState([]);
  //----------------------------

  /* 
    useEffect(() => {
      loadData();
     
    }, [date]);

    function loadData() {
      api.get(`api/rapport/${date}`).then((res) => { 
        setRappActi(res.data);
        setCaisses(res.data.caisses);
        setSynthese(res.data.synthese);
      });
    }
    if (!caisses && !synthese) {
      return <h1 className="mt-5 center "> Pas de Donnée disponible </h1>;
    }*/
  //----------------------------------

  useEffect(() => {
    api.get(`api/rapport/${date}`).then((res) => {
      setRappActi(res.data);
      //  setCaisses(res.data.caisses);
      //setSynthese(res.data.synthese);
    });
  }, [date]);

  //////////
  if (!rappActi) {
    return <PageLoad1 />;
  }
  /////////////////autre test
  if (!rappActi && synthese.length == 0 && !caisses) {
    return <h2> Pas de donnée disponible </h2>;
  }

  return (
    <div className="ficheRappActi">
      <div className="row">
        <Table className="rappActi " hover striped bordered size="sm">
          <thead>
            <tr className="center color ">
              <th className="">
                <div className="row">
                  <div
                    style={{ padding: "13px" }}
                    className="col col-xs-12 col-sm-12 col-md-12 col-lg-10 fontTitre "
                  >
                    <h2 className="titre">RAPPORT QUOTIDIEN D'ACTIVITES</h2>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </Table>
      </div>

      <div className="row">
        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-3"
        >
          {rappActi && (
            <IndeComp
              caisses={rappActi?.caisses}
              totalsup={rappActi?.totalsup}
              totalgaz={rappActi?.totalgaz}
              synthese={rappActi?.synthese}
            />
          )}
        </div>

        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-3"
        >
          {rappActi && (
            <AutrRece
              caisses={rappActi?.caisses}
              totalsup={rappActi?.totalsup}
              totalgaz={rappActi?.totalgaz}
            />
          )}
        </div>

        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-4"
        >
          {rappActi && (
            <JaugManuRele
              synthese={rappActi?.synthese}
              caisses={rappActi?.caisses}
            />
          )}
        </div>

        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-2"
        >
          {rappActi && <GestStocCarb synthese={rappActi?.synthese} />}
        </div>
      </div>

      {
        ////////// 2em tableau
      }

      <div className="row">
        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-5"
        >
          {rappActi && (
            <TenuCaisIntePoinEau
              synthese={rappActi.synthese}
              caisses={rappActi.caisses}
              depenses={rappActi.depenses}
              venteTpes={rappActi.venteTpes}
            />
          )}
        </div>

        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-2"
        >
          {rappActi && <CumuReceCarbMois synthese={rappActi.synthese} />}
          {rappActi && <CumuVentTpeMois caisses={rappActi.caisses} />}
          <VentGimMois />
          {rappActi && <CumuRechCartTpeMois synthese={rappActi.synthese} />}
        </div>

        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-5"
        >
          {rappActi && (
            <TenuCaisRegiShel
              synthese={rappActi.synthese}
              caisses={rappActi.caisses}
            />
          )}
        </div>
      </div>

      {
        //////////
      }

      {
        // <div className="row" >
      }
      <div
        style={{ padding: "2px", paddingLeft: "0px" }}
        className=" col col-xs-12 col-sm-12 col-md-12 col-lg-12 "
      >
        {rappActi && (
          <RegiGestInde
            caisses={rappActi.caisses}
            synthese={rappActi.synthese}
          />
        )}
      </div>

      {
        //   </div>
      }

      {
        //////////
      }

      <div className="row">
        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-12"
        >
          {rappActi && (
            <CaisPomp15H
              caisses={rappActi.caisses}
              synthese={rappActi.synthese}
            />
          )}
        </div>

        <div
          style={{ padding: "2px" }}
          className="col col-xs-12 col-sm-12 col-md-12 col-lg-12"
        >
          <LubrPompPomp />
        </div>
      </div>
    </div>
  );
}
