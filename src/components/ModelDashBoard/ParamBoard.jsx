import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject } from "../Common/package";
import style from "../Common/component.module.css";
import boardStyle from "./ModelDashBoard.module.css";
import Title from "../Common/title/title";

export const SideParamBoard = ({children, className, style, ...props}) => {
    const parameter = useSelector((state) => state.parameter.info);
    
    return (
        <ul style={{"marginBottom":"0.5rem"}}>
            <Link to={props.link}>
                <li style={style}>Parameters</li>
                {!isEmptyObject(parameter) &&
                    Object.entries(parameter).map(setting => (
                            <li style={{"paddingLeft":"0.5rem"}}>
                                <p style={{"wordBreak":"break-all"}}>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p></li>
                ))}
            </Link>
        </ul>
    )
}

export const ParamBoard = () => {
    const parameter = useSelector((state) => state.parameter.info);

    const content = () => {
        if (isEmptyObject(parameter)) {
            return (
                <div className={boardStyle.center}>
                    <span>No Data</span>
                </div>
            )
        } else {
            return (
                <div style={{"display":"flex"}}>
                    {Object.entries(parameter)
                        .map(value => (
                            <li className={boardStyle.li}>{value[0]}&nbsp;:&nbsp;{value[1]}</li>
                    ))}
                </div>
            )
        }
    }

    return (
        <div>
            <Title title="Parameter"/>
            <div className={style.subContainer}>
                {content()}
            </div>
        </div>
    )
}