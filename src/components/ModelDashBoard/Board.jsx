import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmptyObject, isEmptyStr, isEmptyArray } from "../Common/package";
import Title from "../Common/title/title";
import mainStyle from "../Common/component.module.css";
import boardStyle from "./ModelDashBoard.module.css";
import { LayerList } from "../Setting/Layers/LayerList";

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

export const OptimizerBoard = ({ style }) => {
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

    return (
        <div style={style.mainStyle}>
            <Title title="optimizer"/>
            <div className={mainStyle.subContainer}
                style={style.contentStyle}>
                {optimizerContent()}
            </div>
        </div>
    )        
}

export const LossBoard = ({ style }) => {
    const compile = useSelector(state => state.compile);

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
        <div style={style.mainStyle}>
            <Title title="loss"/>
            <div className={mainStyle.subContainer}
                style={style.contentStyle}>
                {lossContent()}
            </div>
        </div>
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
        <div style={{"display":"inline-block", "verticalAlign":"top"}}>
            <div style={{"display":"inline-block",
                        "minHeight":"202px", "verticalAlign":"top"}}>
                <Title title="optimizer"/>
                <div className={mainStyle.subContainer}>
                    {optimizerContent()}
                </div>
            </div>
            <div style={{"display":"inline-block",
                        "minHeight":"202px", "verticalAlign":"top"}}>
                <Title title="loss"/>
                <div className={mainStyle.subContainer}>
                    {lossContent()}
                </div>
            </div>
        </div>
    )    
}

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

export const LayerBoard = ({ style }) => {
    const layers = useSelector((state) => state.layers);

    const content = () => {
        if (isEmptyArray(layers.info)){
            return (
                <div className={boardStyle.center}>
                    <span>No Data</span>
                </div>
            )
        } else {
            return (
                <LayerList
                    style={{...style.contentStyle,
                        "maxHeight":"24rem"}}
                    data={layers.info}
                    isModel={layers.isModel}/>
            )
        }
    }

    return (
        <div style={{...style.mainStyle, "display":"block"}}>
            <Title title="Layers"/>
            <div className={mainStyle.subContainer}>
                {content()}
            </div>
        </div >
    )
}


export const SideParamBoard = ({children, className, style, ...props}) => {
    const parameter = useSelector((state) => state.parameter.info);
    
    return (
        <ul style={{"marginBottom":"0.5rem"}}>
            <Link to={props.link}>
                <li style={style}>Parameters</li>
                {!isEmptyObject(parameter) &&
                    Object.entries(parameter).map(setting => (
                        <li style={{"paddingLeft":"0.5rem"}}>
                            <p style={{"wordBreak":"break-all"}}>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p>
                        </li>
                ))}
            </Link>
        </ul>
    )
}

export const ParamBoard = ({ style }) => {
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
        <div style={style.mainStyle}>
            <Title title="Parameter"/>
            <div className={mainStyle.subContainer}
                style={style.contentStyle}>
                {content()}
            </div>
        </div>
    )
}

export const ModelInfoBoard = () => {
    const style = {
        mainStyle: {
            "display":"inline-block",
            "verticalAlign":"top",
            "margin":"0 10px"
        },
        contentStyle: {
            "position":"relative",
            "display":"flex",
            "minHeight":"130px",
            "alignItems":"center"
        }
    }

    return (
        <div>
            <div className={style.subContainer}
                style={{"width":"100%"}}>
                <LayerBoard style={style}/>
                <div style={{"display":"flex", "justifyContent":"start"}}>
                    <OptimizerBoard style={style}/>
                    <LossBoard style={style}/>
                    <ParamBoard style={style}/>
                </div>
            </div>
        </div>
    )
}