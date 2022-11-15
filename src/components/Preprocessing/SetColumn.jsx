import React from "react";
import Inputs from "../Common/inputs/Inputs";
import { toArray, toOption, selectColumn } from "../Common/package";
import { Button } from "../Common/button/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SetColumn = ({ setData, setColumn, setLoading, data, dataColumns, style, ...props }) => {
    const dispatch = useDispatch();
    
    const [ selectedValue, setSelectedValue ] = useState([]);

    const onClickHandler = async () => {
        try {
            setLoading(true);
        
            const newCol = toArray(selectedValue);
            const newData = selectColumn(data, newCol);
            
            dispatch(setData(newData));
            dispatch(setColumn(newCol));
        
        } catch (err) {

            alert(err);

        }

    }

    const divStyle = {
        "display":"flex",
        "width":"100%",
        "height":"3.5rem",
        "marginBottom":"0.5rem",
        "justifyContent":"space-between",
        "alignItems":"center"
    }
    
    return (
        <div style={{...divStyle, ...style}}>
            <Inputs 
                kind="MultiSelect"
                title={props.title}
                value={selectedValue}
                setValue={setSelectedValue}
                options={toOption(dataColumns)}
            />
            <Button 
                className="right"
                style={{"margin":"0 40px"}} 
                type="button" 
                onClick={(e) => {
                    e.preventDefault();
                    onClickHandler()
                    .finally( _ => {
                        setLoading(false)
                    });
                }}
            >
                Save
            </Button>
        </div>
    )
}

export default SetColumn