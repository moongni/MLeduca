import React from "react";
import Box from "./Box";
import data from "../../../data/data.json"
import { compileActions } from "../../../reducers/compileSlice";
import { useNav } from "../../Common/singlePageNav/useNav"
import style from "../../Common/component.module.css";
import Title from "../../Common/title/title";
import { AiOutlineControl } from "react-icons/ai";
import { useDispatch } from "react-redux";

function Losses() {
    const dispatch = useDispatch();
    const losses = data.Compile.filter(v => v.title === "loss")[0].info;
    const lossRef = useNav("Loss");

    const selectHandler = async (event, title, value) => {
        event.preventDefault();
        dispatch(compileActions.setLoss(title));
    };

    return (
        <div
            className={style.container}
            ref={lossRef}
            id="lossContainer">
            <Title title="Loss" icon={<AiOutlineControl/>}/>
            <div className={style.subContainer}>
                {losses.map((info) => (
                    <Box 
                        info={info} 
                        style={{"minHeight": "200px"}}
                        selectHandler={selectHandler}>
                    </Box>
                ))}
            </div>
        </div>
    );
}

export default Losses;