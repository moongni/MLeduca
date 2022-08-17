import React, { useState } from "react";
import Inputs from "../../components/Common/Inputs";
import data from "../../data/data.json"
import { useDispatch, useSelector } from "react-redux";
import { paramActions } from "../../reducers/paramSlice";

function SetParams(){
    const params = useSelector((state) => state.parameter.info);
    const dispatch = useDispatch();

    const dataForInputs = data.Parameters
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
    console.log(params);
    return (
        <div className="relative w-full rounded-2xl p-5 mb-4 bg-slate-50 shadow-lg shadow-slate-400">
            <form className="relative pb-20 bg-yellow-400"
                onSubmit={handleSubmit}>
                {
                    dataForInputs.map(param => (
                            <Inputs props={{
                                ...param,
                                value: value,
                                setValue: setValue
                            }}/>
                        )
                    )
                }
                <div className="absolute w-full bottom-3 text-center items-center">
                    <button className="h-10 w-20 mb-2 mr-2 bg-red-200 rounded-md  hover:bg-red-400 cursor-pointer"
                        type="button"
                        onClick={()=>handleRemove()}>
                            Reset
                    </button>
                    <button className="w-20 h-10 bottom-3 rounded-md
                        bg-green-200 hover:bg-green-400 cursor-pointer disabled:bg-slate-400" 
                        type="submit"
                        disabled={disabled}>
                            Set Param
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SetParams;