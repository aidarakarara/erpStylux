import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import TableList from "./TableListPompe";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function IlotsPompesList() {
  let { id } = useParams();
  const [pompes, setPompes] = useState(null);
  const [ilots, setIlots] = useState(null);
  useEffect(() => {
    api.get(`api/ilots/${id}/pompes`).then((res) => setPompes(res.data));
    api.get("api/ilots").then((res) => setIlots(res.data));
  }, []);

  //supression d'un pompes
  const supprimer = (data) => {
    api.delete(`api/pompes/${data.id}`).then((res) => {
      setPompes(pompes.filter((el) => el.id != data.id));
      toast.warn(`La Pompe a été Suprimer`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
  const notifierM = () =>
    toast.success(`La Pompe a été modifiée`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //supression d'un pompes
  const modifierPompe = (id, data) => {
    api.get("sanctum/csrf-cookie").then((response) => {
      api.put(`api/pompes/${id}`, data).then((res) => {
        api.get("api/pompes").then((res) => setPompes(res.data));
        notifierM();
      });

    })
  };
  return (
    <div className="container">
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {pompes && (
        <TableList
          suprimerPome={supprimer}
          modifierPompe={modifierPompe}
          pompes={pompes}
          ilots={ilots}
        />
      )}
    </div>
  );
}
