import React from "react";
import Box from "./Box";
import data from "../../../data/data.json"
import { compileActions } from "../../../reducers/compileSlice";
import { useNav } from "../../Common/singlePageNav/useNav";
import style from "../../Common/component.module.css";
import Title from "../../Common/title/title";
import { AiOutlineControl } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Button } from "../../Common/button/Button";

function Optimizers() {
    const dispatch = useDispatch();
    const optimizers = data.Compile.filter(v => v.title === "optimizer")[0].info;
    const optimizerRef = useNav('Optimizer');

    const selectHandler = async (event, title, value) => {
        event.preventDefault();
        const data = {
            "title": title,
            "value": value
        }
        dispatch(compileActions.setOptimizer(data));
    };
    
    return (
        <div
            className={style.container}
            ref={optimizerRef}
            id="optimizerContainer"
        >
            <Title title="Optimizer" icon={<AiOutlineControl/>}/>

            <div className={style.subContainer}>
                <Button
                    className="right red"
                    style={{"width":"4rem"}}
                    type="button"
                    onClick={() => dispatch(compileActions.removeOptimizer())}>
                        Reset
                </Button>
                {optimizers.map((info) => (
                    <Box 
                        info={info} 
                        selectHandler={selectHandler}
                    />
                ))}
            </div>
        </div>
    );
}

export default Optimizers;