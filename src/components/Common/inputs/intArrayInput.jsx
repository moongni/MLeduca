import React, { useState, useEffect } from "react";

export const IntArrayInput = ({...props}) => {
    const [string, setString] = useState("");
    const [name, setName] = useState("");

    // int 배열 변환하여 set
    useEffect(
        () => {
            let value = string
            value = value.replace("[", "");
            value = value.replace("]", "");
            value = value.split(',').map((item) => {
                if (item == "null"){
                    return null
                }
                return parseInt(item, 10);
            }).filter(item => (typeof item == "number" || item == null) && !isNaN(item))
            
            // name이 빈 문자열일 때 막기
            name != "" &&
            props.setValue((preValue) => ({
                    ...preValue,
                    [name]: value
            }))
    }, [string]);
    
    return (
        <input 
            style={{"marginRight":"2.5rem"}}
            name={props.title}
            type={props.type}
            value={string}
            defaultValue={props.default}
            placeholder={props.placeholder}
            onChange={(e) => {
                let { value, name } = e.target;
                setString(value)
                setName(name);
            }}
        /> 
    )
}