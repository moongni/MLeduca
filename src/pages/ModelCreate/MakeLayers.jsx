import React from "react";
import { useState } from "react";
import Tabs from "../../components/ModelCreate/Tabs"
import data from "../../data/data.json"
import Sequence from "../../components/ModelCreate/Sequence";
import Model from "../../components/ModelCreate/model";

function MakeLayers() {
    const [currentTab, setCurrentTab] = useState('1');
    
    function tapContent(props) {
        const curContent = data.modelCreate.filter(tab => `${tab.id}` == props)
        switch (curContent[0].title) {
            case "Sequence":
                return <Sequence info={curContent[0].info}></Sequence>                
            case "Model":
                return <Model info={curContent[0].info}></Model>
            default:
                return (<div className=" h-24 w-full bg-blue-200">default</div>);
        }
    }
    return(
        <div className="relative w-full">
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabData={data.modelCreate}/>
            <div className="w-full h-80 pt-10 ">
                {tapContent(currentTab)}
            </div>
        </div>
    )
}

export default MakeLayers