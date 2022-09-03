import React from "react";

export const Title = ({icon, ...props}) => {
    const titleStyle = {
        display: "flex",
        fontSize: "1.5rem",
        lineHeight: "2rem",
        alignItems: "center"
    }

    return (
        <div style={titleStyle}>
            <i style={{"marginRight":"1rem"}}>{icon}</i>
            <span>{props.title}</span>
        </div>
    )
}