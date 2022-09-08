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
import style from "../components/Common/component.module.css";
import Title from "../components/Common/title/title";
import { AiOutlineLineChart } from "react-icons/ai";
import { Modal } from "../components/Common/modal/modal";
import { Button } from "../components/Common/button/Button";
import { PredictData } from "../components/Predict/PredictData";
const Predict = () => {
    const dispatch = useDispatch();

    const [modalShow, setModalShow] = useState(false);

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
        const model = await tf.loadLayersModel("localstorage://model/my-model-1");
        return model
    }

    useEffect(
        () => {
            const modelList = getModelList();
            if (isEmpty(modelList) || isEmptyObject(modelList)){
                alert("please, train model first");
                window.location = "/home"
            }
        }
    , [])

    const onClickHandler = async (e) => {
        const loadedModel = await loadModel();
        const predicted = loadedModel.predict(tf.tensor([18]));

        console.log("predict", predicted);
    }

    return (
        <div 
            className={style.container}>
            <Title title="Predict Data" icon={<AiOutlineLineChart/>}/>
            <div className={style.subContainer}>
                <PredictData/>
            </div>
            <Title title="Model For Predict" icon={<AiOutlineLineChart/>}/>
            <div className={style.subContainer}>
                <Title title="Model Select"/>
                <Modal
                isShow={modalShow}
                label="Model Select"
                >
                    <p>Model Select</p>
                    <button onClick={() => setModalShow(false)}>close</button>
                </Modal>
            </div>
            <div className="w-full text-center mt-4">
                <Button
                    className="center green"
                    type="button"
                    onClick={() => onClickHandler()}
                >
                    predict
                </Button>
            </div>
        </div>
    )
}

export default Predict;