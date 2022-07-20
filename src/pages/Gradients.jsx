import React, {useState, useEffect} from "react";
import Box from "../components/Box";
import data from "../data/data.json"

function Gradients() {

    const optimizers = data.modelSelection.filter(v => v.id === "Gradients");

    return (
        <div>{optimizers[0].contents.map((optimizer) => {
            return (<Box header={optimizer}></Box>);
        })}</div>
    );
}

export default Gradients;