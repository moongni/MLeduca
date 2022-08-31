import React from "react";
import Layers from "../components/Setting/Layers/Layers";
import Params from "../components/Setting/Params";
import Optimizers from "../components/Setting/Compile/Optimizers";
import Losses from "../components/Setting/Compile/Losses";
import Nav from "../components/Common/singlePageNav/Nav";
import NavProvider from "../components/Common/singlePageNav/NavContext";

const Setting = ({children, ...props}) => {
    console.log(1);
    return (
        <div className="relative flex w-full h-full">
            <NavProvider>
                <div className="fixed w-56 h-full">
                    <Nav/>
                </div>
                <div className="relative ml-56 w-full h-full">
                    <Layers />
                    <Optimizers />
                    <Losses />
                    <Params />
                </div>
            </NavProvider>
        </div>
    )
}

export default Setting;