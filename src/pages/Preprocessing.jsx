import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { trainActions } from "../reducers/trainSlice";
import SetColumn, { toArray, toOption } from "../components/Preprocessing/SetColum";
import DataTable from "../components/Common/DataTable";


const Preprocessing = () => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.data.info);
    const dataColumns = useSelector((state) => state.data.columns);
    const labels = useSelector((state) => state.train.labels);
    const labelData = useSelector(state => state.train.y);
    const features = useSelector((state) => state.train.features);
    const featureData = useSelector((state) => state.train.x);

    // 선택된 특성
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    
    // 멀티 셀렉트 옵션 구성
    const [columnOption, setColumnOption] = useState([]);
    const [labelOptions, setLabelOptions] = useState([]);
    const [featureOptions, setFeatureOptions] = useState([]);

    useEffect(() => {
        const newLabelOption = columnOption.filter(option => !selectedFeatures.includes(option));
        const newFeatureOption = columnOption.filter(option => !selectedLabels.includes(option));
        setLabelOptions(newLabelOption);
        setFeatureOptions(newFeatureOption);

    }, [selectedLabels, selectedFeatures])

    // 옵션 초기화
    useEffect(() => {
    //     console.log(2);
        const initOptions = toOption(dataColumns);
        setColumnOption(initOptions);

        let initLabels = [];
        if (Array.isArray(labels) && labels.length !== 0) {
            initLabels = toOption(labels);
            setFeatureOptions(initOptions.filter(option => !initLabels.includes(option)));
        } else {
            setFeatureOptions(initOptions);
        }
        setSelectedLabels(initLabels);
        
        let initFeatures = [];
        if (Array.isArray(features) && features.length !== 0){
            initFeatures = toOption(features);
            setLabelOptions(initOptions.filter(option => !initFeatures.includes(option)));
        } else {
            setLabelOptions(initOptions);
        }
        setSelectedFeatures(initFeatures);

    }, []);

    const makeArray = (data, columns)=>{
        const newData = [];
        data.map(sample => {
            const curData = [];
            labels.map(columns=> {
                curData.push(sample[columns]); 
            })
            newData.push(curData);
        })
        return newData
    }
    const handleLabelClick = () => {
        dispatch(trainActions.setLabels(toArray(selectedLabels)));
        const newData = makeArray(data, labels);
        dispatch(trainActions.setLabelData(newData));
    }
    const handleFeatureClick = () => {
        dispatch(trainActions.setFeatures(toArray(selectedFeatures)));
        const newData = makeArray(data, features);
        dispatch(trainActions.setFeatureData(newData));
    }

    return (
        <>
            <SetColumn props={{
                title: "Labels",
                selected: selectedLabels,
                setSelected: setSelectedLabels,
                options: labelOptions,
                handleClick: handleLabelClick,
            }}/>
            <DataTable
                props={{
                    data: labelData,
                    columns: labels
                }}
            />
            <SetColumn props={{
                title: "Features",
                selected: selectedFeatures,
                setSelected: setSelectedFeatures,
                options: featureOptions,
                handleClick: handleFeatureClick,                
            }}/>
            <DataTable
                props={{
                    data: featureData,
                    columns: features
                }}
            />
            {/* <div className="flex justify-between items-center h-14 w-full bg-yellow-400 mb-2">
                <Inputs props={{
                        kind: "MultiSelect",
                        title: "Labels",
                        value: selectedLabels,
                        setValue: setSelectedLabels,
                        options: labelOptions,
                    }}
                    />
                <button className="mx-10" type="button" 
                        onClick={()=>{
                            handleLabelClick();
                        }}>Set</button>
            </div>
            <div className="flex justify-between items-center h-14 w-full bg-yellow-400 mb-2">
                <Inputs props={{
                        kind: "MultiSelect",
                        title: "Features",
                        value: selectedFeatures,
                        setValue: setSelectedFeatures,
                        options: featureOptions,
                    }}
                    />
                <button className="mx-10" type="button" 
                        onClick={()=>{
                        }}>Set</button>
            </div> */}
            {/* <div className="mb-10 min-h-78px rounded-xl bg-slate-300">
                {
                    dataLabel.map(label => {
                        return (
                            <div className="flex justify-between">
                                <p>{label}</p>
                                <button className="text-center hover:bg-red-500" 
                                type="button" 
                                onClick={()=>dispatch(dataActions.removeLabel(label))}
                                >
                                    X
                                </button>
                        </div>
                        )
                    })
                }
            </div> */}
        </>
    )
}

export default Preprocessing;