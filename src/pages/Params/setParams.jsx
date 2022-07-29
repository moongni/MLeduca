import React, { useState, useEffect } from "react";
import Inputs from "../../components/Inputs";
import data from "../../data/data.json"
import { useDispatch, useSelector } from "react-redux";
import { paramActions } from "../../reducers/paramSlice";

function SetParams(){
    const params = useSelector((state) => state.parameter.info);
    const dispatch = useDispatch();

    const dataForInputs = data.modelParams
    const [value, setValue] = useState({});
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) => {
        setDisabled(true);
        event.preventDefault();
        dispatch(paramActions.setParam(value));
        setDisabled(false);
        }

    const handleRemove = async () => {
        setDisabled(true);
        dispatch(paramActions.removeParam());
        setDisabled(false);
    }
    
    return (
        <div className="relative w-full">
            <button className="h-10 w-20 mb-2 bg-red-200 rounded-md  hover:bg-red-400 cursor-pointer"
        onClick={()=>handleRemove()}>Reset</button>
            <form className="relative border-2 pb-20 border-black bg-yellow-400"
            onSubmit={handleSubmit}>
                {dataForInputs.map(param => {
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
                    <div className="flex justify-between">
                    </div>

                    {
                        // p.map(param => {
                        //     return (
                        //         <div className="flex justify-between">
                        //             <p>{param[0]} {param[1]}</p>
                        //             <button className="text-center hover:bg-red-500" 
                        //             type="button" 
                        //             onClick={()=>handleRemove()}>
                        //                 X
                        //             </button>
                        //         </div>
                        //     )
                        // })
                        // sequenceLayers.map(layer => {
                        //     return (
                        //         <div className="flex justify-between">
                        //             <p>{layer.idx} Layer {JSON.stringify(layer.info)}</p>
                        //             <button className="text-center hover:bg-red-500" 
                        //             type="button" 
                        //             onClick={()=>handleRemove(layer.idx)}>
                        //                 X
                        //             </button>
                        //         </div>
                        //     )
                        // })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default SetParams;