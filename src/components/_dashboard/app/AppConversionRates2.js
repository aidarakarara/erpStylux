import { useState, useEffect } from "react";
import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Box, Card, CardHeader } from "@material-ui/core";
// utils
import { separateur } from "../../../utils/formatNumber";
//
import { BaseOptionChart } from "../../charts";
//
import api from "src/api/api";

// ----------------------------------------------------------------------

export default function AppConversionRates() {
  const [comercials, setComercial] = useState([]);
  const CHART_DATA = [
    { data: comercials && comercials.map((com) => com.total) },
  ];

  useEffect(function () {
    api.get("api/vente-commercial").then((res) => setComercial(res.data));
  }, []);
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => `${separateur(seriesName)} litres`,
        title: {
          formatter: (seriesName) => `carburants vendus: `,
        },
      },
    },

    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "10%",
        borderRadius: 2,
      },
    },

    xaxis: {
      categories: comercials && comercials.map((com) => com.user),
    },
  });

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12">
        <Box sx={{ mx: 2 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={CHART_DATA}
            options={chartOptions}
            height={450}
          />
          <h6 style={{ textAlign: "center", color: "silver" }}>
            volume de carburant vendu en Litre (L)
          </h6>
        </Box>
      </div>
    </div>
  );
}
