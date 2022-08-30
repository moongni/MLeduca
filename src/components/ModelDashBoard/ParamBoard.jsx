import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject } from "../Common/package";

const ParamBoard = ({children, className, style, ...props}) => {
    const parameter = useSelector((state) => state.parameter.info);
    
    return (
        <ul className='mb-2'>
            <Link to={props.link}>
                <li className=' text-lg font-medium'>Parameters</li>
                {
                    !isEmptyObject(parameter) &&
                    Object.entries(parameter).map(setting => (
                            <li className='pl-2'><p className='break-all'>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p></li>
                        ))
                }
            </Link>
        </ul>
    )
}

export default ParamBoard;