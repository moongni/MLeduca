import React, { useState } from "react";
import Tabs from "../../Common/Tabs"
import data from "../../../data/data.json"
import Sequence from "./Sequence";
import Model from "./model";
import { useNav } from "../../Common/singlePageNav/useNav";
import style from "../../Common/component.module.css";

function SetLayers() {
    const [currentTab, setCurrentTab] = useState('1');
    function tapContent(props) {
        const curContent = data.Layers.filter(tab => `${tab.id}` == props)
        switch (curContent[0].title) {
            case "Sequence":
                return <Sequence info={curContent[0].info}></Sequence>                
            case "Model":
                return <Model info={curContent[0].info}></Model>
            default:
                return (<div className=" h-24 w-full bg-blue-200">default</div>);
        }
    }
    const layerRef = useNav("Layer");

    return(
        <div 
            className={style.container}
            ref={layerRef}
            id="layerContainer"
        >
            <Tabs 
                currentTab={currentTab} 
                setCurrentTab={setCurrentTab} 
                tabData={data.Layers}
            />
            <div style={{"paddingTop":"2.5rem"}}>
                {tapContent(currentTab)}
            </div>
        </div>
    )
}

export default SetLayers