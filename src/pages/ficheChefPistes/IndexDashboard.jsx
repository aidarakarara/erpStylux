// material
import React, { useEffect, useState } from "react";
import carburant from "../../components/carburant.svg";
import bouteille from "../../components/engine-oil.svg";
import access from "../../components/acc.svg";
import lavage from "../../components/lavage.svg";
import tpe from "../../components/tpe.svg";
import client from "../../components/client.svg";
import depense from "../../components/depense.svg";
import { Line } from "react-chartjs-2";
import { Card } from "@material-ui/core";
import { useParams } from "react-router-dom";
// components
import Page from "../../components/Page";
import {
  AppItemOrders,
  AppCurrentVisits,
  AppBugReports,
  AppConversionRates,
} from "../../components/_dashboard/app";
import Cuve from "../../components/cuve/Cuve";
import api from "src/api/api";
import { Chart } from "react-charts";
import { separateur } from "src/utils/formatNumber";

// ----------------------------------------------------------------------

export default function Index() {
  let { date } = useParams();

  const [cuves, setCuves] = useState(null);
  const [carburants, setCarburants] = useState([]);
  const [courbeCarb, setCourbeCarb] = useState([]);
  const [tTpe, setTtpe] = useState(null);
  const [tbClent, setTbClient] = useState(null);
  const [tDepense, setTdepense] = useState(null);
  const [tLavage, setTlavage] = useState(null);
  const [courbeLav, setCourbeLav] = useState([]);
  const [courbeLub, setCourbeLub] = useState([]);
  const [courbeAcc, setCourbeAcc] = useState([]);
  const [recettes, setRecettes] = useState({});

  //cumul mois recette
  const [totallubrifiant, setTotallubrifiant] = useState(null);
  const [totallavage, setTotallavage] = useState(null);
  const [totalaccessoire, setTotalaccessoire] = useState(null);
  const [totalfut, setTotalfut] = useState(null);
  const [totalrecette, setTotalrecette] = useState(null);
  useEffect(() => {
    api.get("api/recapte").then((res) => {
      console.log(res.data);
      setTotallubrifiant(res.data.t_lubMois);
      setTotallavage(res.data.t_lavMois);
      setTotalaccessoire(res.data.t_accMois);
      setTotalfut(res.data.t_futMois);
      setTotalrecette(res.data.t_recetteMois);
    });
    //reordone();
  }, []);
  //fin cumul mois recette

  useEffect(() => {
    api.get("api/reservoirs").then((res) => setCuves(res.data));
    //pour carburant histogramme
    api.get("api/recapte").then((res) => {
      setCarburants(res.data.carburants);
      setTtpe(res.data.t_tpe);
      setTbClient(res.data.t_bClient);
      setTdepense(res.data.t_depense);
      setTlavage(res.data.t_lavage);

      setRecettes({
        accessoires: res.data.t_accMois,
        carburants: 0,
        lavages: res.data.t_lavMois,
        lubrifiants: res.data.t_lubMois,
      });
      //setJours(jours);
      setCourbeCarb(res.data.courbeCarb);
      // setCourbeLav(res.data.courbeslavs);
      setCourbeLub(res.data.courbeslubs);
      setCourbeAcc(res.data.courbesaccs);
      setCourbeLav(res.data.courbeslavs);
    });

    //reordone();
  }, []);

  const data3 = React.useMemo(
    () => [
      {
        label: "vente",
        color: "#2c2e20",
        data: [
          ["Jan", 0],
          ["Fev", 0],
          ["Mars", 0],
          ["Avr", 0],
          ["Mai", 0],
          ["Juin", 0],
          ["Juil", 0],
          ["Aout", 0],
          ["Sept", 0],
          ["Oct", 0],
          ["Nov", 0],
          ["Dec", 0],
        ],
      },
    ],
    []
  );
  const datacarb = React.useMemo(
    () => [
      {
        label: "vente",

        color: "#e53935",
        data: carburants && carburants,
      },
    ],
    [carburants]
  );
  const datalav = React.useMemo(
    () => [
      {
        label: "Montant",
        color: "#00acc1",
        data: courbeLav && courbeLav,
      },
    ],
    [courbeLav]
  );
  const datalub = React.useMemo(
    () => [
      {
        label: "Montant",
        color: "#5d5357",
        data: courbeLub && courbeLub,
      },
    ],
    [courbeLub]
  );
  const dataacc = React.useMemo(
    () => [
      {
        label: "Montant",
        color: "#ab47bc",
        data: courbeAcc && courbeAcc,
      },
    ],
    [courbeAcc]
  );
  const data4 = React.useMemo(
    () => [
      {
        label: "vente",
        color: "#8e24aa",
        data: [
          ["Jan", 0],
          ["Fev", 0],
          ["Mars", 0],
          ["Avr", 0],
          ["Mai", 0],
          ["Juin", 0],
          ["Juil", 0],
          ["Aout", 0],
          ["Sept", 0],
          ["Oct", 0],
          ["Nov", 0],
          ["Dec", 0],
        ],
      },
    ],
    []
  );

  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: false },
    ],
    []
  );

  const datacourbe = {
    labels: courbeCarb && courbeCarb.map((courbe) => courbe.jour),
    datasets: [
      {
        label: "Super",
        data: courbeCarb && courbeCarb.map((courbe) => courbe.super),
        fill: true,
        borderColor: "#01934a",
      },
      {
        label: "Gasoil",
        data: courbeCarb && courbeCarb.map((courbe) => courbe.gasoil),
        fill: "red",
        borderColor: "#Faa100",
      },
    ],
  };

  return (
    <Page title="Tableau de bord - Gerant copié de Chef de Piste">
      {/* ------------  CUVE ---------------------*/}
      <div
        class="row"
        style={{
          marginTop: "-90px",
        }}
      >
        {cuves &&
          cuves.map((cuve, i) => (
            <div class="col-xs-3 col-sm-12 col-md-3" key={i}>
              <Cuve cuve={cuve} />
            </div>
          ))}
      </div>
      {/* ------------  END CUVE -------------------*/}
      {/* ------------  ITEM MONTANT -------------------*/}
      <div className="row pt-5">
        {" "}
        <div className="col-md-6 col-lg-3" style={{ padding: "0px" }}>
          <AppItemOrders
            chiffre={
              carburants && carburants.length > 0
                ? /* separateur */ carburants[carburants.length - 1][1]
                    .toFixed(2)
                    .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
                : 0
            }
            licon={carburant}
            title="Carburants"
            color="linear-gradient(60deg, #ef5350, #e53935)"
            ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(244 67 54 / 40%)"
          />
        </div>
        <div className="col-md-6 col-lg-3 " style={{ padding: "0px" }}>
          <AppItemOrders
            chiffre={separateur(totallubrifiant)}
            licon={bouteille}
            title="Lubrifiants"
            color="linear-gradient(60deg, #5d5357, #2c2e20)"
            ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(108 120 132 / 40%)"
          />
        </div>
        <div className="col-md-6 col-lg-3" style={{ padding: "0px" }}>
          <AppItemOrders
            chiffre={separateur(totalaccessoire)}
            licon={access}
            title="Accessoires"
            color="linear-gradient(60deg, #ab47bc, #8e24aa)"
            ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 40%)"
          />
        </div>
        <div className="col-md-6 col-lg-3" style={{ padding: "0px" }}>
          <AppItemOrders
            chiffre={separateur(totallavage)}
            licon={lavage}
            title="Lavages"
            color="linear-gradient(60deg, #26c6da, #00acc1)"
            ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 40%)"
          />
        </div>
      </div>
      {/* ------------  FIN ITEM MONTANT -------------------*/}
      {/* ------------  DEBUT GRAPHE MONTANT -------------------*/}
      <div className="row" style={{ marginTop: "60px" }}>
        <div className="col-xs-3 col-sm-12 col-md-3">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ef5350, #e53935)",
              color: "white",
              textAlign: "center",
              width: "100%",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(244 67 54 / 40%)",
            }}
            className="mb-2"
          >
            <h2 className="titre-dash"> Carburants</h2>
          </div>
          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "5px",
              height: "250px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <Chart tooltip data={datacarb} series={series} axes={axes} />
          </Card>
        </div>

        <div className="col-xs-3 col-sm-12 col-md-3">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #5d5357, #2c2e20)",
              color: "white",
              textAlign: "center",
              width: "100%",
              right: "1%",

              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(108 120 132 / 40%)",
            }}
            className="mb-2"
          >
            <h2 className="titre-dash">Lubrifiants</h2>
          </div>

          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "5px",
              height: "250px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <Chart tooltip data={datalub} series={series} axes={axes} />
          </Card>
        </div>
        <div className="col-xs-3 col-sm-12 col-md-3">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "100%",
              right: "1%",

              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 40%)",
            }}
            className="mb-2"
          >
            <h2 className="titre-dash">Accessoires</h2>
          </div>

          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "5px",
              margin: "auto",
              height: "250px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <Chart tooltip data={dataacc} series={series} axes={axes} />
          </Card>
        </div>
        <div className="col-xs-3 col-sm-12 col-md-3">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #26c6da, #00acc1)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "100%",
              right: "1%",

              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 40%)",
            }}
            className="mb-2"
          >
            <h2 className="titre-dash"> Lavages</h2>
          </div>

          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "5px",
              margin: "auto",
              height: "250px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <Chart tooltip data={datalav} series={series} axes={axes} />
          </Card>
        </div>
      </div>
      {/* ------------  FIN GRAPHE MONTANT -------------------*/}
      {/* ------------  DEBUT VENTE VOLUME COURBE CERCLE -------------------*/}
      <div className="row pt-5">
        {" "}
        <div className="col-xs-6 col-sm-6 col-md-6 pr-1 mt-5">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ffa726, #fb8c00)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "100%",
              right: "1%",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%)",
            }}
          >
            <h2 className="titre-dash"> Ventes cumulées de carburant</h2>
          </div>
          <Card
            style={{
              height: "380px",
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "10px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <Line style={{ padding: "30px" }} data={datacourbe} />
          </Card>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 pr-1 mt-5">
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ffa726, #fb8c00)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "100%",
              right: "1%",

              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%)",
            }}
          >
            <h2 className="titre-dash"> Recettes services de ce mois</h2>
          </div>
          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <AppCurrentVisits recettes={recettes && recettes} />
          </Card>
        </div>
      </div>
      {/* ------------  FIN VENTE VOLUME COURBE CERCLE-------------------*/}{" "}
      <div className="row justify-content-center m-5">
        <div className="col-xs-4 col-sm-12 col-md-4">
          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "5px",
              margin: "5px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <AppBugReports
              bgcolor="linear-gradient(60deg, #0D4848,#5D9898)"
              nombre={
                tTpe &&
                /* separateur */ tTpe
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
              licone={tpe}
              titre="Cartes TPE"
              color="#EEEEEE"
              ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(108 120 132 / 60%)"
            />
          </Card>
        </div>
        <div className="col-xs-4 col-sm-12 col-md-4">
          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "5px",
              margin: "5px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <AppBugReports
              bgcolor="linear-gradient(60deg, #0D4848,#5D9898)"
              nombre={
                tbClent &&
                /* separateur */ tbClent
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
              licone={client}
              titre="Bons Clients"
              color="#EEEEEE"
              ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(93 152 152 / 60%)"
            />
          </Card>
        </div>
        <div className="col-xs-4 col-sm-12 col-md-4 ">
          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "5px",
              margin: "5px",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <AppBugReports
              bgcolor="linear-gradient(60deg, #0D4848,#5D9898)"
              nombre={
                tDepense &&
                /* separateur */ tDepense
                  .toFixed(2)
                  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
              }
              licone={depense}
              titre="Dépenses"
              color="#EEEEEE"
              ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(93 152 152 / 60%)"
            />
          </Card>
        </div>
      </div>
      {/* ------------  DEBUT VENTE TPE DEPENSE BONS CLIENTS-------------------
      <div className="row mt-5" style={{ marginTop: "1000px" }}>
        <div className="col-sm-12 col-md-12">
          <Card
            style={{
              background: "linear-gradient(60deg, #0D4848,#5D9898)",
              border: " red solid 5px",
              borderRadius: "0px",
              padding: "50px",
              margin: "auto",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <Grid container spacing={3}>
              <Card
                style={{
                  backgroundColor: "#EEEEEE",
                  border: "0px",
                  borderRadius: "0px",
                  padding: "50px",
                  margin: "auto",
                  boxShadow:
                    "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
                }}
              >
                <Grid item xs={12} sm={6} md={12}>
                  <AppBugReports
                    bgcolor="linear-gradient(60deg, #0D4848,#5D9898)"
                    nombre={tTpe && tTpe.toLocaleString("fr-FR")}
                    licone={tpe}
                    titre="Montants Cartes TPE"
                    color="#EEEEEE"
                    ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(108 120 132 / 60%)"
                  />
                </Grid>
              </Card>
              <Card
                style={{
                  backgroundColor: "#EEEEEE",
                  border: "0px",
                  borderRadius: "0px",
                  padding: "50px",
                  margin: "auto",
                  boxShadow:
                    "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
                }}
              >
                <Grid item xs={12} sm={6} md={12}>
                  <AppBugReports
                    bgcolor="linear-gradient(60deg, #0D4848,#5D9898)"
                    nombre={tbClent && tbClent.toLocaleString("fr-FR")}
                    licone={client}
                    titre="Bons Clients"
                    color="#EEEEEE"
                    ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(93 152 152 / 60%)"
                  />
                </Grid>
              </Card>
              <Card
                style={{
                  backgroundColor: "#EEEEEE",
                  border: "0px",
                  borderRadius: "0px",
                  padding: "50px",
                  margin: "auto",
                  boxShadow:
                    "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(93 152 152 / 40%)",
                }}
              >
                <Grid item xs={12} sm={6} md={12}>
                  <AppBugReports
                    bgcolor="linear-gradient(60deg, #0D4848,#5D9898)"
                    nombre={tDepense && tDepense.toLocaleString("fr-FR")}
                    licone={depense}
                    titre="Total des Dépenses"
                    color="#EEEEEE"
                    ombre="0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(93 152 152 / 60%)"
                  />
                </Grid>
              </Card>
            </Grid>
          </Card>
        </div>
      </div>
      <br />
      {/* ------------  FIN VENTE TPE DEPENSE BONS CLIENTS -------------------*/}
      {/* ------------  DEBUT VENTE PAR EMPLOYE -------------------*/}
      <div className="row mt-5">
        {" "}
        <div
          className="col-xs-6 col-sm-12 col-md-6"
          style={{
            height: "auto",
          }}
        >
          <div
            style={{
              fontSize: 30,
              background: "linear-gradient(60deg, #ffa726, #fb8c00)",
              color: "white",
              textAlign: "center",
              margin: "auto",
              width: "100%",
              right: "1%",

              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%)",
            }}
          >
            <h2 className="titre-dash"> volume de Vente par pompiste</h2>
          </div>
          <Card
            style={{
              backgroundColor: "transparent",
              border: "0px",
              borderRadius: "0px",
              padding: "50px",
              margin: "auto",
              boxShadow:
                "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 0 0 / 40%)",
            }}
          >
            <AppConversionRates />
          </Card>
        </div>
      </div>
      {/* ------------  FIN VENTE PAR EMPLOYE -------------------*/}
      <br />
      <br />
      <br />
    </Page>
  );
}
