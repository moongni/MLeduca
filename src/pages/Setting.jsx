import React from "react";
import Layers from "../components/Setting/Layers/Layers";
import Params from "../components/Setting/Params";
import Optimizers from "../components/Setting/Compile/Optimizers";
import Losses from "../components/Setting/Compile/Losses";
import Nav from "../components/Common/singlePageNav/Nav";
import NavProvider from "../components/Common/singlePageNav/NavContext";

const Setting = ({children, ...props}) => {
    const style = {
        main:{
            position:"relative",
            display:"flex",
            width:"100%",
            height:"100%"
        },
        nav:{
            position:"fixed",
            width:"13rem",
            height:"100%"
        },
        setting:{
            position:"relative",
            marginLeft:"14rem",
            width:"100%",
            height:"100%"
        }
    }

    return (
        <div style={style.main}>
            <NavProvider>
                <div style={style.nav}>
                    <Nav/>
                </div>
                <div style={style.setting}>
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