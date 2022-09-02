import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject, isEmptyStr } from "../Common/package";

const CompileBoard = ({children, className, style, ...props}) => {
    const compile = useSelector((state) => state.compile);

    return (
        <ul style={{"marginBottom":"0.5rem"}}>
            <Link to={props.link}>
            <li style={style}>Compiles</li>
            {
                !isEmptyObject(compile) &&
                Object.entries(compile).map(setting => {
                    if (setting[0] === "optimizer" && !isEmptyObject(setting[1])){
                        return (
                            <li style={{"paddingLeft":"0.5rem"}}>
                                <p style={{"wordBreak":"break-all"}}>{setting[0]}:&nbsp; &nbsp;{setting[1].title}</p>
                                {
                                    !isEmptyObject(setting[1].value) &&
                                    Object.entries(setting[1].value).map(item => {
                                        return (
                                            <p style={{"wordBreak":"break-all",
                                                    "paddingLeft":"2rem"}}>
                                                {item[0]}&nbsp; &nbsp;{item[1]}
                                            </p>
                                        )
                                    })
                                }
                            </li>  
                        )
                    }
                    if (setting[0] === "loss" && !isEmptyStr(setting[1])){
                        return (
                            <li style={{"paddingLeft":"0.5rem"}}>
                                <p style={{"wordBreak":"break-all"}}>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p>
                            </li>
                        )
                    }
                })
            }
        </Link>
    </ul>
    )
}

export default CompileBoard;