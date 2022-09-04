import React from "react";
import Title from "../../Common/title/title";
import style from "../../Common/component.module.css";
import { useState } from "react";
import Inputs from "../../Common/inputs/Inputs";

function Model({icon, ...props}) {
    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState([]);

    const handleSubmit = async (event) => {
        setDisabled(true);
        event.preventDefault();
        setDisabled(false);        
    }

    return (
        <div>
            <Title title="Model" icon={icon}/>
            <form
                className={style.subContainer}
                onSubmit={handleSubmit}
            >
                { props.info.filter(n => n.name === "mainParams")[0].params
                    .map(v => (
                        <Inputs
                            {...v}
                            value={value}
                            setValue={setValue}/>
                    ))}
            </form>
        </div>
    )
}

export default Model;