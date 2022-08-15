import React from "react";
import Box from "./Box";
import data from "../../data/data.json"
import ResetButton from "./ResetButton";
import { compileActions } from "../../reducers/compileSlice";

function Optimizers() {
    const optimizers = data.Compile.filter(v => v.title === "optimizer")[0].info;
    return (
        <div>
            <ResetButton onClick={compileActions.removeOptimizer}/>
            <div>
                {optimizers.map((info) => {
                    return (
                        <Box 
                            title="optimizer" 
                            info={info} 
                            >
                        </Box>);
                })}
            </div>
        </div>
    );
}

export default Optimizers;