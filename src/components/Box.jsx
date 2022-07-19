import React from "react";

function Box({header, contents}){
    return (
        <button className=" border-x-0 border-t-0 rounded-lg hover:bg-slate-300 cursor-pointer"
        style={{"minHeight": "200px", "minWidth":"250px"}}>
            <div className="top-0 left-0 w-full pt-2 text-lg text-center font-medium border-b-2 border-slate-400">
                <h2>{header}</h2>
            </div>
                <p>{contents}</p>
        </button>
    )
}

export default Box;