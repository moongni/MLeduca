import React, { useState } from "react";
import Inputs from "../../components/Inputs";
import data from "../../data/data.json"
import { useDispatch, useSelector } from "react-redux";

function SetParams(){
    const dispatch = useDispatch();

    const params = data.modelParams
    const [value, setValue] = useState({});
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) => {

    }
    const handleRemove = async (event) => {

    }

    return (
        <div className="relative w-full">
            <form className="relative border-2 pb-20 border-black bg-yellow-400"
            onSubmit={handleSubmit}>
                {params.map(param => {
                    return (
                        <Inputs props={{
                            ...param,
                            value: value,
                            setValue: setValue
                        }}/>
                    )
                })}
                                <button className="absolute w-fit h-10 bottom-3 left-1/2
                bg-green-200 hover:bg-green-400 cursor-pointer disabled:bg-slate-400" 
                type="submit"
                disabled={disabled}>
                    Add Param
                </button>
            </form>
            <div className="w-full">
                <div className="w-full bg-blue-200">
                    {
                        sequenceLayers.map(layer => {
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

export default SetParams;