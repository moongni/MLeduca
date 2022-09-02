import React, { useEffect } from "react";
import { isEmpty } from "./package";
import { IntInput } from "./inputs/intInput";
import { FloatInput } from "./inputs/floatInput";
import { IntArrayInput } from "./inputs/intArrayInput";
import { TextInput } from "./inputs/textInput";
import { SelectInput } from "./inputs/selectInput";
import { SelectOneInput } from "./inputs/selectOneInput";
import { MultiSelectInput } from "./inputs/multiSelectInput";
import { BoolInput } from "./inputs/boolInput";

const Contents = ({...props}) => {
    console.log("contents",props)
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
            <span style={{"marginLeft":"2.5rem"}}>
                {props.title}
            </span>
            <Contents {...props}/>
        </div>
    )    
}

export default Inputs;