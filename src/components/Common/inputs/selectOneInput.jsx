import React from "react";

export const SelectOneInput = ({...props}) => {
    return (
        <select 
            style={{"marginRight":"2.5rem"}}
            name={props.title}
            value={props.value}
            defaultValue={props.default}
            onChange={(e) => {
                const { value } = e.target;
                props.setValue(value)}
                }
            >
            {props.defaultName && 
                <option value={props.default}>{props.defaultName}</option>
            }
            {props.list.map(l => (
                <option value={l}>{l}</option>
            ))}
        </select>
    )
}