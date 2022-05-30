// material
import React, { useEffect, useState, useMemo } from "react";
// components
import "./indexDashboard.css";
import Page from "../../components/Page";
import api from "src/api/api";
import { Chart, AxisOptions } from "react-charts";

// ----------------------------------------------------------------------
import { AppConversionRates2 } from "../../components/_dashboard/app";
import Loader from "src/components/loader";
//--------------------------------------------------------------

export default function IndexDashboard() {
  const [venteCarb, setVenteCarb] = useState([]);
  const [gasoil, setGasoil] = useState([]);
  const [superr, setSuperr] = useState([]);

  useEffect(() => {
    load();
  }, []);

  function load() {
    api.get("api/pompistes").then((res) => {
      setVenteCarb(res.data);
      console.log(res.data);
      var gasoilTmp = [];
      var superrTmp = [];
      res.data.map((vent) => {
        gasoilTmp.push({
          primary: vent.jour,
          secondary: vent.gasoil + 0.0000001,
          radius: undefined,
          stacked: true,
        });
        superrTmp.push({
          primary: vent.jour,
          secondary: vent.super + 0.0000001,
          radius: undefined,
          stacked: true,
        });
      });
      setGasoil(gasoilTmp);
      setSuperr(superrTmp);
    });
  }

  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: true },
    ],
    []
  );

  // function fdata() {
  //   var data = [];

  //         label: "total carburant  vendu",
  //         data: [
  //           { primary: v.jour, secondary: v.gasoil, radius: undefined, stacked: true },
  //           { primary: v.jour, secondary: v.super, radius: undefined, stacked: true }
  //         ]

  //   })
  //   return data;
  // }

  // const data = fdata();

  const data = React.useMemo(
    () => [
      {
        label: "Super",
        data: superr,
        color: "#01934A",
      },
      {
        label: "Gasoil",
        data: gasoil,
        color: "#FAA100",
      },
    ],
    [gasoil, superr]
  );

  // const data = [
  //   {
  //     label: "Gasoil",
  //     data: gasoil
  //   },
  //   {
  //     label: "Super",
  //     data: superr
  //   }
  // ]
 
  if (!venteCarb) {
    return <Loader />;
  }

  return (
    <Page title="Tableau de bord | Pompiste" className="">
      {/* ------------  ROW DIAGRAMME EN BARRE -------------------*/}
      {/* ------------  FIN Histogramme à barre horizontal -------------------*/}
      {
        /* -------*************************/
        /////////////////------------------------------------ */
      }
      <div className="row">
        <div
          className="row indexDashbord1 col-xs-6 col-sm-6 col-md-6 pt-5"
          style={{ marginTop: "-60px" }}
        >
          <div className=" titre1 col-xs-12 col-sm-12 col-md-12 pl-1 center">
            <div
              style={{
                fontSize: 30,
                background: "linear-gradient(60deg, #269dff, #0069fb)",
                color: "white",
                textAlign: "center",
                borderRadius: "10px",
                margin: "auto",
                width: "100%",
                marginBottom: "5px",
                marginLeft: "3%",
                marginTop: "-55px",
                boxShadow:
                  "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%)",
              }}
            >
              <h2 className="titre-dash">Mes ventes de ce mois</h2>
            </div>

            <div className="chart1">
              <Chart tooltip data={data} series={series} axes={axes} />
            </div>
          </div>
        </div>

        {/*  2em diagramme   voir css dans  AppConversionRates2 */}

        <div
          className="row indexDashbord1 col-xs-6 col-sm-6 col-md-6 pt-5"
          style={{ margin: "1px", marginTop: "-60px" }}
        >
          <div
            className="titre1 col-xs-12 col-sm-12 col-md-12 pl-1 center"
            style={{
              boxShadow: "2px 2px 15px rgba(2, 165, 51, 0.5) ",
            }}
          >
            <div
              style={{
                fontSize: 30,
                background: "linear-gradient(60deg, #01934a, #52ab56)",
                color: "white",
                textAlign: "center",
                borderRadius: "10px",
                margin: "auto",
                width: "100%",
                marginBottom: "5px",
                marginLeft: "3%",
                marginTop: "-55px",
                boxShadow:
                  "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%)",
              }}
            >
              <h2 className="titre-dash">Vente de ce mois par commercial</h2>
            </div>

            <div className="chart1">
              {" "}
              <AppConversionRates2 />
              {/* ------------  END ROW Ventes cumulées carburants -------------------*/}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
