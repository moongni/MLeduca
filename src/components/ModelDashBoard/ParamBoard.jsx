import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject } from "../Common/package";

const ParamBoard = ({children, className, style, ...props}) => {
    const parameter = useSelector((state) => state.parameter.info);
    
    return (
        <ul style={{"marginBottom":"0.5rem"}}>
            <Link to={props.link}>
                <li style={style}>Parameters</li>
                {!isEmptyObject(parameter) &&
                    Object.entries(parameter).map(setting => (
                            <li style={{"paddingLeft":"0.5rem"}}>
                                <p style={{"wordBreak":"break-all"}}>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p></li>
                        ))
                }
            </Link>
        </ul>
    )
}

export default ParamBoard;