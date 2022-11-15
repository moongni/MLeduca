import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { Button } from "../button/Button";
import * as tf from "@tensorflow/tfjs";
import Inputs from "../inputs/Inputs";
import Tabs from "../tab/Tabs";
import { useDispatch } from "react-redux";
import { settingActions } from "../../../reducers/settingSlice";
import { isEmpty, isEmptyObject, isEmptyStr } from "../package";
import { useRef } from "react";
import { historyActions } from "../../../reducers/historySlice";
import { preprocessingActions } from "../../../reducers/preprocessingSlice";

const Modal = ({children, style, ...props}) => {

    return (
        <ReactModal
            isOpen={props.isShow}
            contentLabel={props.label}
            style={{
                ...style,
                overlay: {
                },
                content: {
                    position: "fixed",
                    top:"50%",
                    left:"50%",
                    minWidth:"500px",
                    minHeight:"430px",
                    overflow:"hidden",
                    transform:'translate(-50%, -50%)',
                    color: 'black'
                }
            }}>
            {children}
        </ReactModal>
    )
}

export default Modal


export const ModelSelectModal = ({ modalShow, setModalShow, ...props }) => {
    const dispatch = useDispatch();

    const [ currentTab, setCurrentTab ] = useState('1');
    const [ locValue, setLocValue ] = useState("");
    const [ downValue, setDownValue ] = useState({});

    const loadModel = (url) => {
        tf.loadLayersModel(url)
        .then( async ( model ) => {
            dispatch(settingActions.initLayer());
            
            // layer update
            model.layers.map( layer => {
                if ( layer.constructor.name === "InputLayer" ) {

                    dispatch(settingActions.addModel({
                        "shape":layer.batchInputShape
                    }))

                } else if ( layer.constructor.name === "Dense") {
                    const newLayer = {
                        "units":layer.units,
                        "inputShape":layer.batchInputShape,
                        "activation":layer.activation.constructor.name.toLowerCase(),
                        "bias":layer.bias? true: false
                    }

                    dispatch(settingActions.addLayer(newLayer));

                } else {
                    
                    alert("신경망 정보를 읽어올 수 없습니다.");
                    dispatch(settingActions.initLayer());

                }
            })

            if ( typeof props.setModel == "function" ) {
                props.setModel(model);
                console.log(model);
            }
        })
        .finally( _ => {
        })
    }

    const onClickHandler = (event) => {
        event.preventDefault();

        try {
            if (currentTab == '1') {
                if (isEmptyStr(locValue)) {
                    throw new Error("불러올 모델을 선택해주세요");
                }
                
                loadModel(locValue);
            } else {
                if (isEmptyObject(downValue)) {
                    throw new Error("불러올 모델을 입력해주세요");
                }
                if (isEmptyObject(downValue.model)) {
                    throw new Error("모델 파일을 불러와주세요");
                }
                if (isEmptyObject(downValue.weight)) {
                    throw new Error("가중치 파일을 불러와주세요");
                }

                loadModel(tf.io.browserFiles([downValue.model, downValue.weight]));
            }
            
            setModalShow(false);
                
        } catch ( err ) {
            console.log(err);
            alert(err.message);
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
                            value={locValue}
                            setValue={setLocValue}/>
            case "download":
                return <Download 
                            value={downValue}
                            setValue={setDownValue}/>
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
                    닫기
                </Button>
                <Button
                    className="green"
                    style={style.btn}
                    type="button"
                    onClick={(e) => onClickHandler(e)}>
                    저장
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
            <Inputs 
                kind="selectOne"
                mainTitle="모델 선택"
                style={{"marginLeft":"1.5rem"}}
                value={value}
                setValue={setValue}
                defaultName="model List"
                list={modelList}
            />
        </div>
    )
}

const Download = ({ value, setValue, ...props }) => {
    const [ modelFile, setModelFile ] = useState({});
    const [ weightFile, setWeightFile ] = useState({});
    const [ modelName, setModelName ] = useState("");
    const [ weightName, setWeightName ] = useState("");

    const modelInput = useRef(null);
    const weigthInput = useRef(null);

    const modelChangeHandler = (event) => {
        setModelFile(event.target.files[0]);

        setModelName(event.target.files[0].name);
        
    }

    const weigthChangeHandler = (event) => {
        setWeightFile(event.target.files[0]);

        setWeightName(event.target.files[0].name);
    }

    useEffect(() => {
        setValue({
            "model": modelFile,
            "weight": weightFile
        })

    }, [ modelFile, weightFile ])
    
    const style ={
        labelStyle: {
            display: "inline-block",
            padding: ".5em .75em",
            color: "#999",
            fontSize: "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
            backgroundColor: "#fdfdfd",
            cursor: "pointer",
            border: "1px solid #ebebeb",
            borderBottomColor: "#e2e2e2",
            borderRadius: ".25em",
        },
        nameStyle: {
            display: "inline-block",
            padding: ".5em .75em",
            marginRight: "3px",
            fontSize: "inherit",
            fontFamily: "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ebebeb",
            borderBottomColor: "#e2e2e2",
            borderRadius: ".25em",
            WebkitAppearance: "none", /* 네이티브 외형 감추기 */
            MozAppearance: "none",
            appearance: "none",
        }
    }

    return (
        <div style={{"display":"flex",
                    "flexDirection":"column",
                    "paddingBottom":"280px"}}>
            <div style={{"display":"flex",
                        "width":"100%",
                        "justifyContent":"space-between",
                        "padding": "1.5rem 1rem"}}>
                <span style={{"display":"flex", "alignItems":"center"}}>모델 불러오기</span>
                <div>
                    <input className="upload-name" value={isEmptyStr(modelName)? "파일 선택": modelName} disabled="disabled"
                        style={style.nameStyle}/>
                    <label  style={style.labelStyle}
                            onClick={() => {
                                modelInput.current.click();
                            }}
                    >
                        업로드
                    </label>
                    <input
                        id="json_upload" 
                        type="file"
                        ref={modelInput}
                        multiple={false}
                        onChange={modelChangeHandler}
                        style={{"display":"none"}}>
                    </input>
                </div>
            </div>
            <div style={{"display":"flex",
                        "width":"100%",
                        "justifyContent":"space-between",
                        "padding": "1.5rem 1rem"}}>
                <span style={{"display":"flex", "alignItems":"center"}}>가중치 불러오기</span>
                <div>
                    <input className="upload-name" value={isEmptyStr(weightName)? "파일 선택": weightName} disabled="disabled"
                        style={style.nameStyle}/>
                    <label  style={style.labelStyle}
                            onClick={() => {
                                weigthInput.current.click();
                            }}
                    >
                        업로드
                    </label>
                    <input
                        id="weight_upload" 
                        type="file"
                        ref={weigthInput}
                        multiple={false}
                        onChange={weigthChangeHandler}
                        style={{"display":"none"}}>
                    </input>
                </div>
            </div>
        </div>
    )
}

export const HistorySelectModal = ({ modalShow, setModalShow, ...props }) => {
    const dispatch = useDispatch();

    const histInput = useRef(null);

    const [ histName, setHistName ] = useState("");
    const [ histFile, setHistFile ] = useState({});

    const histChangeHandler = (event) => {
        const onReaderLoad = (event) => {
            var obj = JSON.parse(event.target.result);
            setHistFile(obj);
        }

        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);

        setHistName(event.target.files[0].name);
    }

    const onClickHandler = (event) => {
        try {
            if (isEmptyObject(histFile)) {
                throw new Error("History 파일을 불러와주세요");
            }
            //check history file
            if (isEmpty(histFile.history)) {
                throw new Error("잘못된 History 파일 입니다.");
            }
            dispatch(historyActions.setHist(histFile));
    
            setModalShow(false);
        } catch (err) {
            alert(err.message);
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
        },
        labelStyle: {
            display: "inline-block",
            padding: ".5em .75em",
            color: "#999",
            fontSize: "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
            backgroundColor: "#fdfdfd",
            cursor: "pointer",
            border: "1px solid #ebebeb",
            borderBottomColor: "#e2e2e2",
            borderRadius: ".25em",
        },
        nameStyle: {
            display: "inline-block",
            padding: ".5em .75em",
            marginRight: "3px",
            fontSize: "inherit",
            fontFamily: "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ebebeb",
            borderBottomColor: "#e2e2e2",
            borderRadius: ".25em",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
        }
    }
    return (
        <Modal
        isShow={modalShow}
        >
            <div style={{"display":"flex",
                    "width":"100%",
                    "justifyContent":"space-between",
                    "padding": "1.5rem 1rem"}}>
                <span style={{"display":"flex", "alignItems":"center"}}>History 불러오기</span>
                <div>
                    <input className="upload-name" value={isEmptyStr(histName)? "파일 선택": histName} disabled="disabled"
                        style={style.nameStyle}/>
                    <label  style={style.labelStyle}
                            onClick={() => {
                                histInput.current.click();
                            }}
                    >
                        업로드
                    </label>
                    <input
                        id="hist_upload" 
                        type="file"
                        ref={histInput}
                        multiple={false}
                        onChange={histChangeHandler}
                        style={{"display":"none"}}>
                    </input>
                </div>
            </div>
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

export const SettingSelectModal = ({ modalShow, setModalShow, ...props }) => {
    const dispatch = useDispatch();

    const settingInput = useRef(null);
    
    const [ settingName, setsettingName ] = useState("");
    const [ settingFile, setsettingFile ] = useState({});

    const settingChangeHandler = (event) => {
        const onReaderLoad = (event) => {
            var obj = JSON.parse(event.target.result);
            setsettingFile(obj);
        }
        
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);

        setsettingName(event.target.files[0].name);
    }

    const onClickHandler = (event) => {
        try {
            if (isEmptyObject(settingFile)) {
                throw new Error("setting 파일을 불러와주세요.");
            }
            if (isEmpty(settingFile.compile) || isEmpty(settingFile.parameter) || isEmpty(settingFile.preprocess)) {
                throw new Error("잘못된 setting 파일 입니다.");
            }

            dispatch(settingActions.setParam(settingFile.parameter.info));
            dispatch(settingActions.setOptimizer(settingFile.compile.optimizer));
            dispatch(settingActions.setLoss(settingFile.compile.loss));
            dispatch(preprocessingActions.loadProcess(settingFile.preprocess));

            setModalShow(false);
            
        } catch (err) {
            alert(err.message)
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
        },
        labelStyle: {
            display: "inline-block",
            padding: ".5em .75em",
            color: "#999",
            fontSize: "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
            backgroundColor: "#fdfdfd",
            cursor: "pointer",
            border: "1px solid #ebebeb",
            borderBottomColor: "#e2e2e2",
            borderRadius: ".25em",
        },
        nameStyle: {
            display: "inline-block",
            padding: ".5em .75em",
            marginRight: "3px",
            fontSize: "inherit",
            fontFamily: "inherit",
            lineHeight: "normal",
            verticalAlign: "middle",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ebebeb",
            borderBottomColor: "#e2e2e2",
            borderRadius: ".25em",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
        }
    }

    return (
        <Modal
        isShow={modalShow}
        >
            <div style={{"display":"flex",
                    "width":"100%",
                    "justifyContent":"space-between",
                    "padding": "1.5rem 1rem"}}>
                <span style={{"display":"flex", "alignItems":"center"}}>Setting 불러오기</span>
                <div>
                    <input className="upload-name" value={isEmptyStr(settingName)? "파일 선택": settingName} disabled="disabled"
                        style={style.nameStyle}/>
                    <label  style={style.labelStyle}
                            onClick={() => {
                                settingInput.current.click();
                            }}
                    >
                        업로드
                    </label>
                    <input
                        id="hist_upload" 
                        type="file"
                        ref={settingInput}
                        multiple={false}
                        onChange={settingChangeHandler}
                        style={{"display":"none"}}>
                    </input>
                </div>
            </div>
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