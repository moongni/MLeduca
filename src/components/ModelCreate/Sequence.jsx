import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sequenceActions } from "../../reducers/sequenceSlice"

function Sequence(props) {
    const sequence = useSelector((state) => state.sequence.info);
    // const model = useSelector((state) => state.model.info)
    const dispatch = useDispatch();
    const [layerIdx, setLayerIdx] = useState(1);
    const [inputs, setInputs] = useState({});

    const Contents = (props) => {
        props = props.v
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
                            onChange={(e) => {
                                const { value, name } = e.target;
                                setInputs({
                                    ...inputs,
                                    [name]: value
                                });
                            }}/> 
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

    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) =>{
        setDisabled(true);
        event.preventDefault();
        const newLayer = {
            idx: layerIdx,
            info: inputs
        };
        dispatch(sequenceActions.addLayer(newLayer));
        setLayerIdx(layerIdx + 1);
        setDisabled(false);
    }
    const [isSubOpen, setSubOpen] = useState(false);
    return(
        <div className="w-full bg-yellow-200">
            <span className="ml-6 mt-2">sequence 설명</span>
            <form className="relative border-2 pb-20 border-black bg-yellow-400"
            onSubmit={handleSubmit}>
                {props.info.filter((n)=> n.name === "mainParams")[0].params.map(v => {
                return (
                    <Contents v={v}/>
                    )
                })}
                <button className="cursor-pointer" onClick={()=>setSubOpen(!isSubOpen)}>
                    Advanced setting
                </button>
                {props.info.filter((n)=>n.name === "subParams")[0].params.map(v => {
                    return (
                        <Contents className="opacity-0" v={v}/>
                    )
                })}
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
                            return <p>{layer.idx} layer {JSON.stringify(layer.info)}</p>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sequence;