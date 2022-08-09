import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compileActions } from '../../reducers/compileSlice';
import Inputs from "../Common/Inputs";

function Box(props){
    const compile = useSelector((state) => state.compile.info);
    const dispatch = useDispatch();
    const [value, setValue] = useState({});
    const [isSubOpen, setSubOpen] = useState(false);

    const selectInfoHandler = async () => {
        // dispatch(compileActions.initialize());
        Object.keys(compile).length > 0 && dispatch(compileActions.removeCompile(props.title));
        dispatch(compileActions.addCompile({
            title: props.title,
            value: props.info.name }))
        };

    return (
        <button className="relative mb-4 w-full min-h-78px rounded-lg bg-blue-100 hover:bg-slate-300 cursor-pointer"
        style={props.style} onClick={selectInfoHandler}>
            <div className="absolute top-0 left-0 w-full my-4 text-lg font-medium border-b-2">
                <h2 className="relative left-4 text-left">{props.info.name}</h2>
            </div>
            <div className="relative left-0 top-11 w-full h-fit">
                <div className="text-left left-0 w-full pt-2 pl-10">
                    <p>{props.info.description}</p>
                </div>
                <button className="cursor-pointer" 
                    type="button" 
                    onClick={()=>setSubOpen(!isSubOpen)}>
                    Advanced setting
                </button>
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
        </button>
    )
}

export default Box;