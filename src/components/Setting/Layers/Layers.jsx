import React, { useState } from "react";
import Tabs from "../../Common/tab/Tabs"
import data from "../../../data/data.json"
import Sequence from "./Sequence";
import Model from "./model";
import { useNav } from "../../Common/singlePageNav/useNav";
import style from "../../Common/component.module.css";
import { AiOutlineControl } from "react-icons/ai";

function Layers({...props}) {
    const [currentTab, setCurrentTab] = useState('1');

    function tapContent(props) {
        const curContent = data.Layers.filter(tab => `${tab.id}` == props)
        switch (curContent[0].title) {
            case "Sequence":
                return <Sequence info={curContent[0].info} icon={<AiOutlineControl/>}/>                
            case "Model":
                return <Model info={curContent[0].info} icon={<AiOutlineControl/>}/>
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
            <div>
                {tapContent(currentTab)}
            </div>
        </div>
    )
}

export default Layers