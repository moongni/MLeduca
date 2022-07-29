import React from "react";
import { useDispatch } from "react-redux"
import { compileActions } from "../../reducers/compileSlice"

function ResetButton(props) {
    const dispatch = useDispatch();
    const handleOnClick = (props) => {
        dispatch(compileActions.removeCompile(props));
    };

    return (
        <button className="h-10 w-20 mb-2 bg-red-200 rounded-md  hover:bg-red-400 cursor-pointer"
        onClick={()=>handleOnClick(props.title)}>Reset</button>
    )
}


export default ResetButton;