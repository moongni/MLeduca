import React, {useState, useEffect} from "react";
import Box from "../../components/Box";
import data from "../../data/data.json"
import ResetButton from "../../components/ModelSelection/ResetButton";

function Gradients() {

    const optimizers = data.modelSelection.filter(v => v.title === "gradient");

    return (
        <div className="w-full">
            <ResetButton title="gradient"/>
            <div>{optimizers.map((info) => {
                return (<Box info={info} style={{"minHeight": "200px"}}></Box>);
            })}</div>
        </div>
    );
}

export default Gradients;