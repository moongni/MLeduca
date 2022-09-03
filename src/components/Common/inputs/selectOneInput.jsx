import React from "react";
import style from './input.module.css';

export const SelectOneInput = ({...props}) => {
    return (
        <select 
            className={[style.input, style.select].join(' ')}
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