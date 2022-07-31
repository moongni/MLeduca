import React, {useState, useEffect} from "react";
import Box from "../Box";
import data from "../../data/data.json"
import ResetButton from "./ResetButton";

function Gradients() {

    const gradients = data.Compile.filter(v => v.title === "gradient")[0].info;

    return (
        <div className="w-full">
            <ResetButton title="gradient"/>
            <div>{gradients.map((info) => {
                return (<Box title="gradient" info={info} style={{"minHeight": "200px"}}></Box>);
            })}</div>
        </div>
    );
}

export default Gradients;