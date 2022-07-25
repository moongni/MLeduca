import React from "react";
import { useDispatch } from "react-redux"
import { modelSelectionActions } from "../../reducers/modelSelectionSlice"

function ResetButton(props) {
    const dispatch = useDispatch();
    const resetBtn = (props) => {
        dispatch(modelSelectionActions.removeInfo(props));
    };
    return (
        <button className="h-10 w-20 mb-2 bg-red-200 rounded-md  hover:bg-red-400 cursor-pointer"
        onClick={()=>resetBtn(props.title)}>Reset</button>
    )
}

export default ResetButton;