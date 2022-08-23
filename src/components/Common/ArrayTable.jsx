import React, { useState , useCallback, useMemo } from "react";
import "./scrollStyle.css";
import * as tf from "@tensorflow/tfjs";
import TableBody from "./MakeTableBody";
import { useEffect } from "react";

const convertToArray = (data) => {
    const newData = new Object();
    Object.entries(data).map(
        (column) => {
            newData[column[0]] = column[1].arraySync();
        }
    )
    const rangeArray = [];
    const len = Object.values(newData)[0].length;
    var start = 0
    for (var i = 0; i < len; i++) {
        rangeArray[i] = start;
        start++;
    }

    return {
        length: rangeArray,
        data: newData
    }
}

const ArrayTable = ({children, ...props}) => {
    const [hovering, setHovering] = useState(false);

    const handleMouseOver = useCallback(() => {
        !hovering &&
        setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering &&
        setHovering(false);
    }, [hovering]);

    const {rangeArray , data} = useMemo(() => convertToArray(props.data))
    console.log(rangeArray, data);
    
    return (
        <div>
            { (Array.isArray(props.columns) && props.columns.length > 0) && 
                <div className={`${hovering? "scrollhost":"disViable"} max-h-[28rem]`}
                     onMouseLeave={handleMouseOut}
                     onMouseEnter={handleMouseOver}
                >
                    <table className="w-full p-4">
                        <thead>
                            <tr key={"column"}
                                className="border-b-2 border-yellow-300">
                                { props.columns
                                    .map((column) => (
                                    <th className="sticky top-0 text-left p-3 border-r-8 border-slate-50 bg-slate-50 z-10">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rangeArray.map((idx) => {
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
                                )})
                            }
                        </tbody>
                        <tbody>
                            <tr className=" sticky bottom-0 bg-slate-50">{children}</tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default React.memo(ArrayTable);