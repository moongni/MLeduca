import React, { useState } from "react";
import Inputs from "../Common/inputs/Inputs";
import data from "../../data/data.json"
import { useDispatch } from "react-redux";
import { useNav } from "../Common/singlePageNav/useNav"
import mainStyle from "../Common/component.module.css";
import Title from "../Common/title/title";
import { AiOutlineControl } from "react-icons/ai";
import { Button } from "../Common/button/Button";
import { settingActions } from "../../reducers/settingSlice";

function Params({ ...props }){
    const dispatch = useDispatch();

    const dataForInputs = data.Parameters
    
    const [ value, setValue ] = useState({});
    const [ disabled, setDisabled ] = useState(false);

    const paramRef = useNav('Param');

    const handleSubmit = async (event) => {
        const setData = async () => {
            dispatch(settingActions.setParam(value));
        }
        
        setDisabled(true);

        event.preventDefault();
        
        setData()
        .then( _ => {
            props.setAlectMsg("parameter saved");
            props.setAlectVisiable(true);
        })
        .catch( response => alert(response) );
        
        setDisabled(false);
    }

    const handleRemove = async () => {
        setDisabled(true);
        
        const setData = async () => {
            dispatch(settingActions.removeParam());
        }
        
        setData()
        .then( _ => {
            props.setAlectMsg("parameter removed");
            props.setAlectVisiable(true);
        })
        .catch( response => alert(response));
        
        setDisabled(false);
    }


    return (
        <div 
            className={mainStyle.container}
            ref={paramRef}
            id="paramContainer"
        >
            <Title title="파라미터 설정" icon={<AiOutlineControl/>}/>
            <form 
                className={mainStyle.subContainer}
                onSubmit={handleSubmit}
            >
                {dataForInputs.map(
                    param => (
                        <Inputs 
                            {...param}
                            value={value}
                            setValue={setValue}/>
                ))}
                <div className={mainStyle.centerContainer}>
                    <Button
                        className="red inCenter"
                        type="button"
                        onClick={() => handleRemove()}>
                        초기화
                    </Button>
                    <Button
                        className="green inCenter"
                        type="submit"
                        disabled={disabled}>
                        적용
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Params;