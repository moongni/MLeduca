import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { compileActions } from '../reducers/compileSlice';

function Box(props){
    const compile = useSelector((state) => state.compile.info);
    const dispatch = useDispatch();

    const selectInfoHandler = async () => {
        // dispatch(compileActions.initialize());
        Object.keys(compile).length > 0 && dispatch(compileActions.removeCompile(props.title));
        dispatch(compileActions.addCompile({
            title: props.title,
            value: props.info.name }))
        };
        
    return (
        <button className="relative mb-4 w-full rounded-lg bg-blue-100 hover:bg-slate-300 cursor-pointer"
        style={props.style} onClick={selectInfoHandler}>
            <div className="absolute text-left top-0 left-0 w-full p-4 text-lg font-medium border-b-2">
                <h2>{props.info.name}</h2>
            </div>
            <div className="text-left left-0 w-full pt-2 pl-10">
                <p>{props.info.description}</p>
            </div>
        </button>
    )
}

export default Box;