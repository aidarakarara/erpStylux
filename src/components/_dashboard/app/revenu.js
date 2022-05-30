import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Card, CardHeader } from "@material-ui/core";
// utils
import { fNumber } from "../../../utils/formatNumber";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [4344, 5435, 1443, 4443];

export default function AppCurrentVisits() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: ["#e53935", "#2c2e20", "#8e24aa", "#00acc1"],
    labels: ["Carburants", "Lubrifiants", "Accessoires", "Lavages"],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <div className="row mx-2">
      <div className="col-xs-12 col-sm-12 col-md-12">
        <Card style={{ marginTop: "-10px" }}>
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
            Récapitulatif mensuel des revenus{" "}
          </div>
          <ChartWrapperStyle dir="ltr">
            <ReactApexChart
              type="pie"
              series={CHART_DATA}
              options={chartOptions}
              height={280}
            />
          </ChartWrapperStyle>
        </Card>
      </div>
    </div>
  );
}
