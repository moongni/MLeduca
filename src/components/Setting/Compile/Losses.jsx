import React, { useState } from "react";
import Box from "./Box";
import data from "../../../data/data.json"
import { compileActions } from "../../../reducers/compileSlice";
import { useNav } from "../../Common/singlePageNav/useNav"
import style from "../../Common/component.module.css";
import Title from "../../Common/title/title";
import { AiOutlineControl } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Alect from "../../Common/alert/Alert";

function Losses() {
    const dispatch = useDispatch();
    const losses = data.Compile.filter(v => v.title === "loss")[0].info;
    const lossRef = useNav("Loss");

    const [ isAlectVisable, setAlectVisiable] = useState(false);

    const selectHandler = async (event, title, value) => {
        event.preventDefault();
        const setData = async () => {
            dispatch(compileActions.setLoss(title));
        }
        setData()
        .then( _ => {
            setAlectVisiable(true);
            setTimeout(() => {
                setAlectVisiable(false);
            }, 1000);
        })
        .catch( response => console.log(response));
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
            <Alect 
                message="Loss saved" 
                value={isAlectVisable}
                setValue={setAlectVisiable}
            />
        </div>
    );
}

export default Losses;