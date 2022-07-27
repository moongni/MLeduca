import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sequenceActions } from "../../reducers/sequenceSlice"
import InputArray from "./InputArray";

function Sequence(props) {
    const sequence = useSelector((state) => state.sequence.info);
    // const model = useSelector((state) => state.model.info)
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        props.info[0].params.map(v => {
            setInputs((preState)=>{
                return {
                    ...preState,
                    [v.title]: v.default
                }
            });
        })
    },[]);

    const Contents = ({props}) => {
        switch(props.kind){
            case "input":
                return (
                    <div className="flex justify-between items-center h-14 w-fullbg-yellow-400">
                        <label className="ml-10" htmlFor={props.title}>
                            {props.title}
                        </label>
                        <input className="mr-10" 
                            name={props.title}
                            type={props.type}
                            min={props.min}
                            value={inputs[props.title]}
                            defaultValue={props.default}
                            onChange={(e) => {
                                const { value, name } = e.target;
                                setInputs((preState)=> {return {
                                    ...preState,
                                    [name]: value
                                }});
                            }}/> 
                    </div>
                    )

            case "array":
                return (
                    <div className="flex justify-between items-center h-14 w-fullbg-yellow-400">
                        <label className="ml-10" htmlFor={props.title}>
                            {props.title}
                        </label>
                        <InputArray info={props}/>

                    </div>
                )

            case "select":
                return (
                    <div className="flex justify-between items-center h-14 w-fullbg-yellow-400">
                        <span className="ml-10">
                            {props.title}
                        </span>
                        <select className="mr-10"
                            name={props.title}
                            value={inputs[props.title]}
                            onChange={(e) => {
                                const { value, name } = e.target;
                                setInputs((preState)=> {return {
                                    ...preState,
                                    [name]: value
                                }});
                            }}>
                            {props.list.map(l => {
                                return <option value={l}>{l}</option>
                            })}
                        </select>
                    </div>
                )
        }
    }

    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) =>{
        setDisabled(true);
        event.preventDefault();
        props.info.map((params) => {
            params.params.map(async param => {
                if (param.kind === "array") {
                    console.log('set');
                    setInputs((preState) => {
                        console.log('set')
                        return {
                            ...preState,
                            [param.title]: event.target[param.title].value
                        }}
                    );
                }
            })
        })
        console.log('dispatch');
        dispatch(sequenceActions.addLayer(inputs));
        setDisabled(false);
    }
    const handleRemove = async (idx) => {
        setDisabled(true);
        dispatch(sequenceActions.removeLayer(idx));
        dispatch(sequenceActions.reIndexing());
        setDisabled(false);
    }
    const [isSubOpen, setSubOpen] = useState(false);
    return(
        <div className="w-full bg-yellow-200">
            <span className="ml-6 mt-2">sequence 설명</span>

            <form className="relative border-2 pb-20 border-black bg-yellow-400"
            onSubmit={handleSubmit}>
                <div>
                {props.info.filter((n)=> n.name === "mainParams")[0].params.map(v => {
                return (
                    <Contents props={v}/>
                    )
                })}
                </div>

                <button className="cursor-pointer" type="button" onClick={()=>setSubOpen(!isSubOpen)}>
                    Advanced setting
                </button>
                
                <div className={`${isSubOpen? "" : "hidden opacity-0 cursor-default"}`}>
                {props.info.filter((n)=>n.name === "subParams")[0].params.map(v => {
                    return (
                        <Contents props={v}/>
                    )
                })}
                </div>
                <button className="absolute w-fit h-10 bottom-3 left-1/2
                bg-green-200 hover:bg-green-400 cursor-pointer disabled:bg-slate-400" 
                type="submit"
                disabled={disabled}>
                    Add Layer
                </button>
            </form>

            <div className="w-full">
                <div className="w-full bg-blue-200">
                    {
                        sequence.map(layer=>{
                            return (
                            <div className="flex justify-between">
                                <p>{layer.idx} layer {JSON.stringify(layer.info)}</p>
                                <button className="h-5 w-5 mr-4 text-center items-center rounded-md hover:bg-red-500"
                                type="button"
                                onClick={()=>handleRemove(layer.idx)}>X</button>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sequence;