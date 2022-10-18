import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../../reducers/testSlice";
import Tabs from "../Common/tab/Tabs";
import Inputs from "../Common/inputs/Inputs";
import { Button } from "../Common/button/Button";
import { getData } from "../LoadData/getData";
import { DrogDropFile } from "../LoadData/DrogDropFile";
import ArrayTable from "../Common/table/ArrayTable";
import Title from "../Common/title/title";
import SetColumn from "../Preprocessing/SetColumn";
import { isEmptyArray, selectColumn } from "../Common/package";
import { PreprocessingOptions } from "../Preprocessing/PreprocessingOption";
import { preprocessingActions } from "../../reducers/preprocessingSlice";
import mainStyle from "../Common/component.module.css";
import { preprocess } from "../TF/Preprocess";

export const PredictData = ({children, style, className, ...props}) => {
    const [currentTab, setCurrentTab] = useState('1');

    const testSet = useSelector( state => state.test );

    const tabData = [
        {
            "id":"1",
            "title":"Custom Input"
        },
        {
            "id":"2",
            "title":"File Input"
        }
    ]

    const tapContent = (currentTab) => {
        const curContent = tabData.filter(tab => `${tab.id}` == currentTab);
        switch (curContent[0].id) {
            case "1":
                return <CustomInput
                            data={testSet.info}
                            columns={testSet.columns}/>
            case "2":
                return <FileInput
                            data={testSet.info}
                            columns={testSet.columns}/>
        }
    }
    return (
        <>
            <Tabs
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                tabData={tabData}
            />
            {tapContent(currentTab)}
        </>
    )
}

const CustomInput = ({children, className, style, ...props}) => {
    const dispatch = useDispatch();

    const [inputShape, setInputShape] = useState({});
    const [sample, setSample] = useState({});

    console.log("inputShape", inputShape);
    console.log("sample", sample);

    return (
        <>
            <div style={{"display":"flex",
                        "marginRight":"2.5rem",
                        "marginLeft":"2.5rem"}}>
                <Inputs
                    kind="input"
                    title="Input Shape"
                    placeholder="only Integer"
                    value={inputShape}
                    setValue={setInputShape}/>
            </div>
            <ArrayTable 
                style={{"maxHeight":"24rem"}}
                data={props.data}
                columns={props.columns}
            >
                <Inputs 
                    style={{"width":"100%"}}
                    kind="float"
                    value={sample}
                    setValue={setSample}/>

            </ArrayTable>
        </>
    )
}

const FileInput = ({children, className, ...props}) => {
    const dispatch = useDispatch();

    const features = useSelector( state => state.test.feature );
    const featureData = useSelector( state => state.test.x );
    const process = useSelector( state => state.preprocess );

    const [ url, setUrl ] = useState('');
    const [ isLoading, setLoading ] = useState(false);

    const onClickHandler = async () => {
        try {
            setLoading(true);

            dispatch(preprocessingActions.updateProcess({
                title: 'feature',
                columns: features
            }))

            const cashData = selectColumn(props.data, features);
            const dummyData = cashData;

            const { labelData, featureData } = await preprocess(dummyData, cashData, process);

            dispatch(testActions.setFeatureData(featureData));
            

        } catch (e) {
            alert(e);
            console.log(e);
        }
    }

    const style = {
        btnContainer: {
            "position":"relative",
            "left":"50%",
            "display":"flex",
            "transform":"translateX(-50%)",
            "justifyContent":"center"
        },
        btn: {
            "width":"8rem",
            "margin":"0.5rem",
            "height":"2.5rem"
        }
    }

    return (
        <>
            <div style={{"display":"flex",
                    "margin":"0 2.5rem"}}>
                <Inputs 
                    kind="text"
                    title="Load For Url"
                    placeholder="Url 입력"
                    value={url}
                    setValue={setUrl}
                />
                <Button 
                    className="right"
                    type="button"
                    onClick={() => {getData(url, dispatch, testActions, ',', setLoading)}}
                >
                    Fetch
                </Button>
            </div>
            <DrogDropFile 
            title="Load For File"
            dispatch={dispatch}
            actions={testActions}
            />
            <Title title="Data Table"/>
            <div style={{"margin":"0 2.5rem",
                        "alignItems":"center"}}>
                <SetColumn
                    title={"Select Column"}
                    setData={testActions.setFeatureData}
                    setColumn={testActions.setFeatures}
                    setLoading={setLoading}
                    data={props.data}
                    dataColumns={props.columns}
                    />
                {!isEmptyArray(features) &&
                    <>
                        <ArrayTable 
                            style={{"maxHeight":"24rem"}}
                            data={featureData}
                            columns={features}
                        />
                        <PreprocessingOptions
                            title="feature"
                            columns={features}
                            process={process}
                        />
                        <div style={style.btnContainer}>
                            <Button 
                                className="red"
                                style={style.btn}
                                type="button"
                                onClick={() => {
                                    dispatch(testActions.initialize());
                                    dispatch(preprocessingActions.initialize());
                                }}
                            >
                                reset
                            </Button>
                            <Button 
                                className="green"
                                style={style.btn}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClickHandler().then( _ => setLoading(false))}}
                                >
                                apply
                            </Button>
                        </div>

                    </>
                }
            </div>
        </>
    )      
}