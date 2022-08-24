import React, { useState , useCallback } from "react";
import { isEmptyArray } from "./package";
import "./scrollStyle.css";
import TableBody from "./TableBody";

const ArrayTable = ({children, ...props}) => {
    const [hovering, setHovering] = useState(false);
    const [tbodyHover, setTbodyHover] = useState(false);

    const handleMouseOver = useCallback(() => {
        !hovering &&
        setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering &&
        setHovering(false);
    }, [hovering]);

    return (
        <>
            { !isEmptyArray(props.columns) && 
                <div className={`${hovering? "scrollhost":"disViable"} max-w-full max-h-fit overflow-auto`}
                    onMouseLeave={handleMouseOut}
                    onMouseEnter={handleMouseOver}>
                    <table className="w-full">
                        <thead>
                            <tr key={"column"}
                                className="border-b-2 border-yellow-300">
                                { props.columns
                                    .map((column) => (
                                    <th className="sticky top-0 text-left p-3 border-r-8 border-slate-50 bg-slate-50">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody 
                            className={`${hovering? "scrollhost":"disViable"} max-w-full max-h-96 overflow-auto`}
                            onMouseLeave={handleMouseOut}
                            onMouseEnter={handleMouseOver}>
                            <TableBody
                                data={props.data}
                                columns={props.columns}
                            />
                        </tbody>
                        <tbody className="relative">
                            <tr className="sticky bottom-0 left-0 text-left p-3 bg-slate-50">
                                {
                                    props.columns.map((_) => (
                                        <td className="text-center">
                                            {children}
                                        </td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default React.memo(ArrayTable);