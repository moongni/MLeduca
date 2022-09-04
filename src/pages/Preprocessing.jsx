import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trainActions } from "../reducers/trainSlice";
import { isEmptyArray, toArray } from "../components/Common/package"
import SetColumn  from "../components/Preprocessing/SetColum";
import ArrayTable from "../components/Common/table/ArrayTable";
import PreprocessingOptions from "../components/Preprocessing/PreprocessingOption";
import style from '../components/Common/component.module.css';
import { MdOutlineToc } from "react-icons/md"
import Title from "../components/Common/title/title";

const Preprocessing = () => {
    const dispatch = useDispatch();

    // redux persist load 
    const data = useSelector(state => state.data.info);
    const dataColumns = useSelector((state) => state.data.columns);
    const labels = useSelector((state) => state.train.labels);
    const labelData = useSelector(state => state.train.y);
    const features = useSelector((state) => state.train.features);
    const featureData = useSelector((state) => state.train.x);

    // 멀티 셀렉트 선택된 value state
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);

    const selectColumn = (data, columns) => {
        const newData = new Object();
        columns.map(column => {
            newData[column] = data[column]; 
        })
        return newData;
    }

    const handleLabelClick = useCallback(() => {
        const labelNames = toArray(selectedLabels);
        const newData = selectColumn(data, labelNames);
        dispatch(trainActions.setLabelData(newData));
        dispatch(trainActions.setLabels(labelNames));
    })

    const handleFeatureClick = useCallback(() => {
        const featureNames = toArray(selectedFeatures);
        const newData = selectColumn(data, featureNames);
        dispatch(trainActions.setFeatureData(newData));
        dispatch(trainActions.setFeatures(toArray(selectedFeatures)));
    })

    return (
        <div className={style.container}>
            <Title
                title="Preprocessing"
                icon={<MdOutlineToc/>}
            />
            <div className={style.subContainer}>
                <SetColumn 
                    title={"Labels"}
                    selected={selectedLabels}
                    setSelected={setSelectedLabels}
                    columns={dataColumns}
                    handleClick={handleLabelClick}
                />
                {!isEmptyArray(labels) &&
                    <>
                        <Title 
                            title="Label Data Table" 
                            icon={<MdOutlineToc/>}
                        />
                        <ArrayTable
                            style={{"height":"24rem"}}
                            data={labelData}
                            columns={labels}
                        />
                        <PreprocessingOptions
                            title="Label"
                            icon={<MdOutlineToc/>}
                            columns={labels}
                        />
                    </>
                }
            </div>
            <div className={style.subContainer}>
                <SetColumn
                    title={"Features"}
                    selected={selectedFeatures}
                    setSelected={setSelectedFeatures}
                    columns={dataColumns}
                    handleClick={handleFeatureClick}                
                />
                {!isEmptyArray(features) &&
                    <>
                        <Title 
                            title="Feature Data Table" 
                            icon={<MdOutlineToc/>}
                        />
                        <ArrayTable
                            style={{"height":"24rem"}}
                            data={featureData}
                            columns={features}
                        />
                        <PreprocessingOptions
                            title="Feature"
                            icon={<MdOutlineToc/>}
                            columns={features}
                        />
                    </>
                }
            </div >
        </div>
    )
}

export default Preprocessing;