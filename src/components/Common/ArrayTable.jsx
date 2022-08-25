import React, { useState , useCallback, useRef } from "react";
import { useEffect } from "react";
import PreprocessingOptions from "../Preprocessing/PreprocessingOption";
import { isEmptyArray } from "./package";
import "./scrollStyle.css";
import TableBody from "./TableBody";

const ArrayTable = ({children, ...props}) => {
    const [hovering, setHovering] = useState(false);

    const ref = useRef(null);

    useEffect(
        () => {

        }
    , [ref.current])
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
                <div className={`${hovering? "scrollhost":"disViable"} w-full h-96 overflow-auto`}
                    onMouseLeave={handleMouseOut}
                    onMouseEnter={handleMouseOver}>
                    <table className="w-full">
                        <thead>
                            <tr key={"column"}
                                className="border-b-2 border-yellow-300">
                                { props.columns
                                    .map((column) => (
                                    <th className="sticky top-0 text-left p-3 border-r-8 border-slate-50 bg-slate-50"
                                        ref={ref}
                                        on>
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
                        <tbody>
                            <tr className="">
                                {
                                    props.hasChild &&
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