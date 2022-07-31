import React from "react";
import { useState } from "react";
import data from "../../data/data.json"
import Losses from "../../components/Compile/Losses";
import Optimizers from "../../components/Compile/Optimizers";
import Gradients from "../../components/Compile/Gradients";
import Tabs from "../../components/Tabs";

function SetCompile() {
    const [currentTab, setCurrentTab] = useState('1');

    function tapContent(tabId) {
        const curContent = data.Compile.filter(tab => `${tab.id}` == tabId)
        switch (curContent[0].title){
            case "gradient":
                return <Gradients/>
            case "optimizer":
                return <Optimizers/>
            case "loss":
                return <Losses/>
            default:
                return (<div className=" h-24 w-full bg-blue-200">default</div>);
        }
    }

    return (
        <div className="relative w-full">
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabData={data.Compile}/>
        <div className="w-full h-80 pt-12 ">
            {tapContent(currentTab)}
        </div>
    </div>
    )
}

export default SetCompile;