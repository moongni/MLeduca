import React from "react";
import Inputs from "../Common/inputs/Inputs";
import { toArray, toOption, selectColumn } from "../Common/package";
import { Button } from "../Common/button/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

const SetColumn = ({ setData, setColumn, setLoading, ...props }) => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.data.info);
    const dataColumns = useSelector((state) => state.data.columns);
    
    const [ selectedValue, setSelectedValue ] = useState([]);

    const onClickHandler = async () => {
        try {
            setLoading(true);
        
            console.log("set column call");
            

            const newCol = toArray(selectedValue);
            const newData = selectColumn(data, newCol);
            
            dispatch(setData(newData));
            dispatch(setColumn(newCol));
        
        } catch (err) {
        
            console.log(err);
            alert("error : ", err);
        
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
        <>
            <div style={divStyle}>
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
                        .then( _ => setLoading(false));
                    }}
                >
                    Save
                </Button>
            </div>
        </>
    )
}

export default SetColumn