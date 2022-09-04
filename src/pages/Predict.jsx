import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DrogDropFile } from "../components/LoadData/DrogDropFile";
import { getData } from "../components/LoadData/getData";
import Inputs from "../components/Common/inputs/Inputs";
import ArrayTable from "../components/Common/table/ArrayTable"
import { useEffect } from "react";
import { isEmpty, isEmptyObject } from "../components/Common/package";
import { testActions } from "../reducers/testSlice";
import * as tf from "@tensorflow/tfjs";

const Predict = () => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState("");
    const testData = useSelector(state => state.test.x);
    const testColumn = useSelector(state => state.test.features);
    const trainFeatures = useSelector(state => state.train.features);
    const preprocessing = useSelector(state => state.preprocess.info);
    const modelInfo = useSelector(state => state.model.info);
    const trainLabels = useSelector(state => state.train.labels);
    
    const getModelList = async () => {
        const modelList = JSON.stringify(await tf.io.listModels())
        console.log("modelList ", modelList);
        return modelList
    }
    const loadModel = async () => {
        const model = await tf.loadLayersModel("localstorage://model/recently-model");
        return model
    }

    useEffect(
        () => {
            const modelList = getModelList();
            console.log(modelList);
            if (isEmpty(modelList) || isEmptyObject(modelList)){
                alert("please, train model first");
                window.location = "/home"
            }
        }
    , [])

    const onClickHandler = async (e) => {
        e.preventDefault();

        const loadedModel = await loadModel();

        console.log(loadedModel.predict(tf.tensor([18])));
    }
    return (
        <div 
            className="w-full min-h-full rounded-2xl p-5 bg-slate-50 shadow-lg shadow-slate-400"
        >
            <span className="text-lg">Predict</span>
            <div>
                <span className="text-lg">Model Select</span>
                
            </div>
            <div>
                <span className="text-lg">Model Load</span>
                
            </div>
            <div>
                <div className="flex mb-4">
                    <Inputs 
                        kind="text"
                        title="Load For Url"
                        placeholder="Url 입력"
                        value={url}
                        setValue={setUrl}
                    />
                    <button 
                        className="mr-4" 
                        type="button" 
                        onClick={() => {getData(url, dispatch, testActions, '\t')}}
                    >
                        Fetch
                    </button>
                </div>
                <DrogDropFile 
                    dispatch={dispatch}
                    actions={testActions}
                />
                <ArrayTable 
                    data={testData}
                    columns={testColumn}
                />
            </div>
            <div
                className="w-full text-center mt-4">
                <button
                    className="mr-4 w-16 h-10 justify-center rounded-md bg-slate-300 hover:bg-green-300"
                    type="button"
                    onClick={() => onClickHandler()}
                >
                    predict
                </button>
            </div>
        </div>
    )
}

export default Predict;