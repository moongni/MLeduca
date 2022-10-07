import React, { useState, useEffect } from "react";
import { Modal } from "./modal";
import { Button } from "../button/Button";
import * as tf from "@tensorflow/tfjs";
import Inputs from "../inputs/Inputs";
import Tabs from "../tab/Tabs";

export const ModelSelectModal = ({ modalShow, setModalShow, ...props }) => {
    const [ currentTab, setCurrentTab ] = useState('1');
    const [ modelList, setModelList ] = useState([]);
    const [ value, setValue ] = useState("");

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
                            setValue={setValue}
                            modelList={modelList}
                            />
            case "download":
                return <Download />
        }
    }

    useEffect(() => {
        const modelList = async () => {
            const ret = await tf.io.listModels();
            return ret
        }
        modelList().then( result => {
            setModelList(Object.keys(result));
        });
    }, []) 

    const onClickHandler = (event) => {
        event.preventDefault();
        if ( currentTab == '1' ) {
            var valueArray = value.split('/');

            props.setModelName(valueArray[valueArray.length - 1]);
            props.setStorage("localstorage");
            setModalShow(false);
        } else if ( currentTab == '2' ) {
            
        }
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

const Localstorage = ({ value, setValue, modelList, ...props }) => {
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
    const onClickHandler = (event) => {
        event.preventDefault();

    }
    return (
        <Modal
        isShow={modalShow}
        >
            <div style={{"position":"absolute",
                        "bottom":"10px",
                        "left":"50%",
                        "display":"flex",
                        "transform":"translateX(-50%)",
                        "justifyContent":"center"}}
            > 
                <Button
                    className="red"
                    style={{"width":"8rem",
                            "margin":"0.5rem",
                            "height":"2.5rem"}}
                    type="button"
                    onClick={() => {
                        setModalShow(false)}}>
                    close
                </Button>
                <Button
                    className="green"
                    style={{"width":"8rem",
                            "margin":"0.5rem",
                            "height":"2.5rem"}}
                    type="button"
                    onClick={(e) => onClickHandler(e)}>
                    save
                </Button>
            </div>
        </Modal>
    )
}