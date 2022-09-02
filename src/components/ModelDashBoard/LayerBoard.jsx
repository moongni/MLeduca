import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject } from "../Common/package";

const LayerBoard = ({children, className, style, ...props}) => {
    const layers = useSelector((state) => state.layers.info);
    return (
        <ul style={{"marginBottom":"0.5rem"}}>
            <Link to={props.link}>
                <li style={style}>Layers</li>
                {!isEmptyObject(layers) &&
                    layers.map((layer) => {
                        return (
                            <li style={{"paddingLeft":"0.5rem"}}>
                                <p style={{"wordBreak":"break-all"}}>
                                    {layer.idx} Layer
                                </p>
                                {Object.entries(layer.info).map(item => {
                                        return (
                                            <p style={{"wordBreak":"break-all"}}>{item[0]}&nbsp; &nbsp;{item[1]}</p>
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