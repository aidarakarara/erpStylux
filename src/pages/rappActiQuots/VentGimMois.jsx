import React, { useState } from "react";
import './ventGimMois.css';
import { Table } from "react-bootstrap";
import ReactDOM from "react-dom";


export default function VentGimMois() {

         
     
    return (

        <div className="ficheVentGimMois">

        <Table className="tableVentGimMois " hover striped bordered size="sm" >
            <thead >
               <tr  className="center color titre ">
                    <th colSpan="2" > VENTES GIM MOIS </th>
                </tr>
            </thead>

            <tbody className="center" >
                <tr className="ventGim ">
                    <th style={{padding : 10}}> JOUR </th>
                    <th style={{padding : 10}}> MOIS </th>
                </tr>
                <tr className="ventGim">
                <td  style={{ textAlign: "center"}}> pas de GIM </td>
                <td  style={{ textAlign: "center"}}>  </td>
              </tr>
                
              </tbody>
            </Table>


       </div>
 
       
  );
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<GestStocCarb />, rootElement);



