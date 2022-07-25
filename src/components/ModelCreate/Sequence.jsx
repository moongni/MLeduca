import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useState } from "react";

function Sequence(props) {
    const [inputs, setInputs] = useState({
        
        units: 0,
        inputShape: 0,
        batchInputShape: 0,
        activation: null,
        kernelInitializer: null,
    });

    const Contents = (props) => {
        props = props.v
        switch(props.kind){
            case "input":
                return (
                    <div className="flex justify-between items-center h-14 w-full
                    bg-yellow-400">
                        <label className="ml-10" htmlFor={props.title}>{props.title}</label>
                        <input className="mr-10" 
                            name={props.title}
                            type={props.type} 
                            min={props.min}
                            value={inputs[props.title]}
                            onChange={(e) => {
                                const { value, name } = e.target;
                                setInputs({
                                    ...inputs,
                                    [name]: value
                                });
                                console.log(inputs);
                            }}/> 
                    </div>
                    )
            case "select":
                return (
                    <div className="flex justify-between items-center h-14 w-full
                    bg-yellow-400">
                        <span className="ml-10">{props.title}</span>
                        <select 
                            className="mr-10"
                            name={props.title}
                            value={inputs[props.title]}
                            onChange={(e) => {
                                const { value, name } = e.target;
                                setInputs({
                                    ...inputs,
                                    [name]: value
                                });
                            }}>
                            {props.list.map(l => {
                                return <option value={l}>{l}</option>
                            })}
                        </select>
                    </div>
                )
        }
    }

    const [layer, setLayer] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) =>{
        setDisabled(true);
        event.preventDefault();
        const newLayer = {...inputs};
        setLayer(old => [...old, newLayer]);
        console.log(layer);
        alert(layer);
        setDisabled(false);
    }
    return(
        <div className="w-full bg-yellow-200">
            <span className="ml-6 mt-2">sequence</span>
            <form className="relative border-2 pb-20 border-black bg-yellow-400"
            onSubmit={handleSubmit}>
                {props.info.filter((n)=> n.name === "mainParams")[0].params.map(v => {
                return (
                    <Contents v={v}/>
                    )
                })}
                {props.info.filter((n)=>n.name === "subParams")[0].params.map(v => {
                    return (
                        <Contents v={v}/>
                    )
                })}
                <button className="absolute w-fit h-10 bottom-3 left-1/2
                bg-green-200 hover:bg-green-400 cursor-pointer disabled:bg-slate-400" 
                type="submit"
                disabled={disabled}>
                    Add Layer
                </button>
            </form>

        </div>
    )
}

export default Sequence;