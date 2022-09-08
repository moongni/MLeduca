import React from "react";
import { useState } from "react";
import Inputs from "../../Common/inputs/Inputs";
import { AdvancedSettingButton } from "../../Common/button/Button";

function Box({...props}){
    const [value, setValue] = useState({});
    const [isSubOpen, setSubOpen] = useState(false);

    return (
        <div className="mb-4 hover:bg-slate-300 rounded-lg">
            <button 
                className="relative w-full min-h-78px cursor-pointer"
                style={props.style}
                onClick={(event)=> props.selectHandler(event, props.info.title, value)}
            >
                <div className="absolute top-0 left-0 my-4 w-full text-lg font-medium border-b-2">
                    <h2 className="relative left-4 text-left">{props.info.title}</h2>
                </div>
                <div className="relative text-left left-0 pt-11 pl-10 w-full">
                    <p>{props.info.description}</p>
                </div>
            </button>
            { props.info.params &&
                <AdvancedSettingButton 
                    type="button" 
                    value={isSubOpen}
                    setValue={setSubOpen}
                />
            }
            <div className={`${isSubOpen? "" : "hidden opacity-0 cursor-default"}`}>
                { props.info.params &&
                    props.info.params.map(param => (
                            <Inputs 
                                {...param}
                                value={value}
                                setValue={setValue}
                            />
                    ))
                }
            </div>
        </div>
    )
}

export default Box;