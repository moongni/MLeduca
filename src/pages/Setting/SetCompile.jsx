import React,{ useState } from "react";
import data from "../../data/data.json"
import Losses from "../../components/Compile/Losses";
import Optimizers from "../../components/Compile/Optimizers";
import Tabs from "../../components/Tabs";
import { useNav } from "../../components/Common/singlePageNav/useNav";

function SetCompile() {
    const [currentTab, setCurrentTab] = useState('1');

    function tapContent(tabId) {
        const curContent = data.Compile.filter(tab => `${tab.id}` == tabId)
        switch (curContent[0].title){
            case "optimizer":
                return <Optimizers/>
            case "loss":
                return <Losses/>
        }
    }
    const compileRef = useNav('Compile');

    return (
        <div 
            className="relative w-full rounded-2xl p-5 mb-4 bg-slate-50 shadow-lg shadow-slate-400"
            ref={compileRef}
            id="compileContainer"
        >
            <Tabs currentTab={currentTab} 
                setCurrentTab={setCurrentTab} 
                tabData={data.Compile}
            />
            <div className="w-full pt-12">
                {tapContent(currentTab)}
            </div>
        </div>
    )
}

export default SetCompile;