import React from "react";
import Inputs from "../Common/Inputs";

const SetColumn = ({...props}) => {
    return (
        <>
            <div className="flex justify-between items-center h-14 w-full bg-yellow-400 mb-2">
                <Inputs props={{
                        kind: "MultiSelect",
                        title: props.title,
                        value: props.selected,
                        setValue: props.setSelected,
                        options: props.options,
                    }}
                    />
                <button className="mx-10" type="button" 
                        onClick={()=>{
                            props.handleClick();
                        }}>Save</button>
            </div>
        </>
    )
}

export default SetColumn