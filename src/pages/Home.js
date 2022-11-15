import React , { useState, useEffect } from "react";
import mainStyle from "../components/Common/component.module.css";
import Title from "../components/Common/title/title";

function Home() {
    useEffect(() => {
        let vh = 0;
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }, [window.innerHeight]);

    return (
        <div className={mainStyle.container}>
            <Title title="웹앱 사용법" className={mainStyle.centerContainer}/>
            <div className={mainStyle.centerContainer} style={{"margin":"5rem 0"}}>
                            
            </div>
        </div>
    );
}

export default Home