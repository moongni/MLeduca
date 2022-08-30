import React, { useState , useCallback } from "react";
import { isEmptyArray } from "./package";
import "./scrollStyle.css";
import TableBody from "./TableBody";

const ArrayTable = ({children, className, ...props}) => {
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
        <>
            { !isEmptyArray(props.columns) && 
                <div 
                    className={`${hovering? "scrollhost":"disViable"} w-full h-96 overflow-auto ${className} rounded-2xl bg-slate-50 shadow-sm shadow-slate-400`}
                    onMouseLeave={handleMouseOut}
                    onMouseEnter={handleMouseOver}
                >
                    <table className="w-full">
                        <thead>
                            <tr 
                                key={"column"}
                                className="border-b-2 border-yellow-300"
                            >
                                { props.columns.map((column) => (
                                        <th className="sticky top-0 text-left p-3 border-r-8 border-slate-50 bg-slate-50">
                                            {column}
                                        </th>
                                        )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            <TableBody
                                data={props.data}
                                columns={props.columns}
                            />
                        </tbody>
                        <tbody>
                            <tr>
                                {props.hasChild &&
                                    props.columns.map((_) => (
                                        <th className="sticky bottom-0 text-left p-3 bg-slate-50">
                                            {children}
                                        </th>
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