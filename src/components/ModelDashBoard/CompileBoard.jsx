import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject, isEmptyStr } from "../Common/package";
const CompileBoard = ({children, className, style, ...props}) => {
    const compile = useSelector((state) => state.compile);
    return (
        <ul className='mb-2'>
            <Link to={props.link}>
            <li className='text-lg font-medium'>Compiles</li>
            {
                !isEmptyObject(compile) &&
                Object.entries(compile).map(setting => {
                    if (setting[0] === "optimizer" && !isEmptyObject(setting[1])){
                        return (
                            <li className='pl-2'>
                                <p className='break-all'>{setting[0]}:&nbsp; &nbsp;{setting[1].title}</p>
                                {
                                    !isEmptyObject(setting[1].value) &&
                                    Object.entries(setting[1].value).map(item => {
                                        return (
                                            <p className='pl-8 break-all'>{item[0]}&nbsp; &nbsp;{item[1]}</p>
                                        )
                                    })
                                }
                            </li>  
                        )
                    }
                    if (setting[0] === "loss" && !isEmptyStr(setting[1])){
                        console.log("isEmptyStr", isEmptyStr(setting[1]))
                        return (
                            <li className='pl-2'>
                                <p className='break-all'>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p>
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