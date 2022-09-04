import React from "react";
import Box from "./Box";
import data from "../../../data/data.json"
import ResetButton from "./ResetButton";
import { compileActions } from "../../../reducers/compileSlice";
import { useNav } from "../../Common/singlePageNav/useNav";

function Optimizers() {
    const optimizers = data.Compile.filter(v => v.title === "optimizer")[0].info;
    const optimizerRef = useNav('Optimizer');

    return (
        <div
            className="relative w-full rounded-2xl p-5 mb-4 bg-slate-50 shadow-lg shadow-slate-400"
            ref={optimizerRef}
            id="optimizerContainer"
        >
            <ResetButton 
                onClick={compileActions.removeOptimizer}
            />
            <div>
                {optimizers.map((info) => (
                    <Box 
                        title="optimizer" 
                        info={info} 
                        />
                ))}
            </div>
        </div>
    );
}

export default Optimizers;