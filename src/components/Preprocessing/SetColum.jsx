import React from "react";
import Inputs from "../Common/inputs/Inputs";
import { toOption } from "../Common/package";
import { Button } from "../Common/button/Button";

const SetColumn = ({...props}) => {
    const divStyle = {
        "display":"flex",
        "width":"100%",
        "height":"3.5rem",
        "marginBottom":"0.5rem",
        "justifyContent":"space-between",
        "alignItems":"center"
    }
    
    return (
        <>
            <div style={divStyle}>
                <Inputs 
                    kind="MultiSelect"
                    title={props.title}
                    value={props.selected}
                    setValue={props.setSelected}
                    options={toOption(props.columns)}
                />
                <Button 
                    className="right"
                    style={{"margin":"0 40px"}} 
                    type="button" 
                    onClick={()=>{props.handleClick();}}
                >
                    Save
                </Button>
            </div>
        </>
    )
}

export default SetColumn