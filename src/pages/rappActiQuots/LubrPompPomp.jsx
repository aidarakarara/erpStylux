import React, { useState } from "react";
import './lubrPompPomp.css';
import { Table } from "react-bootstrap";
import ReactDOM from "react-dom";


export default function LubrPompPomp() {

    return (

        <div className="ficheLubrPompPomp">

        <Table className="tableLubrPompPomp " hover striped bordered size="sm">
            <thead >
               <tr className="center color titre">
                    <th colSpan="3" className="" style={{padding: "13px"}}> LUBRIFIANTS-POMPE 2 </th>
                    <th colSpan="3" style={{padding: "13px"}}> get ALASSANE BADJI </th>
                </tr>
                <tr  className="lubrPompPomp center ">
                    <th> CODE PDT</th>
                    <th style={{width:"22%"}}>DESIGNATIONS</th>
                    <th className="">P.U</th>
                    <th>VENTES</th>
                    <th>TOTAL</th>
                    <th>SORTIE MAG</th>
                </tr>
            </thead>

            <tbody className="center" >
                <tr className="lubrPompPomp ">
                    <th > 12 847 </th>
                    <th> HELIX HX 5 1L</th>
                    <th  className=""> 3 000</th>
                    <th> {" "}
                        <input type="text" class="form-control text-center" />{" "}
                    </th>
                    <th> 24 000</th>
                    <th> 3 </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th > 12 850 </th>
                    <th> HELIX HX 5 5L</th>
                    <th  className=""> 13 000</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th >  </th>
                    <th> HELIX HX 3 1L</th>
                    <th  className=""> 2 400</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr  className="lubrPompPomp">
                    <th >  </th>
                    <th> HELIX HX 3 5L</th>
                    <th  className=""> 10 600</th>
                    <th>  {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                    </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr> 
                <tr className="lubrPompPomp">
                    <th > 23 365 </th>
                    <th> HELIX HX 7 1L</th>
                    <th className=""> 3 500</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr> 
                <tr className="lubrPompPomp">
                    <th > 23 366 </th>
                    <th> HELIX HX 7 4L</th>
                    <th  className=""> 13 500</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr> 
                <tr className="lubrPompPomp">
                    <th >  </th>
                    <th> RIMULA R1 1L</th>
                    <th  className=""> 2 000</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th >  </th>
                    <th> RIMULA R1 5L</th>
                    <th  className=""> 10 500</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th >  </th>
                    <th> RIMULA R1 209L</th>
                    <th  className=""> 1 600</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th >  </th>
                    <th> RIMULA R2 1L</th>
                    <th  className=""> 2 300</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                    </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th >  </th>
                    <th> RIMULA R1 5L</th>
                    <th  className=""> 10 750</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th > 12 874 </th>
                    <th> RIMULA R2 20L</th>
                    <th  className=""> 40 000</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th >  23 337 </th>
                    <th> SPIRAX ATF 1L</th>
                    <th  className=""> 3 000</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                    </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th > 23 367 </th>
                    <th> ULTRA 1L</th>
                    <th  className=""> 6 000</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                    </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th > 23 368 </th>
                    <th> ULTRA 4L</th>
                    <th  className=""> 22 000</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th > 23 291 </th>
                    <th> GADUS 18 KG</th>
                    <th  className=""> 3 500</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th >  </th>
                    <th> GADUS 180 KG</th>
                    <th  className=""> 3 500</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                    </th>
                    <th> 0 </th>
                    <th>  </th>
                </tr>
                <tr className="lubrPompPomp">
                 <th colSpan="4" className=""> TOTAL A VERSER </th>
                 <th colSpan="2" className="souligne "> 231 050 </th>
                </tr>
                <tr className="lubrPompPomp titre color">
                   <th colSpan="2" className=""> </th>
                    <th>ACCESSOIRES</th>
                    <th>P.U</th>
                    <th>QUANTITE</th>
                    <th> TOTAL </th>
                </tr>
                <tr className="lubrPompPomp" >
                    <th  colSpan="2" className="">  </th>
                    <th> </th>
                    <th  > 0</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                    <th rowSpan="6" > 0 </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th  colSpan="2" className="">  </th>
                    <th> </th>
                    <th  > 0</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                    </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th  colSpan="2" className="">  </th>
                    <th> </th>
                    <th  > 0</th>
                    <th>{" "}
                        <input type="text"  class="form-control text-center" />{" "}
                    </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th  colSpan="2" className="">  </th>
                    <th> </th>
                    <th  > 0</th>
                     <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th  colSpan="2" className="">  </th>
                    <th> </th>
                    <th  > 0</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th  colSpan="2" className="">  </th>
                    <th> Futs Vides</th>
                    <th  > 5000</th>
                    <th> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                     </th>
                </tr>
                <tr className="lubrPompPomp">
                    <th  colSpan="2" className="">  </th>
                    <th className=""> LAVAGE</th>
                    <th className=""> = </th>
                    <th className=""> {" "}
                        <input type="text"  class="form-control text-center" />{" "}
                    </th>
                    <th className=""> 34000 </th>
                </tr>

              </tbody>
            </Table>


       </div>
 
       
  );
}




