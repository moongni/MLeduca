import React, { useEffect, useState } from "react";

const Inputs = ({props}) => {
    const [string, setString] = useState("");
    const [name, setName] = useState("");

    // state 디폴트 값으로 set
    useEffect(() => {
        // 디폴트 값이 존재할 경우
        !(typeof props.default == "undefined" || props.default == null || props.default == "") &&
        props.setValue((preValue) => {
            return {
                ...preValue,
                [props.title]: props.default
            }
        })
    },[]);
    
    // int 배열 변환하여 set
    useEffect(() => {
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
        props.setValue((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }, [string]);

    switch(props.kind){
        case "input":
            return (
                <div className="flex justify-between items-center h-14 w-full bg-yellow-400">
                    <label className="ml-10" htmlFor={props.title}>
                        {props.title}
                    </label>
                    <input className="mr-10" 
                        name={props.title}
                        type={props.type}
                        min={props.min}
                        value={props.value[props.title]}
                        defaultValue={props.default}
                        onChange={(e) => {
                            const { value, name } = e.target;
                            props.setValue((preValue) => {
                                return {
                                    ...preValue,
                                    [name]: parseInt(value)
                                }
                            })
                        }}
                        /> 
                </div>
                )

        case "array":
            return (
                <div className="flex justify-between items-center h-14 w-full bg-yellow-400">
                    <label className="ml-10" htmlFor={props.title}>
                        {props.title}
                    </label>
                    <input className="mr-10" 
                        name={props.title}
                        type={props.type}
                        value={string}
                        defaultValue={props.default}
                        placeholder={props.placeholder}
                        onChange={(e) => {
                            let { value, name } = e.target;
                            setString(value)
                            setName(name);
                        }}/> 
                </div>
            )
        case "text":
            return (
                <div className="flex justify-between items-center h-14 w-full bg-yellow-400">
                    <label className="ml-10" htmlFor={props.title}>
                        {props.title}
                    </label>
                    <input className="mr-10" 
                        name={props.title}
                        type={props.type}
                        value={props.value}
                        defaultValue={props.default}
                        placeholder={props.placeholder}
                        onChange={(e) => {
                            let { value } = e.target;
                            props.setValue(value)
                        }}/> 
                </div>
            )

        case "select":
            return (
                <div className="flex justify-between items-center h-14 w-full bg-yellow-400">
                    <span className="ml-10">
                        {props.title}
                    </span>
                    <select className="mr-10"
                        name={props.title}
                        value={props.value[props.title]}
                        defaultValue={props.default}
                        onChange={(e) => {
                            const { value, name } = e.target;
                            props.setValue((preValue) => {
                                return {
                                    ...preValue,
                                    [name]: value
                                }
                            })
                        }}>
                        {props.defaultName && 
                            <option value={props.default}>{props.defaultName}</option>
                        }
                        {props.list.map(l => {
                            return <option value={l}>{l}</option>
                        })}
                    </select>
                </div>
            )
        case "selectOne":
            return (
                <div className="flex justify-between items-center h-14 w-full bg-yellow-400">
                    <span className="ml-10">
                        {props.title}
                    </span>
                    <select className="mr-10"
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
                        {props.list.map(l => {
                            return <option value={l}>{l}</option>
                        })}
                    </select>
                </div>
            )
    
    }
}

export default Inputs;