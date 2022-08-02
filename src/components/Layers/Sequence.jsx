import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layerActions } from "../../reducers/layerSlice";
import Inputs from "../Inputs";

function Sequence(props) {
    // const model = useSelector((state) => state.model.info)
    const layers = useSelector((state) => state.layers.info);
    const dispatch = useDispatch();
    const [isSubOpen, setSubOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState({});

    const handleSubmit = async (event) =>{
        setDisabled(true);
        event.preventDefault();
        dispatch(layerActions.addLayer(value));
        setDisabled(false);
    }

    const handleRemove = async (idx) => {
        setDisabled(true);
        dispatch(layerActions.removeLayer(idx))
        dispatch(layerActions.reIndexing())
        setDisabled(false);
    }

    return(
        <div className="w-full bg-yellow-200">
            <span className="ml-6 mt-2">sequence 설명</span>
            <form className="relative pb-20 bg-yellow-400"
            onSubmit={handleSubmit}>
                <div>
                    {props.info.filter((n)=> n.name === "mainParams")[0].params.map(v => {
                    return (
                        <Inputs props={{
                            ...v,
                            value: value,
                            setValue: setValue
                        }}/>
                        )
                    })}
                </div>
                <button className="cursor-pointer" type="button" onClick={()=>setSubOpen(!isSubOpen)}>
                    Advanced setting
                </button>
                
                <div className={`${isSubOpen? "" : "hidden opacity-0 cursor-default"}`}>
                    {props.info.filter((n)=>n.name === "subParams")[0].params.map(v => {
                        return (
                            <Inputs props={{
                                ...v,
                                value: value,
                                setValue: setValue
                            }}/>
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
                        layers.map(layer => {
                            return (
                                <div className="flex justify-between">
                                    <p>{layer.idx} Layer {JSON.stringify(layer.info)}</p>
                                    <button className="text-center hover:bg-red-500" 
                                    type="button" 
                                    onClick={()=>handleRemove(layer.idx)}>
                                        X
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sequence;