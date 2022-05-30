import React from "react";
import { Chrono } from "react-chrono";
import { separateur } from "src/utils/formatNumber";
export default function TimeLine({ details }) {
  const items = details.map((detail) => {
    return {
      title: `${detail?.date}`,
      cardTitle: `Caisse du ${detail?.date}`,
      cardSubtitle: `${separateur(
        Number(detail?.gasoil) + Number(detail?.super)
      )} litres vendues `,
      cardDetailedText: `Total Carburant : ${separateur(
        detail?.venteTotal
      )} F  ,
        Volume Super ${separateur(detail?.super)} , 
        Volume Gasoil ${separateur(detail?.gasoil)}
      `,
    };
  });
  return (
    <div className="col-12 col-sm-12 col-md-8 col-lg-8">
      <h2 className="titre-dash">Timeline d'activité </h2>
      {/*    theme={{
          primary: "red",
          secondary: "blue",
          cardBgColor: "yellow",
          cardForeColor: "violet",
          titleColor: "red",
        }} */}
      <Chrono
        items={items}
        enableOutline
        scrollable={{ scrollbar: true }}
        mode="VERTICAL_ALTERNATING"
      />
    </div>
  );
}
