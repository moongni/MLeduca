import React, {useState, useEffect} from "react";
import Box from "../../components/Box";
import data from "../../data/data.json"
import ResetButton from "../../components/Compile/ResetButton";

function Optimizers() {

    const optimizers = data.Compile.filter(v => v.title === "optimizer")[0].info;

    return (
        <div>
            <ResetButton title="optimizer"/>
            <div>{optimizers.map((info) => {
                return (<Box title="optimizer" info={info} style={{"minHeight": "200px"}}></Box>);
            })}</div>
        </div>
    );
}

export default Optimizers;