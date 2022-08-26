import React from "react";
import { useMemo } from "react";

const range = (start, end) => {
    const rangeArray = [];
    var num = end - start
    for (var i = 0; i < num; i++){
        rangeArray[i] = start;
        start++;
    }
    return rangeArray;
}

const TableBody = ({children, ...props}) => {
    const rangeArray = useMemo(
        () => (range(0, Object.values(props.data)[0].length))
    , [])
    
    return (
        <>
            {
                (Array.isArray(rangeArray) && rangeArray.length > 0) &&
                rangeArray.map((idx) => {
                    return (
                        <tr className="mx-1 py-2 border-b-2 border-slate-100 hover:bg-slate-100">
                            {props.columns.map(
                                column => {
                                    return (
                                        <td className="w-5 p-3 mr-2 tracking-widest">
                                            {props.data[column][idx]? props.data[column][idx]: "null"}
                                        </td>  
                            )})}                
                        </tr>
                )})
            }
        </>
    )
}

export default TableBody;