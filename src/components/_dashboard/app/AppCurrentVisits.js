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
import { separateur } from "src/utils/formatNumber";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 380;
const LEGEND_HEIGHT = 70;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  padding: 10,
  marginTop: theme.spacing(0),
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

export default function AppCurrentVisits({ recettes }) {
  const theme = useTheme();
  const CHART_DATA = [
    // +recettes.carburants,
    +recettes.lubrifiants,
    +recettes.accessoires,
    + recettes.lavages,
  ];
  const chartOptions = merge(BaseOptionChart(), {
    colors: [/* "#e53935", */ "#2c2e20", "#8e24aa", "#00acc1"],
    labels: [/* "Carburants", */ "Lubrifiants", "Accessoires", "Lavages"],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,

      y: {
        formatter: (seriesName) => `${separateur(seriesName)} FCFA`,
        title: {
          formatter: (seriesName) => `${seriesName} `,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <ChartWrapperStyle dir="ltr">
      <ReactApexChart
        type="pie"
        series={CHART_DATA}
        options={chartOptions}
        height={300}
      />
    </ChartWrapperStyle>
  );
}
