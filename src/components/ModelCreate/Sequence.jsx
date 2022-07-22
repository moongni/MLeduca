import React from "react";

function Sequence(props) {
    return(
        <div className="w-full bg-yellow-200">
            <span className="ml-6 mt-2">sequence</span>
        {props.info.filter(i => i !== "activation").map(v => {
        return (
            <div className="flex justify-between items-center h-14 w-full
             bg-yellow-400">
                <span className="ml-10">{v}</span>
                <input className="mr-10 border-2 border-black bg-yellow-400"></input>
            </div>
            )
        })}
        </div>
    )
}

export default Sequence;