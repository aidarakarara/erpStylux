import React ,{useEffect ,useState} from 'react'

export default function Tr({ data, setData, addLine, numeroCompte }) {
    function thisSetData() {
        setData(data);
        addLine(data.rang);
    }
    return (
        <tr >
            <td className="bordL bordR2">
                <input value={data.ventCartTPE.numeCart} onChange={(e) => { data.ventCartTPE.numeCart = e.target.value; thisSetData() }} type="text" className="form-control" />
            </td>
            <td className="bordR">
                <input  value={ data.ventCartTPE.mont } onChange={(e) => { data.ventCartTPE.mont = e.target.value; thisSetData() }} type="number" className="form-control" />
            </td>
            <td className="bordR2">
                <input value={ data.clie.nomClie } onChange={(e) => { data.clie.nomClie = e.target.value; thisSetData() }} type="text" className="form-control" />
            </td>
            <td className="bordR">
                <input value={ data.clie.mont } onChange={(e) => { data.clie.mont = e.target.value; thisSetData() }} type="number" className="form-control" />
            </td>
            { numeroCompte == "2" && (
                <>
                    <td className="bordR2">
                        <input value={ data.depe.just } onChange={(e) => { data.depe.just = e.target.value; thisSetData() }} type="text" className="form-control" />
                    </td>
                    <td className="bordR">
                        <input value={ data.depe.mont } onChange={(e) => { data.depe.mont = e.target.value; thisSetData() }} type="number" className="form-control" />
                    </td>
                </>)
            }
        </tr>
    )
}
