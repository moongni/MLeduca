import React from "react";

function Box(props){
    return (
        <button className="relative m-4 w-full border-x-0 border-t-0 rounded-lg bg-blue-100 hover:bg-slate-300 cursor-pointer"
        style={{"minHeight": "200px"}} onClick={props.onClick}>
            <div className="absolute text-left top-0 left-0 w-full p-4 text-lg font-medium border-b-2">
                <h2>{props.header}</h2>
            </div>
            <div className="text-left left-0 w-full pt-2 pl-10">
                <p>{props.contents}</p>
            </div>
        </button>
    )
}

export default Box;