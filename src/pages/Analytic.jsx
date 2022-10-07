import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, isEmptyObject } from "../components/Common/package";
import { ModelSelectModal, HistorySelectModal } from "../components/Common/modal/CommonModal";
import Title from "../components/Common/title/title";
import { ModelInfoBoard } from "../components/ModelDashBoard/Board";
import { Loader } from "../components/Common/loader/Loader";
import style from "../components/Common/component.module.css";
import * as tf from "@tensorflow/tfjs";
import { layerActions } from "../reducers/layerSlice";
import { paramActions } from "../reducers/paramSlice";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as TitleJS,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Button } from "../components/Common/button/Button";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TitleJS,
    Tooltip,
    Legend
  );

const Analytic = () => {
    let { storageParam, nameParam }  = useParams();

    const dispatch = useDispatch();

    const history = useSelector( state => state.history.info );

    const [ isLoading, setLoading ] = useState(false);
    const [ modelModal, setModelModal ] = useState(false);
    const [ modelName, setModelName ] = useState(nameParam);
    const [ historyModal, setHistoryModal ] = useState(false);

    const [ storage, setStorage ] = useState(storageParam);
    const [ data, setData ] = useState({});

    const loadModel = (modelName, storage) => {
        var modelPath = "";

        if ( storage == "localstorage" ) {
            modelPath = storage + "://model/" + modelName;
        }

        tf.loadLayersModel(modelPath)
        .then( async ( model ) => {
            // console.log(model);
            // model.summary();
            setLoading(true)

            dispatch(layerActions.initialize());
            
            // layer update
            model.layers.map( layer => {
                if ( layer.constructor.name === "InputLayer" ) {
                    dispatch(layerActions.addModel({
                        "shape":layer.batchInputShape
                    }))
                } else if ( layer.constructor.name === "Dense") {
                    const newLayer = {
                        "units":layer.units,
                        "inputShape":layer.batchInputShape,
                        "activation":layer.activation.constructor.name.toLowerCase(),
                        "bias":layer.bias? true: false
                    }
                    dispatch(layerActions.addLayer(newLayer));
                } else {
                    alert("can not read layer information.");
                }
            })
        })
        .then( _ => {
            setLoading(false);
        })
        .catch( respond => {
            alert(respond);
        })
    }

    useEffect(() => {
        console.log("load Model");

        if ( isEmpty(modelName) || isEmpty(storage) ) {
            setModelModal(true);
        } else {
            loadModel(modelName, storage);
        }
    }, [ modelName ])

    useEffect(() => {
        if ( !isEmptyObject(history) ) {
            // dispatch(paramActions.setParam({
            //     "batchSize": history.params.batchSize,
            //     "epochs": history.params.epochs
            // }))

            setData({
                labels: history.epoch,
                datasets: [
                    {
                        label: "Loss by Epochs",
                        data: history.history.loss,
                        fill: false,
                        backgroundColor: "rgba(78, 115, 223, 0.05)",
                        borderColor: "rgba(78, 115, 223, 1)",
                        pointRadius: 1,
                        pointBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointBorderColor: "rgba(78, 115, 223, 1)",
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                        pointHitRadius: 1,
                        pointBorderWidth: 1,
                    }
                ]
            });

        }
    }, [ history ])

    return (
        <>
            <ModelSelectModal
                modalShow={modelModal}
                setModalShow={setModelModal}
                setModelName={setModelName}
                setStorage={setStorage}/>
            <HistorySelectModal
                modalShow={historyModal}
                setModalShow={setHistoryModal}/>
            {isLoading &&
                <div style={{
                    "position":"fixed",
                    "top":"0",
                    "left":"0",
                    "width":"100vw",
                    "height":"100vw",
                    "backgroundColor":"gray",
                    "opacity":"0.3",
                    "zIndex":"100"}}
                >
                    <Loader 
                        type="spin" 
                        color="black" 
                        message={"training..."}
                        style={{"position":"fixed"}}/>
                </div>
            }
            <div className={style.container}>
                    <div style={{"display":"flex"}}>
                        <Title title="Model Info"/>
                        <Button 
                            className="right"
                            type="button"
                            style={{"alignText":"center",
                                    "marginLeft":"auto"}}
                            onClick={() => {
                                setModelModal(true);
                            }}
                            >
                            Model Select
                        </Button>

                    </div>
                    <div className={style.subContainer}>
                        <ModelInfoBoard/>
                    </div>
            </div>
            <div className={style.container}>
                <div style={{"display":"flex"}}>
                    <Title title="History"/>
                    <Button 
                        className="right"
                        type="button"
                        style={{"alignText":"center",
                                "marginLeft":"auto"}}
                        onClick={() => {
                            setHistoryModal(true);
                        }}
                        >
                        History Select
                    </Button>
                </div>
                <div className={style.subContainer}>
                    {!isEmptyObject(data) &&
                        <Line data={data}/>
                    }
                </div>
            </div>
        </>
    )
}

export default Analytic;