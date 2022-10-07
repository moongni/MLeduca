import React, { useState } from "react";
import { useSelector } from "react-redux";
import { trainActions } from "../reducers/trainSlice";
import { isEmptyArray } from "../components/Common/package"
import SetColumn  from "../components/Preprocessing/SetColumn";
import ArrayTable from "../components/Common/table/ArrayTable";
import { PreprocessingOptions } from "../components/Preprocessing/PreprocessingOption";
import style from '../components/Common/component.module.css';
import { MdOutlineToc } from "react-icons/md"
import Title from "../components/Common/title/title";
import { Loader } from "../components/Common/loader/Loader";
import { useEffect } from "react";

const Preprocessing = () => {
    // redux persist load 
    const labels = useSelector((state) => state.train.labels);
    const labelData = useSelector(state => state.train.y);
    const features = useSelector((state) => state.train.features);
    const featureData = useSelector((state) => state.train.x);

    // 멀티 셀렉트 선택된 value state
    const [ isLabelLoading, setLabelLoading ] = useState(false);
    const [ isFeatureLoading, setFeatureLoading ] = useState(false);
    
    return (
        <>
            <div className={style.container}>
                <Title
                    title="Label"
                    icon={<MdOutlineToc/>}
                />
                <div className={style.subContainer}>
                    <SetColumn 
                        title={"Select Labels"}
                        setData={trainActions.setLabelData}
                        setColumn={trainActions.setLabels}
                        setLoading={setLabelLoading}
                    />
                </div>
                {!isEmptyArray(labels) &&
                    <>
                        <Title title="Label Data Table"/>
                        <div 
                            className={style.subContainer}
                            style={{position:"relative",
                                    minHeight:"24rem"}}
                        >
                            { isLabelLoading && <Loader type="spin" color="black" message="Loading Data"/>}
                            <ArrayTable
                                style={{"height":"24rem"}}
                                data={labelData}
                                columns={labels}
                            />
                        </div>
                        <Title title={`Preprocessing`}/>
                        <div className={style.subContainer}>
                            <PreprocessingOptions
                                title="label"
                                columns={labels}
                                setLoading={setLabelLoading}
                            />
                        </div>
                    </>
                }
            </div>
            <div className={style.container}>
                <Title
                    title="Feature"
                    icon={<MdOutlineToc/>}
                />
                <div className={style.subContainer}>
                    <SetColumn
                        title={"Select Features"}
                        setData={trainActions.setFeatureData}
                        setColumn={trainActions.setFeatures}
                        setLoading={setFeatureLoading}
                    />
                </div >
                {!isEmptyArray(features) &&
                    <>
                        <Title title="Feature Data Table"/>
                        <div
                            className={style.subContainer} 
                            style={{position:"relative",
                                    minHeight:"24rem"}}
                        >
                            { isFeatureLoading && <Loader type="spin" color="black" message="Loading Data"/>}
                            <ArrayTable
                                style={{"height":"24rem"}}
                                data={featureData}
                                columns={features}
                            />
                        </div>
                        <Title title="Preprocessing"/>
                        <div className={style.subContainer}>
                            <PreprocessingOptions
                                title="feature"
                                columns={features}
                                setLoading={setFeatureLoading}
                            />
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Preprocessing;