import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../../reducers/testSlice";
import Tabs from "../Common/tab/Tabs";
import Inputs from "../Common/inputs/Inputs";
import { Button } from "../Common/button/Button";
import { getData } from "../LoadData/getData";
import { DrogDropFile } from "../LoadData/DrogDropFile";
import ArrayTable from "../Common/table/ArrayTable";

export const PredictData = ({children, style, className, ...props}) => {
    const [currentTab, setCurrentTab] = useState('1');

    const testData = useSelector(state => state.test.x);
    const testColumn = useSelector(state => state.test.features);

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
                            data={testData}
                            columns={testColumn}/>
            case "2":
                return <FileInput
                            data={testData}
                            columns={testColumn}/>
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
    const [inputShape, setInputShape] = useState([]);
    const [sample, setSample] = useState([]);

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
                hasChild={true}
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

const FileInput = ({children, className, style, ...props}) => {
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();
    
    return (
        <>
            <div style={{"display":"flex",
                    "marginRight":"2.5rem",
                    "marginLeft":"2.5rem"}}>
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
                    onClick={() => {getData(url, dispatch, testActions, '\t')}}
                >
                    Fetch
                </Button>
            </div>
            <DrogDropFile 
            title="Load For File"
            dispatch={dispatch}
            actions={testActions}
            />
            <ArrayTable 
                style={{"maxHeight":"24rem"}}
                data={props.data}
                columns={props.columns}
            />
        </>
    )      
}