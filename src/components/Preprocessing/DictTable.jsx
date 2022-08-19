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
        <div>
            { props.data.length > 0 &&
                <div className={`${hovering? "scrollhost":"disViable"} max-h-[28rem]`}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseOut}
                >
                    <table className="w-full p-4">
                        <thead>
                            <tr key={"column"}
                                className="border-b-2 border-yellow-300">
                                { props.columns.map((column) => (
                                    <th className="sticky top-0 text-left p-3 border-r-8 border-slate-50 bg-slate-50 z-10">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
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
                </div>
            }
        </div>
    )
}

export default React.memo(DictTable);