import React, {useState, useEffect} from "react";
import Box from "../../components/Box";
import data from "../../data/data.json"
import ResetButton from "../../components/Compile/ResetButton";

function Losses() {
    const losses = data.Compile.filter(v => v.title === "loss")[0].info;
    
    return (
        <div>
            <ResetButton title="loss"/>
            <div>{losses.map((info) => {
                return (<Box title="loss" info={info} style={{"minHeight": "200px"}}></Box>);
            })}</div>
        </div>
    );
}

export default Losses;