import React from "react";

function Tabs(props) {
    const handleTabClick = (id) => {
        props.setCurrentTab(`${id}`);
    }
    return (
        <div className="absolute flex h-10 top-0 left-0 w-full">
            {props.tabData.map((tab) => {
                return (
                    <button 
                        className="w-full px-3 text-xl rounded-t-md 
                        bg-slate-100 disabled:bg-slate-50 text-center"
                        key={tab.id} 
                        disabled={props.currentTab === `${tab.id}`} 
                        onClick={()=>handleTabClick(tab.id)}
                    >
                        {tab.title}
                    </button>)
            })}
        </div>
    )
}

export default Tabs;