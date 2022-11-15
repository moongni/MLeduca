import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../../reducers/testSlice";
import Tabs from "../Common/tab/Tabs";
import Inputs from "../Common/inputs/Inputs";
import { Button } from "../Common/button/Button";
import { getData } from "../Common/package";
import { DrogDropFile } from "../LoadData/DrogDropFile";
import mainStyle from "../Common/component.module.css";
import * as dfd from "danfojs";

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
                            data={testSet.x}
                            columns={testSet.feature}/>
            case "2":
                return <FileInput
                            data={testSet.x}
                            columns={testSet.feature}/>
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
        </>
    )
}

const FileInput = ({children, className, ...props}) => {
    const dispatch = useDispatch();

    const [ url, setUrl ] = useState('');
    const [ isLoading, setLoading ] = useState(false);

    const readFile = (file, type) => {
        try {
            setLoading(true);

            var reader = new FileReader();

            reader.onload = async function(e) {
                var contents = e.target.result;
                let newData = {};

                switch(type){
                   case "application/json":
                        const jsonDf = await dfd.readJSON(file);

                        newData = dfd.toJSON(jsonDf, { format: 'row' })

                        break;

                    case "text/csv":
                        const csvDf = await dfd.readCSV(file);

                        newData = dfd.toJSON(csvDf, { format: 'row' });

                  }

                dispatch(testActions.setColumns(Object.keys(newData)));

                dispatch(testActions.setData(newData));

              };
            
            reader.readAsText(file);

        } catch (e) {
            
            alert(e);

        }

        setLoading(false);
        
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
            readFile={readFile}
            />
        </>
    )      
}