import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trainActions } from "../../reducers/trainSlice";
import Inputs from "../Common/Inputs";

export const toOption = (items) => {
    const newOptions = [];
    items.map(item => newOptions.push({
        label: item,
        value: item
    }))
    return newOptions
}

export const toArray = (options) => {
    const newArray = [];
    options.map(option => newArray.push(option.value));
    return newArray;
}

const SetColumn = ({props}) => {
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
                        }}>Set</button>
            </div>
            {/* <div className="flex justify-between items-center h-14 w-full bg-yellow-400 mb-2">
                <Inputs props={{
                        kind: "MultiSelect",
                        title: "Features",
                        value: props.selectedFeatures,
                        setValue: props.setSelectedFeatures,
                        options: props.featureOptions,
                    }}
                    />
                <button className="mx-10" type="button" 
                        onClick={()=>{
                            props.handleFeatureClick();
                        }}>Set</button>
            </div> */}
        </>
    )
}

export default SetColumn