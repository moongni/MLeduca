import React, { useState } from "react";
import Box from "./Box";
import data from "../../../data/data.json"
import { compileActions } from "../../../reducers/compileSlice";
import { useNav } from "../../Common/singlePageNav/useNav";
import style from "../../Common/component.module.css";
import Title from "../../Common/title/title";
import { AiOutlineControl } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Button } from "../../Common/button/Button";
import Alect from "../../Common/alert/Alert";

function Optimizers() {
    const dispatch = useDispatch();
    const optimizers = data.Compile.filter(v => v.title === "optimizer")[0].info;
    const optimizerRef = useNav('Optimizer');

    const [ isAlectVisable, setAlectVisiable] = useState(false);

    const selectHandler = (event, title, value) => {
        const setData = async () => {
            const data = {
                "title": title,
                "value": value
            }
            dispatch(compileActions.setOptimizer(data))
        }

        event.preventDefault();
        
        setData()
        .then( _ => {
            setAlectVisiable(true);
            setTimeout(() => {
                setAlectVisiable(false);
            }, 3000);
        })
        .catch(response => console.log(response));
    };

    return (
        <div
            className={style.container}
            ref={optimizerRef}
            id="optimizerContainer"
        >
            <div style={{"display":"flex", "justifyContent":"space-between"}}>
                <Title title="Optimizer" icon={<AiOutlineControl/>}/>
                <Button
                    className="right red"
                    style={{"width":"4rem"}}
                    type="button"
                    onClick={() => dispatch(compileActions.removeOptimizer())}>
                        Reset
                </Button>

            </div>

            <div className={style.subContainer}>
                <Alect 
                    message="Optimizer saved" 
                    value={isAlectVisable}
                    setValue={setAlectVisiable}
                />
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