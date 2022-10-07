import React, { useState , useCallback } from "react";
import { isEmpty, isEmptyArray } from "../package";
import "./scrollStyle.css";
import tableStyle from "./table.module.css";

const ArrayTable = ({children, style,...props}) => {
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
                    className={`${hovering? "scrollhost":"disViable"} ${tableStyle.container}`}
                    style={style}
                    onMouseLeave={handleMouseOut}
                    onMouseEnter={handleMouseOver}
                >
                    <table style={{"width":"100%"}}>
                        <thead>
                            <tr 
                                key={"column"}
                                className={tableStyle.theadTr}
                            >
                                { props.columns.map((column) => (
                                        <th className={tableStyle.th}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            { Object.values(props.data)[0].map((_, idx) => (
                                <tr className={tableStyle.tbodyTr}>
                                    {props.columns.map(
                                        column => (
                                                <td className={tableStyle.td}>
                                                    {!isEmpty(props.data[column][idx])? props.data[column][idx]: "null"}
                                                </td>  
                                    ))}                
                                </tr>
                            ))}
                        </tbody>
                        <tbody>
                            <tr>
                                { props.hasChild &&
                                    props.columns.map((_) => (
                                        <th className={tableStyle.children}>
                                            {children}
                                        </th>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default React.memo(ArrayTable);