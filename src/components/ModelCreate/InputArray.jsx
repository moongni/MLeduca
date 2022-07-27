import React, { useState } from "react";

function InputArray(props){
    const [value, setValue] = useState(props.default);

    const useInput = () => {
        const onChange = ((e) => {
            const {
                target: {value}
            } = e;
            setValue(value);
        })
        return {value, onChange};
    };
    
    const inputArray = useInput(props.info);

    return (
        <input className="mr-10" 
        name={props.info.title}
        type={props.info.type}
        defaultValue={props.info.default}
        placeholder={props.info.placeholder}
        {...inputArray}
        /> 

    )    
}

export default InputArray;