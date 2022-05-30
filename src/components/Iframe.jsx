import React from "react";

export default function Iframe({lien}) {
    //http://localhost:8000/facture/1?telecharger&mois=11&anne=2021
  return (
    <div className="embed-responsive embed-responsive-1by1">
      <iframe
        className="embed-responsive-item"
        src={lien}
        allowfullscreen
      ></iframe>
    </div>
  );
}
