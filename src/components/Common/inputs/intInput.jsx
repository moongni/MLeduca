import React from "react";
import style from './input.module.css';

export const IntInput = ({...props}) => {
    return (
        <input 
            className={style.input}
            name={props.title}
            type={props.type}
            min={props.min}
            value={props.value[props.title]}
            placeholder={props.placeholder}
            defaultValue={props.default}
            step={props.step}
            onChange={(e) => {
                const { value, name } = e.target;
                props.setValue((preValue) => ({
                        ...preValue,
                        [name]: parseInt(value)
                }))
            }}
            required={props.required}
        /> 
    )
}