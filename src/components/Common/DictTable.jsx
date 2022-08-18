import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import "./scrollStyle.css";

const DictTable = ({props}) => {
    const [hovering, setHovering] = useState(false);

    const handleMouseOver = useCallback(() => {
        !hovering &&
        setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering &&
        setHovering(false);
    }, [hovering]);
    return (
        <div className={`${hovering? "scrollhost":"disViable"} max-h-[28rem]`}
             onMouseEnter={handleMouseOver}
             onMouseLeave={handleMouseOut}
        >
            { props.data.length > 0 && 
                <table className="w-full p-4">
                    <thead>
                        <tr key={"column"}
                            className="border-b-2 border-yellow-300">
                            { props.columns.map((column) => (
                                <th className="text-left p-3 border-r-8 border-slate-50">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="">
                        { props.data.map((items, idx) => {
                            return (
                                <tr className="mx-1 py-2 border-b-2 border-slate-100"
                                    key={idx}>
                                    {
                                        props.columns.map((column) => (
                                                <td className="w-5 p-3 mr-2 tracking-widest">
                                                    {items[column]}
                                                </td>
                                            )
                                        )
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default DictTable;