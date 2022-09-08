import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject, isEmptyStr } from "../Common/package";
import Title from "../Common/title/title";
import style from "../Common/component.module.css";
import boardStyle from "./ModelDashBoard.module.css";

export const SideCompileBoard = ({children, className, style, ...props}) => {
    const compile = useSelector((state) => state.compile);

    return (
        <ul style={{"marginBottom":"0.5rem"}}>
            <Link to={props.link}>
            <li style={style}>Compiles</li>
            {!isEmptyObject(compile) &&
                Object.entries(compile).map(setting => {
                    if (setting[0] === "optimizer" && !isEmptyObject(setting[1])){
                        return (
                            <li style={{"paddingLeft":"0.5rem"}}>
                                <p style={{"wordBreak":"break-all"}}>{setting[0]}:&nbsp; &nbsp;{setting[1].title}</p>
                                {!isEmptyObject(setting[1].value) &&
                                    Object.entries(setting[1].value).map(item => (
                                            <p style={{"wordBreak":"break-all",
                                                    "paddingLeft":"2rem"}}>
                                                {item[0]}&nbsp; &nbsp;{item[1]}
                                            </p>
                                ))}
                            </li>  
                        )
                    }
                    if (setting[0] === "loss" && !isEmptyStr(setting[1])){
                        return (
                            <li style={{"paddingLeft":"0.5rem"}}>
                                <p style={{"wordBreak":"break-all"}}>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p>
                            </li>
                        )
            }})}
           </Link>
        </ul>
    )
}

export const CompileBoard = () => {
    const compile = useSelector(state => state.compile);

    const optimizerContent = () => {
        if (isEmptyObject(compile.optimizer)){
            return (
                <div className={boardStyle.center}>
                    <span >No Data</span>
                </div>
            )
        } else {
            return (
                <div>
                    <Title title={compile.optimizer.title}/>
                    <div style={{"display":"flex"}}>
                        {Object.entries(compile.optimizer.value)
                            .map(value => (
                                <li className={boardStyle.li}>{value[0]}&nbsp;:&nbsp;{value[1]}</li>
                        ))}
                    </div>
                </div>
            )
        }
    }

    const lossContent = () => {
        if (isEmptyStr(compile.loss)){
            return (
                <div className={boardStyle.center}>
                    <span >No Data</span>
                </div>
            )
        } else {
            return (
                    <li className={boardStyle.li}>{compile.loss}</li>
            )
        }
    }

    return (
        <div>
            <Title title="optimizer"/>
            <div className={style.subContainer}>
                {optimizerContent()}
            </div>
            <Title title="loss"/>
            <div className={style.subContainer}>
                {lossContent()}
            </div>
        </div>
    )    
}