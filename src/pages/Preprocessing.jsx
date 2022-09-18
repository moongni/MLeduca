import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trainActions } from "../reducers/trainSlice";
import { isEmptyArray, toArray } from "../components/Common/package"
import SetColumn  from "../components/Preprocessing/SetColumn";
import ArrayTable from "../components/Common/table/ArrayTable";
import { PreprocessingOptions } from "../components/Preprocessing/PreprocessingOption";
import style from '../components/Common/component.module.css';
import { MdOutlineToc } from "react-icons/md"
import Title from "../components/Common/title/title";
import { Loader } from "../components/Common/Loader/Loader";

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
    const [ selectedFeatures, setSelectedFeatures ] = useState([]);
    const [ selectedLabels, setSelectedLabels ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);

    const selectColumn = (data, columns) => {
        const newData = new Object();
        columns.map(column => {
            newData[column] = data[column]; 
        })

        return newData;
    }

    const handleLabelClick = useCallback(() => {
        try {
            setLoading(true);
            const labelNames = toArray(selectedLabels);
            const newData = selectColumn(data, labelNames);
            dispatch(trainActions.setLabelData(newData));
            dispatch(trainActions.setLabels(labelNames));
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    })

    const handleFeatureClick = useCallback(() => {
        try {
            setLoading(true);
            const featureNames = toArray(selectedFeatures);
            const newData = selectColumn(data, featureNames);
            dispatch(trainActions.setFeatureData(newData));
            dispatch(trainActions.setFeatures(toArray(selectedFeatures)));
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    })

    const LoadingComponenet = ({children}) => {
        if (isLoading) 
            return <Loader type="spin" color="black" message="Loading Data"/>
        else 
            return (
                <>
                    {children}
                </>
            )
    }

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
                    <div style={{position:"relative",
                                minHeight:"24rem"}}>
                        <Title title="Label Data Table"/>
                        <LoadingComponenet>
                            <ArrayTable
                                style={{"height":"24rem"}}
                                data={labelData}
                                columns={labels}
                            />
                            <PreprocessingOptions
                                title="Label"
                                columns={labels}
                            />
                        </LoadingComponenet>
                    </div>
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
                    <div style={{position:"relative",
                                minHeight:"24rem"}}>
                        <Title title="Feature Data Table"/>
                        <LoadingComponenet>
                            <ArrayTable
                                style={{"height":"24rem"}}
                                data={featureData}
                                columns={features}
                            />
                            <PreprocessingOptions
                                title="Feature"
                                columns={features}
                            />
                        </LoadingComponenet>
                    </div>
                }
            </div >
        </div>
    )
}

export default Preprocessing;