import React from "react";
import { useState } from "react";
import Tabs from "../../components/ModelCreate/Tabs"
import data from "../../data/data.json"

function MakeLayers() {
    const [currentTab, setCurrentTab] = useState('1');
    
    function tapContent(props) {
        const curContent = data.modelCreate.filter(tab => `${tab.id}` == props)
        switch (curContent[0].title) {
            case "Sequence":
                return (
                    <div className=" h-24 w-full bg-yellow-200">squence
                        {curContent[0].info.filter(i => i !== "activation").map(v => {
                            return (
                                <div className="flex justify-between h-10 w-full bg-yellow-400">
                                    <span className="ml-10">{v}</span>
                                    <input className="mr-10 border-2 border-black bg-yellow-400"></input>
                                </div>
                            )
                        })}
                    </div>
                )                
            case "Model":
                return (
                    <div className=" h-24 w-full bg-red-200 z-20">model
                        {curContent[0].info.filter(i => i !== "activation").map(v => {
                            return (
                                <div className="flex justify-between h-10 w-full bg-yellow-400">
                                    <span className="ml-10">{v}</span>
                                    <input className=" mr-10 border-2 border-black bg-yellow-400"></input>
                                </div>
                            )
                        })}
                    </div>
                )
            default:
                return (<div className=" h-24 w-full bg-blue-200">default</div>);
        }
    }
    return(
        <div className="relative w-full min-h-full">
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabData={data.modelCreate}/>
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