import React from "react";
import { useSelector } from 'react-redux'

function MakeLayers() {

    return(
        <div className="relative w-full min-h-full">
            <div className="absolute flex h-10 top-0 left-0 w-full">
                <div className="w-full px-3 text-xl rounded-t-md border-x-2 border-t-2 border-blue-200 bg-blue-100 text-center"
                style={{"maxWidth":"auto"}}>sequence</div>
                <div className="w-full px-3 text-xl rounded-t-md border-x-2 border-t-2 border-blue-200 bg-blue-100 text-center"
                style={{"maxWidth":"auto"}}>model</div>
            </div>
            <div className="w-full h-80 pt-10 bg-orange-200">
            </div>
        </div>
    )
}

export default MakeLayers