import React from "react";
import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Diagramme de flux des entrées et des sorties",
    },
  },
};

export default function TableBord() {
  const datacourbe = {
    labels: ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"],
    datasets: [
      {
        label: "Entrées",
        data: [12, 200, 223, 100, 20, 2, 5, 15],
        fill: true,
        borderColor: "rgba(79, 56, 247, 0.6)",
        backgroundColor: "rgba(79, 56, 247, 0.1)",
      },
      {
        label: "Sorties",
        data: [52, 20, 60, 20, 200, 50, 12],
        fill: true,
        borderColor: "#f20a62",
        backgroundColor: "rgba(242, 10, 98,0.1)",
      },
    ],
  };
  return (
    <div>
      <h2 className="titre-dash">Flux des entrées et des sorties</h2>
      <Line data={datacourbe} options={options} />
    </div>
  );
}
