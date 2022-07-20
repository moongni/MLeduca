import React, {useState, useEffect} from "react";
import Box from "../components/Box";
import data from "../data/data.json"

function Optimizers() {

    const optimizers = data.modelSelection.filter(v => v.id === "Optimizers");

    return (
        <div>{optimizers[0].contents.map((optimizer) => {
            return (<Box header={optimizer}></Box>);
        })}</div>
    );
}

export default Optimizers;