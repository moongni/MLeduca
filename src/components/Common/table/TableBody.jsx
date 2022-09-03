import React from "react";
import { useMemo } from "react";
import { isEmptyArray } from "../package";

const range = (start, end) => {
    const rangeArray = [];
    var num = end - start
    for (var i = 0; i < num; i++){
        rangeArray[i] = start;
        start++;
    }
    return rangeArray;
}

const TableBody = ({children, style, ...props}) => {
    const rangeArray = useMemo(
        () => (range(0, Object.values(props.data)[0].length))
    , [])
    
    return (
        <>
            {!isEmptyArray(rangeArray) &&
                rangeArray.map((idx) => {
                    return (
                        <tr className={style.tbodyTr}>
                            {props.columns.map(
                                column => {
                                    return (
                                        <td className={style.td}>
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