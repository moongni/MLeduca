import React from "react";
import { useState } from "react";
import Tabs from "../../components/ModelCreate/Tabs"
import tabData from "../../data/TabData.json"

function MakeLayers() {
    const [currentTab, setCurrentTab] = useState('1');
    
    function tapContent(props) {
        const curContent = tabData.MakeLayers.filter(tab => `${tab.id}` == props)
        switch (curContent[0].title) {
            case "squence":
                return (
                    <div className=" h-24 w-full bg-yellow-200 z-20">squence</div>
                )                
            case "model":
                return (
                    <div className=" h-24 w-full bg-red-200 z-20">model</div>
                )
            default:
                return (<div className=" h-24 w-full bg-blue-200">default</div>);
        }
    }
    return(
        <div className="relative w-full min-h-full">
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabData={tabData.MakeLayers}/>
            {/* <div className="absolute flex h-10 top-0 left-0 w-full">
                <div className="w-full px-3 text-xl rounded-t-md border-x-2 border-t-2 border-blue-200 bg-blue-100 text-center"
                style={{"maxWidth":"auto"}}>sequence</div>
                <div className="w-full px-3 text-xl rounded-t-md border-x-2 border-t-2 border-blue-200 bg-blue-100 text-center"
                style={{"maxWidth":"auto"}}>model</div>
            </div> */}
            <div className="w-full h-80 pt-10 ">
                {tapContent(currentTab)}
            </div>
        </div>
    )
}

export default MakeLayers