import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { trainActions } from "../reducers/trainSlice";
import SetColumn, { toArray, toOption } from "../components/Preprocessing/SetColum";
import ArrayTable from "../components/Common/ArrayTable";

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

    const makeArray = (data, columns) => {
        const newData = [];
        data.map(sample => {
            const curData = [];
            columns.map(column=> {
                curData.push(sample[column]); 
            })
            newData.push(curData);
        })
        return newData
    }

    const handleLabelClick = () => {
        const newData = makeArray(data, toArray(selectedLabels));
        dispatch(trainActions.setLabelData(newData));
        dispatch(trainActions.setLabels(toArray(selectedLabels)));
    }
    const handleFeatureClick = () => {
        const newData = makeArray(data, toArray(selectedFeatures));
        dispatch(trainActions.setFeatureData(newData));
        dispatch(trainActions.setFeatures(toArray(selectedFeatures)));
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
            <ArrayTable
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
            <ArrayTable
                props={{
                    data: featureData,
                    columns: features
                }}
            />
        </>
    )
}

export default Preprocessing;