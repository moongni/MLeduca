import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compileActions } from '../../reducers/compileSlice';
import Inputs from "../Common/Inputs";

function Box(props){
    const dispatch = useDispatch();
    const [value, setValue] = useState({});
    const [isSubOpen, setSubOpen] = useState(false);

    const selectInfoHandler = async () => {
        // dispatch(compileActions.initialize());
        switch(props.title){
            case "optimizer":
                const data = {
                    "title": props.info.title,
                    "value": value
                }
                dispatch(compileActions.setOptimizer(data));
                break;
            case "loss":
                dispatch(compileActions.setLoss(props.info.title));
            }
    };

    return (
        <div className="mb-4 bg-blue-100 hover:bg-slate-300 rounded-lg">
            <button className="relative w-full min-h-78px cursor-pointer"
                style={props.style} 
                onClick={selectInfoHandler}>
                <div className="absolute top-0 left-0 my-4 w-full text-lg font-medium border-b-2">
                    <h2 className="relative left-4 text-left">{props.info.title}</h2>
                </div>
                <div className="relative text-left left-0 pt-11 pl-10 w-full">
                    <p>{props.info.description}</p>
                </div>
            </button>
            {
                props.info.params &&
                <button className="cursor-pointer" 
                        type="button" 
                        onClick={()=>setSubOpen(!isSubOpen)}>
                        Advanced setting
                </button>
            }
            <div className={`${isSubOpen? "" : "hidden opacity-0 cursor-default"}`}>
                {
                    props.info.params &&
                    props.info.params.map(param => {
                        return (
                            <Inputs
                                props={{
                                    ...param,
                                    value: value,
                                    setValue: setValue
                                }}></Inputs>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Box;