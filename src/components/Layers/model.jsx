import React from "react";

function Model(props) {
    return (
        <div className="w-full bg-red-200">
            <span className="ml-6 mt-2">Model</span>
            {props.info.filter(i => i !== "activation")
                .map(v => (
                    <div className="flex justify-between items-center h-14 w-full 
                    bg-yellow-400">
                        <span className="ml-10">{v}</span>
                        <form className="mr-10 border-2 border-black bg-yellow-400">
                            <input className=""></input>
                        </form>
                    </div>
            ))}
        </div>
    )
}

export default Model;