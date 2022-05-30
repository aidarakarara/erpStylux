import React from "react";

export default function Cartes({ carte }) {
  return (
    <div className="col col-sm-12 col-md-3">
      <div className="card inventaire-card">
        <div className="card-body">
          <h2
            className={`card-title card-total ${
              carte.total >= 30
                ? "defaut"
                : carte.total < 25
                ? "orange"
                : "verte"
            }`}
          >
            {carte.total}
          </h2>
          <h6 className="card-subtitle mb-2 text-muted titre-card">{carte.titre}</h6>
          <ul className="list-group hover list-detail">
            {carte.details.map((detail, index) => (
              <li
                key={`${index}+1`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                detai item
                <span className="badge total-detail ">
                  {detail}
                </span>
              </li>
            ))}
          </ul>

          <a href="#" className="card-link">
            Voir plus
          </a>
        </div>
      </div>
    </div>
  );
}
