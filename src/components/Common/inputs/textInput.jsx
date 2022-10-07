import React from "react";
import style from './input.module.css';

export const TextInput = ({...props}) => {
    return (
        <input 
            className={style.input}
            name={props.title}
            type={props.type}
            value={props.value}
            defaultValue={props.default}
            placeholder={props.placeholder}
            onChange={(e) => {
                let { value } = e.target;
                props.setValue(value)
            }}
            required={props.required}
        /> 
    )
}