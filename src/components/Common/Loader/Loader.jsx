import React from "react";
import ReactLoading from "react-loading";

export const Loader = ({ type, color, message }) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"   
    }
    return (
        <div style={style}>
            <h2>{message}</h2>
            <ReactLoading
                type={type}
                color={color}
                height={'80%'}
                width={'80%'}/>
        </div>
    )
}