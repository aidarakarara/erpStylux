import React, { useState } from "react";

export default function Tr({ produit, setData }) {
  const [ouv, setOuv] = useState(produit.ouv);
  const [ferm, setFerm] = useState(produit.ferm);
  const [ent, setEnt] = useState(produit.ent);
  function setProduit() {
    var monproduit = {
      id: produit.id,
      nomproduit: produit.nomproduit,
      ouv,
      ent,
      ferm,
      pu: produit.pu,
    };
    setData(monproduit);
  }
  function total() {
    return Number(ouv) + Number(ent);
  }
  function vente() {
    return total() - Number(ferm);
  }
  function montant() {
    return vente() * Number(produit.pu);
  }
  return (
    <tr>
      <td className="bord" style={{ margin: 10 }}>
        <label className="form-control" style={{ marginTop: "10px" }}>
          {produit.nomproduit}
        </label>
      </td>

      <td className="bord">
        <input
          style={{
            cursor: "pointer",
            backgroundColor: "gray",
            marginTop: "10px",
          }}
          type="number"
          value={ouv}
          onChange={(e) => setOuv(e.target.value)}
          className="form-control center text-white"
        />
      </td>
      <td className="bord">
        <input
          style={{
            cursor: "pointer",
            backgroundColor: "gray",
            marginTop: "10px",
          }}
          type="number"
          value={ent}
          onChange={(e) => setEnt(e.target.value)}
          className="form-control center text-white"
        />
      </td>
      <td className="bord">
        <label className="form-control" style={{ marginTop: "10px" }}>
          {total()}
        </label>
      </td>

      <td className="bord">
        <input
          type="number"
          style={{
            cursor: "pointer",
            backgroundColor: "gray",
            marginTop: "10px",
          }}
          value={ferm}
          onChange={(e) => setFerm(e.target.value)}
          onMouseLeave={() => setProduit()}
          className="form-control center text-white"
        />
      </td>
      <td className="bord">
        <label className="form-control" style={{ marginTop: "10px" }}>
          {vente()}
        </label>
      </td>

      <td className="bord">
        <label className="form-control" style={{ marginTop: "10px" }}>
          {produit.pu}
        </label>
      </td>
      <td className="bord text-right">
        <label className="form-control" style={{ marginTop: "10px" }}>
          {montant()} FCFA
        </label>
      </td>
    </tr>
  );
}
