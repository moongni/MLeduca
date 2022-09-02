import React from "react";

export const TextInput = ({...props}) => {
    return (
        <input 
            style={{"marginRight":"2.5rem"}}
            name={props.title}
            type={props.type}
            value={props.value}
            defaultValue={props.default}
            placeholder={props.placeholder}
            onChange={(e) => {
                let { value } = e.target;
                props.setValue(value)
            }}
        /> 
    )
}