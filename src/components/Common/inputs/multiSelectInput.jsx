import React from "react";
import { MultiSelect } from "react-multi-select-component";

export const MultiSelectInput = ({...props}) => {
    return (
        <MultiSelect 
            className="w-96"
            options={props.options}
            value={props.value}
            onChange={props.setValue}
            labelledBy="Select"
            >
        </MultiSelect>
    )   
}