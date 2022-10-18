import React, { useState } from "react";
import Inputs from "../Common/inputs/Inputs";
import data from "../../data/data.json"
import { useDispatch, useSelector } from "react-redux";
import { paramActions } from "../../reducers/paramSlice";
import { useNav } from "../Common/singlePageNav/useNav"
import style from "../Common/component.module.css";
import Title from "../Common/title/title";
import { AiOutlineControl } from "react-icons/ai";
import { Button } from "../Common/button/Button";
import Alect from "../Common/alert/Alert";

function Params(){
    const dispatch = useDispatch();

    const dataForInputs = data.Parameters
    const [value, setValue] = useState({});
    const [disabled, setDisabled] = useState(false);

    const [ isAlectVisable, setAlectVisiable ] = useState(false);
    const [ message, setMessage ] = useState("");

    const handleSubmit = async (event) => {
        setDisabled(true);
        event.preventDefault();
        const setData = async () => {
            dispatch(paramActions.setParam(value));
        }
        setData()
        .then( _ => {
            setAlectVisiable(true);
            setMessage("parameter saved");
            setTimeout(() => {
                setAlectVisiable(false);
            }, 1000);
        })
        .catch( response => console.log(response));
        setDisabled(false);
    }

    const handleRemove = async () => {
        setDisabled(true);
        const setData = async () => {
            dispatch(paramActions.removeParam());
        }
        setData()
        .then( _ => {
            setAlectVisiable(true);
            setMessage("parameter removed");
            setTimeout(() => {
                setAlectVisiable(false);
            }, 1000);
        })
        .catch( response => console.log(response));
        setDisabled(false);
    }

    const paramRef = useNav('Param');

    return (
        <div 
            className={style.container}
            ref={paramRef}
            id="paramContainer"
        >
            <Title title="Parameter" icon={<AiOutlineControl/>}/>
            <form 
                className={style.subContainer}
                onSubmit={handleSubmit}
            >
                {dataForInputs.map(
                        param => (
                            <Inputs 
                                {...param}
                                value={value}
                                setValue={setValue}/>
                ))}
                <div style={{"position":"relative",
                            "left":"50%",
                            "display":"flex",
                            "transform":"translateX(-50%)",
                            "justifyContent":"center"}}
                >
                    <Button
                        className="red"
                        style={{"width":"8rem",
                                "margin":"0.5rem",
                                "height":"2.5rem"}}
                        type="button"
                        onClick={() => handleRemove()}>
                        Reset
                    </Button>
                    <Button
                        className="green"
                        style={{"width":"8rem",
                                "margin":"0.5rem",
                                "height":"2.5rem"}}
                        type="submit"
                        disabled={disabled}>
                        set Param
                    </Button>
                </div>
            </form>
            <Alect
                message={message}
                value={isAlectVisable}/>
        </div>
    )
}

export default Params;