import React, { useMemo } from "react";

const convertToArray = (data) => {
    const newData = new Object();

    Object.entries(data).map(
        (column) => {
            newData[column[0]] = column[1].arraySync();
        }
    )
    return newData
}

const TableBody = ({...props}) => {
    console.log(props.data);
    const data = convertToArray(props.data);
    const dummy = data[props.columns[0]];

    return (
        dummy.map((_, idx) => {
            return (
                <tr className="mx-1 py-2 border-b-2 border-slate-100">
                    {props.columns.map(
                        column => {
                            return (
                                <td className="w-5 p-3 mr-2 tracking-widest">
                                    {data[column][idx]? data[column][idx]: "null"}
                                </td>  
                            ) 
                        }                    
                    )}                
                </tr>
    )}))
}

export default TableBody