import React from "react";
import { useDispatch } from "react-redux"
import { modelInfoActions } from "../../reducers/model"

function ResetButton(props) {
    const dispatch = useDispatch();
    const resetBtn = (props) => {
        dispatch(modelInfoActions.removeInfo(props));
    };
    return (
        <button className="h-10 w-20 bg-red-200 rounded-md  hover:bg-red-400 cursor-pointer"
        onClick={()=>resetBtn(props.title)}>Reset</button>
    )
}

export default ResetButton;