import React, { useState, useEffect } from "react";
import { Modal } from "./modal";
import { Button } from "../button/Button";
import * as tf from "@tensorflow/tfjs";
import Inputs from "../inputs/Inputs";
import Tabs from "../tab/Tabs";
import { useDispatch } from "react-redux";
import { layerActions } from "../../../reducers/layerSlice";

export const ModelSelectModal = ({ modalShow, setModalShow, modelUrl, setModelUrl, ...props }) => {
    const dispatch = useDispatch();

    const [ currentTab, setCurrentTab ] = useState('1');
    const [ value, setValue ] = useState("");

    const loadModel = (url) => {
        tf.loadLayersModel(url)
        .then( async ( model ) => {
            // setLoading(true)

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

            if ( typeof props.setModel == "function" ) {
                props.setModel(model);
            }
        })
        .then( _ => {

            // setLoading(false);

        })
        .catch( respond => {
            
            alert(respond);

        })
    }

    const onClickHandler = (event) => {
        event.preventDefault();

        loadModel(value);
        setModelUrl(value);
        setModalShow(false);
    }

    const style = {
        btnContainer: {
            "position":"absolute",
            "bottom":"0.75rem",
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

    const tabInfo = [
        {
            "id": 1,
            "title":"localstorage"
        },
        {
            "id": 2,
            "title":"download"
        }
    ]

    const tabContent = ( currentTab ) => {
        const curContent = tabInfo.filter(tab => `${tab.id}` == currentTab);
        switch (curContent[0].title) {
            case "localstorage":
                return <Localstorage 
                            value={value}
                            setValue={setValue}/>
            case "download":
                return <Download />
        }
    }
    
    return (
        <Modal
            isShow={modalShow}
        >
            <Tabs
                style={{"backgroundColor":"#ffffff"}}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                tabData={tabInfo}
            />
            <div>
                {tabContent(currentTab)}
            </div>

            <div style={style.btnContainer}> 
                <Button
                    className="red"
                    style={style.btn}
                    type="button"
                    onClick={() => {
                        setModalShow(false)}}>
                    close
                </Button>
                <Button
                    className="green"
                    style={style.btn}
                    type="button"
                    onClick={(e) => onClickHandler(e)}>
                    save
                </Button>
            </div>
        </Modal>
    )
}

const Localstorage = ({ value, setValue, ...props }) => {
    const [ modelList, setModelList ] = useState([]);

    useEffect(() => {
        const modelList = async () => {
            const ret = await tf.io.listModels();
            return ret
        }

        modelList().then( result => {
            setModelList(Object.keys(result));
        });

    }, [])

    return (
        <div style={{"display":"flex",
                    "paddingBottom":"280px"}}
        >
            <p style={{
                    "display":"flex",
                    "alignItems":"center",
                    "width":"130px",
                    }}>Model Select</p>
            <Inputs 
                kind="selectOne"
                value={value}
                setValue={setValue}
                defaultName="model List"
                list={modelList}
            />
        </div>

    )
}

const Download = ({ ...props }) => {
    return (
        <>

        </>
    )
}

export const HistorySelectModal = ({ modalShow, setModalShow, ...props }) => {
    const style = {
        btnContainer: {
            "position":"absolute",
            "bottom":"0.75rem",
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

    const onClickHandler = (event) => {
        event.preventDefault();

    }

    return (
        <Modal
        isShow={modalShow}
        >
            <div style={style.btnContainer}
            > 
                <Button
                    className="red"
                    style={style.btn}
                    type="button"
                    onClick={() => {
                        setModalShow(false)}}>
                    close
                </Button>
                <Button
                    className="green"
                    style={style.btn}
                    type="button"
                    onClick={(e) => onClickHandler(e)}>
                    save
                </Button>
            </div>
        </Modal>
    )
}