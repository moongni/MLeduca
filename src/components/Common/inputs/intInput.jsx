import React from "react";

export const IntInput = ({...props}) => {
    return (
        <input 
            style={{"marginRight":"2.5rem"}}
            name={props.title}
            type={props.type}
            min={props.min}
            value={props.value[props.title]}
            defaultValue={props.default}
            step={props.step}
            onChange={(e) => {
                const { value, name } = e.target;
                props.setValue((preValue) => ({
                        ...preValue,
                        [name]: parseInt(value)
                }))
            }}
        /> 
    )
}