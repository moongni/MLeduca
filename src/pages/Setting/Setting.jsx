import React from "react";
import SetCompile from "./SetCompile";
import SetLayers from "./SetLayers";
import SetParams from "./SetParams";
import Nav from "../../components/Common/singlePageNav/Nav";
import NavProvider from "../../components/Common/singlePageNav/NavContext";

const Setting = ({chiled, ...props}) => {
    return (
        <div className="relative flex w-full h-full">
            <NavProvider>
                <div className="fixed left-0 top-0 w-72 h-full">
                    <Nav/>
                </div>
                <div className="relative w-full h-full">
                    <SetLayers/>
                    <SetCompile/>
                    <SetParams/>
                </div>
            </NavProvider>
        </div>
    )
}

export default Setting;