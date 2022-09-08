import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyArray, isEmptyObject } from "../Common/package";
import Title from "../Common/title/title";
import style from "../Common/component.module.css";
import boardStyle from "./ModelDashBoard.module.css";
import { LayerList } from "../Setting/Layers/LayerList";

export const SideLayerBoard = ({children, className, style, ...props}) => {
    const layers = useSelector((state) => state.layers.info);

    return (
        <ul style={{"marginBottom":"0.5rem"}}>
            <Link to={props.link}>
                <li style={style}>Layers</li>
                {!isEmptyObject(layers) &&
                    layers.map((layer) => (
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
                )}
            </Link>
        </ul>
    )
}

export const LayerBoard = () => {
    const layers = useSelector((state) => state.layers.info);

    const content = () => {
        if (isEmptyArray(layers)){
            return (
                <div className={boardStyle.center}>
                    <span>No Data</span>
                </div>
            )
        } else {
            return (
                <LayerList
                    style={{"maxHeight":"24rem"}}
                    data={layers}/>
            )
        }
    }

    return (
        <div>
            <Title title="Layers"/>
            <div className={style.subContainer}>
                {content()}
            </div>
        </div >
    )
}