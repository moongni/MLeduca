import React from "react";
import Box from "./Box";
import data from "../../data/data.json"
import ResetButton from "./ResetButton";
import { compileActions } from "../../reducers/compileSlice";

function Losses() {
    const losses = data.Compile.filter(v => v.title === "loss")[0].info;
    
    return (
        <div>
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