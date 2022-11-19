import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { isEmpty, isEmptyStr } from "../package";
import style from './input.module.css'

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

const Inputs = ({style, ...props}) => {
    // 디폴트 값이 존재할 경우
    useEffect(() => {
        if (!isEmptyStr(props.defaultValue)) {
            props.setValue((preValue) => ({
                    ...preValue,
                    [props.title]: props.defaultValue
                }
            ))
        }
    },[]);
    
    const inputStyle = {
        "display":"flex",
        "justifyContent":"space-between",
        "alignItems":"center",
        "height":"3.5rem",
        "width":"100%",
        
    }

    return (
        <div style={{...inputStyle, ...style}}>
            <span style={{"wordBreak":"keep-all"}}>{props.mainTitle? props.mainTitle: props.title}</span>
            <Contents {...props}/>
        </div>
    )    
}

export default Inputs;

const BoolInput = ({ ...props }) => {
    return (
        <select 
            { ...props }
            className={[style.input, style.select].join(' ')}
            name={props.title}
            value={props.value[props.title]}
            onChange={(e) => {
                const { value, name } = e.target;
                props.setValue((preValue) => ({
                        ...preValue,
                        [name]: JSON.parse(value)
                    }))
                }}
            >
            {props.defaultName && 
                <option value={props.defaultValue}>{props.defaultName}</option>
            }
            {props.list.map(l => {
                return <option value={l}>{l}</option>
            })}
        </select>
    )
}

const FloatInput = ({ ...props }) => {
    return (
        <input 
            { ...props }
            className={style.input}
            name={props.title}
            value={props.value[props.title]}
            onChange={(e) => {
                const { value, name } = e.target;
                props.setValue((preValue) => ({
                    ...preValue,
                    [name]: parseFloat(value)
                }))
            }}
        /> 
    )
}

const IntArrayInput = ({ ...props }) => {
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
            { ...props }
            className={style.input}
            name={props.title}
            value={string}
            onChange={(e) => {
                let { value, name } = e.target;
                setString(value)
                setName(name);
            }}
        /> 
    )
}

const IntInput = ({ ...props }) => {

    return (
        <input 
            { ...props }
            className={style.input}
            name={props.title}
            value={props.value[props.title]}
            onChange={(e) => {
                const { value, name } = e.target;

                props.setValue((preValue) => ({
                    ...preValue,
                    [name]: parseInt(value)
                }))
            }}
        /> 
    )
}

const MultiSelectInput = ({ ...props }) => {
    return (
        <MultiSelect 
            { ...props }
            className="w-96"
            onChange={props.setValue}
            labelledBy="Select"
        />
    )   
}

const SelectInput = ({ ...props }) => {
    return (
        <select 
            { ...props }
            className={[style.input, style.select].join(' ')}
            name={props.title}
            value={props.value[props.title]}
            onChange={(e) => {
                const { value, name } = e.target;
                props.setValue((preValue) => ({
                    ...preValue,
                    [name]: value
                }))
            }}
            >
            {props.defaultName && 
                <option value={props.defaultValue}>{props.defaultName}</option>
            }
            {props.list.map(l => (
                <option value={l}>{l}</option>
            ))}
        </select>
    )
}

const SelectOneInput = ({ ...props }) => {
    return (
        <select 
            { ...props }
            className={[style.input, style.select].join(' ')}
            name={props.title}
            onChange={(e) => {
                const { value } = e.target;
                props.setValue(value)}
            }
            >
            {props.defaultName && 
                <option value={props.defaultValue}>{props.defaultName}</option>
            }
            {props.list.map(l => (
                <option value={l}>{l}</option>
            ))}
        </select>
    )
}

const TextInput = ({ ...props }) => {
    return (
        <input 
            { ...props }
            className={style.input}
            name={props.title}
            onChange={(e) => {
                let { value } = e.target;
                props.setValue(value)
            }}
        /> 
    )
}