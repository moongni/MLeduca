import React from "react";
import ReactLoading from "react-loading";

export const Loader = ({ type, color, style, message }) => {
    const divStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"   
    }
    return (
        <div style={{...divStyle, ...style}}>
            <h2>{message}</h2>
            <ReactLoading
                type={type}
                color={color}
                height={'80%'}
                width={'80%'}/>
        </div>
    )
}