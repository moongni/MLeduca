import React from "react";
import Box from "./Box";
import data from "../../../data/data.json"
import ResetButton from "./ResetButton";
import { compileActions } from "../../../reducers/compileSlice";
import { useNav } from "../../Common/singlePageNav/useNav"

function Losses() {
    const losses = data.Compile.filter(v => v.title === "loss")[0].info;
    const lossRef = useNav("Loss");

    return (
        <div
            className="relative w-full rounded-2xl p-5 mb-4 bg-slate-50 shadow-lg shadow-slate-400"
            ref={lossRef}
            id="lossContainer">
            <ResetButton 
                onClick={compileActions.removeLoss}
            />
            <div>
                {losses.map((info) => (
                        <>
                            <Box 
                                title="loss" 
                                info={info} 
                                style={{"minHeight": "200px"}}>
                                </Box>
                            
                        </>
                ))}
            </div>
        </div>
    );
}

export default Losses;