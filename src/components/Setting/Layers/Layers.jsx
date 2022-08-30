import React, { useState } from "react";
import Tabs from "../../Tabs"
import data from "../../../data/data.json"
import Sequence from "./Sequence";
import Model from "./model";
import { useNav } from "../../Common/singlePageNav/useNav";

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
            className="relative w-full rounded-2xl p-5 mb-4 bg-slate-50 shadow-lg shadow-slate-400"
            ref={layerRef}
            id="layerContainer"
        >
            <Tabs 
                currentTab={currentTab} 
                setCurrentTab={setCurrentTab} 
                tabData={data.Layers}
            />
            <div className="w-full pt-10">
                {tapContent(currentTab)}
            </div>
        </div>
    )
}

export default SetLayers