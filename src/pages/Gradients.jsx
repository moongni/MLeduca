import React, {useState, useEffect} from "react";
import Box from "../components/Box";
import data from "../data/data.json"

function Gradients() {

    const optimizers = data.modelSelection.filter(v => v.title === "Gradients");

    return (
        <div>{optimizers.map((info) => {
            return (<Box info={info}></Box>);
        })}</div>
    );
}

export default Gradients;