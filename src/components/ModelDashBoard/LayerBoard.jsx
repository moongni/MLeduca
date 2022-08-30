import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject } from "../Common/package";

const LayerBoard = ({children, className, style, ...props}) => {
    const layers = useSelector((state) => state.layers.info);
    console.log("l",props);
    return (
        <ul className='mb-2'>
            <Link to={props.link}>
                <li className='text-lg font-medium '>Layers</li>
                {
                    !isEmptyObject(layers) &&
                    layers.map((layer) => {
                        return (
                            <li className='pl-2'>
                                <p className='break-all'>{layer.idx} Layer</p>
                                {
                                    Object.entries(layer.info).map(item => {
                                        return (
                                            <p className='break-all'>{item[0]}&nbsp; &nbsp;{item[1]}</p>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }
            </Link>
        </ul>
    )
}

export default LayerBoard;