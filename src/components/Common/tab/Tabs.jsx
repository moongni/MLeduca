import React from "react";
import style from "./tab.module.css";

function Tabs({...props}) {
    const handleTabClick = (id) => {
        props.setCurrentTab(`${id}`);
    }

    return (
        <div className={style.container}>
            { props.tabData.map((tab) => (
                <button 
                    className={style.button}
                    key={tab.id} 
                    disabled={props.currentTab === `${tab.id}`} 
                    onClick={()=>handleTabClick(tab.id)}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    )
}

export default Tabs;