import React from "react";

export const SelectInput = ({...props}) => {
    return (
        <select 
            style={{"marginRight":"2.5rem"}}
            name={props.title}
            value={props.value[props.title]}
            defaultValue={props.default}
            onChange={(e) => {
                const { value, name } = e.target;
                props.setValue((preValue) => ({
                        ...preValue,
                        [name]: value
                }))
            }}>
            {props.defaultName && 
                <option value={props.default}>{props.defaultName}</option>
            }
            {props.list.map(l => (
                <option value={l}>{l}</option>
            ))}
        </select>
    )
}