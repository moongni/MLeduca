import React, { useState , useCallback } from "react";
import "./scrollStyle.css";
import TableBody from "./TableBody";

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

    return (
        <>
            { (Array.isArray(props.columns) && props.columns.length > 0) && 
                <div className={`${hovering? "scrollhost":"disViable"} max-h-[28rem] overflow-auto`}
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
                        <tbody>
                            <TableBody
                                data={props.data}
                                columns={props.columns}
                            />
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default React.memo(ArrayTable);