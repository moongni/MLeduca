import React from "react";
import { useState } from "react";
import Inputs from "../../Common/inputs/Inputs";
import { AdvancedSettingButton } from "../../Common/button/Button";

function Box({style, ...props}){
    const [value, setValue] = useState({});
    const [isSubOpen, setSubOpen] = useState(false);

    const boxStyle = {
        container:{
            margin: "30px 10px",
        },
        header: {
            fontSize: "1.25rem",
            lineHeight: "1.75rem"
        }
    }

    return (
        <div style={boxStyle.container}>
            <button onClick={(event)=> props.selectHandler(event, props.info.title, value)}>
                <h2 className="hover:opacity-50"
                    style={boxStyle.header}
                >
                    {props.info.title}
                </h2>
            </button>
            {props.info.params &&
                <AdvancedSettingButton 
                    type="button" 
                    value={isSubOpen}
                    setValue={setSubOpen}/>
            }
            <div className={`${isSubOpen? "" : "hidden opacity-0 cursor-default"}`}>
                {props.info.params &&
                    props.info.params.map(param => (
                        <Inputs 
                            {...param}
                            style={{"paddingLeft":"10px"}}
                            value={value}
                            setValue={setValue}
                        />
                ))}
            </div>
        </div>
    )
}

export default Box;