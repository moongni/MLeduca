import React, { useEffect } from "react";
import { isEmpty } from "../package";
import { IntInput } from "./intInput";
import { FloatInput } from "./floatInput";
import { IntArrayInput } from "./intArrayInput";
import { TextInput } from "./textInput";
import { SelectInput } from "./selectInput";
import { SelectOneInput } from "./selectOneInput";
import { MultiSelectInput } from "./multiSelectInput";
import { BoolInput } from "./boolInput";

const Contents = ({...props}) => {
    switch(props.kind){
        case "input":
            return <IntInput {...props}/>
        case "float":
            return <FloatInput {...props}/>
        case "array":
            return <IntArrayInput {...props}/>
        case "text":
            return <TextInput {...props}/>
        case "select":
            return <SelectInput {...props}/>
        case "selectOne":
            return <SelectOneInput {...props}/>
        case "MultiSelect":
            return <MultiSelectInput {...props}/>
        case "bool":
            return <BoolInput {...props}/>    
    }
}

const Inputs = ({...props}) => {
    // 디폴트 값이 존재할 경우
    useEffect(() => {
        !(isEmpty(props.default) || props.default == "") &&
        props.setValue((preValue) => ({
                ...preValue,
                [props.title]: props.default
            }
        ))
    },[]);
    
    const inputStyle = {
        "display":"flex",
        "justifyContent":"space-between",
        "alignItems":"center",
        "height":"3.5rem",
        "width":"100%"
    }

    return (
        <div style={inputStyle}>
            <span>{props.title}</span>
            <Contents {...props}/>
        </div>
    )    
}

export default Inputs;