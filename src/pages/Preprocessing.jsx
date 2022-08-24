import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { trainActions } from "../reducers/trainSlice";
import SetColumn, { toArray, toOption } from "../components/Preprocessing/SetColum";
import ArrayTable from "../components/Common/ArrayTable";
import PreprocessingOptions from "../components/Preprocessing/PreprocessingOption";

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
    console.log(selectedLabels);
    
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

    const selectColumn = (data, columns) => {
        const newData = new Object();
        columns.map(column => {
            newData[column] = data[column]; 
        })
        return newData;
    }

    const handleLabelClick = () => {
        const labelNames = toArray(selectedLabels);
        const newData = selectColumn(data, labelNames);
        dispatch(trainActions.setLabelData(newData));
        dispatch(trainActions.setLabels(labelNames));
    }
    const handleFeatureClick = () => {
        const featureNames = toArray(selectedFeatures);
        const newData = selectColumn(data, featureNames);
        dispatch(trainActions.setFeatureData(newData));
        dispatch(trainActions.setFeatures(toArray(selectedFeatures)));
    }

    return (
        <>
            <div className="max-w-full max-h-fit rounded-2xl p-5 mb-4 bg-slate-50 shadow-lg shadow-slate-400">
                <SetColumn props={{
                    title: "Labels",
                    selected: selectedLabels,
                    setSelected: setSelectedLabels,
                    options: labelOptions,
                    handleClick: handleLabelClick,
                }}/>
                <ArrayTable
                        data={labelData}
                        columns={labels}
                >
                    <PreprocessingOptions
                        column={labels}/>
                </ArrayTable>
            </div>
            <div className="rounded-2xl p-5 mb-4 bg-slate-50 shadow-lg shadow-slate-400">
                <SetColumn props={{
                    title: "Features",
                    selected: selectedFeatures,
                    setSelected: setSelectedFeatures,
                    options: featureOptions,
                    handleClick: handleFeatureClick,                
                }}/>
                <ArrayTable
                        data={featureData}
                        columns={features}
                >
                </ArrayTable>
            </div >
        </>
    )
}

export default Preprocessing;