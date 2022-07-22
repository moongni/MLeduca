import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modelInfoActions } from '../reducers/model';

function Box(props){
    const modelInfo = useSelector((state) => state.modelInfo.info);
    const dispatch = useDispatch();

    const selectInfoHandler = () => {
        modelInfo.length > 0 && dispatch(modelInfoActions.removeInfo(props.info.title));
        dispatch(modelInfoActions.addInfo(props.info))
    };
    return (
        <button className="relative m-4 w-full rounded-lg bg-blue-100 hover:bg-slate-300 cursor-pointer"
        style={props.style} onClick={selectInfoHandler}>
            <div className="absolute text-left top-0 left-0 w-full p-4 text-lg font-medium border-b-2">
                <h2>{props.info.info}</h2>
            </div>
            <div className="text-left left-0 w-full pt-2 pl-10">
                <p>{props.info.description}</p>
            </div>
        </button>
    )
}

export default Box;