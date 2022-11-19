import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trainActions } from "../reducers/trainSlice";
import { getNData, getShape, isEmptyArray, selectColumn } from "../components/Common/package"
import SetColumn  from "../components/Preprocessing/SetColumn";
import ArrayTable from "../components/Common/table/ArrayTable";
import mainStyle from '../components/Common/component.module.css';
import { MdOutlineToc } from "react-icons/md"
import Title from "../components/Common/title/title";
import { Loader } from "../components/Common/loader/Loader";
import { Button } from "../components/Common/button/Button";
import { preprocessingActions } from "../reducers/preprocessingSlice";
import { preprocess } from "../components/TF/Preprocess";
import Inputs from "../components/Common/inputs/Inputs";
import { useEffect } from "react";
import { PreprocessingOptions } from "../components/Preprocessing/PreprocessingOption";
import { testActions } from "../reducers/testSlice";
import { contentView } from "../components/Common/package";

const Preprocessing = () => {
    const dispatch = useDispatch();

    // redux persist load 
    const data = useSelector( state => state.data.data );
    const dataColumns = useSelector( state => state.data.columns );

    const trainX = useSelector( state => state.train.feature );
    const trainY = useSelector( state => state.train.label );
    const process = useSelector( state => state.preprocess.train );
    console.log("preprocess", process);
    const testX = useSelector( state => state.test.feature );
    const testY = useSelector( state => state.test.label );

    const [ isLoading, setLoading ] = useState(false);
    const [ splitRatio, setSplitRatio ] = useState({});
    const [ nData, setNData ] = useState({"trainNData": 5, "testNData": 5});
    
    const initData = {
        'columns': [],
        'data': {},
        'shape': []
    }
    const [ viewTrainX, setViewTrainX ] = useState(initData);
    const [ viewTrainY, setViewTrainY ] = useState(initData);
    const [ viewTestX, setViewTestX ] = useState(initData);
    const [ viewTestY, setViewTestY ] = useState(initData);
    
    // validation split ratio
    useEffect(() => {
        if (splitRatio["train set ratio"] < 0.0 || splitRatio["train set ratio"] > 1.0) {
            alert("Please, check ratio of split set (0.0 ~ 1.0 available)");
            setSplitRatio({ "train set ratio" : 1.0 })
        }
    }, [splitRatio])

    useEffect(() => {
        if (!isEmptyArray(trainX.columns)) {
            const newX = getNData(trainX.data, nData.trainNData);
            
            setViewTrainX({
                'columns': trainX.columns,
                'data': newX,
                'shape': getShape(newX)
            });
        }
        if (!isEmptyArray(trainY.columns)) {
            const newY = getNData(trainY.data, nData.trainNData);

            setViewTrainY({
                'columns': trainY.columns,
                'data': newY,
                'shape': getShape(newY)
            });
        }
    },[ trainX, trainY ])

    useEffect(() => {
        if (!isEmptyArray(testX.columns)) {
            const newX = getNData(testX.data, nData.trainNData);
            
            setViewTestX({
                'columns': testX.columns,
                'data': newX,
                'shape': getShape(newX)
            });
        }
        if (!isEmptyArray(testY.columns)) {
            const newY = getNData(testY.data, nData.trainNData);

            setViewTestY({
                'columns': testY.columns,
                'data': newY,
                'shape': getShape(newY)
            });
        }
    }, [ testX, testY ])

    const onClickHandler = async () => {
        const splitTrainTest = async (labelData, featureData, trainRatio) => {
            /* 
                labelData: {'col name': [data]}
                featureData: {'col name': [data]}
                trainRatio: float

                return {
                    trainX: featureData: {'col name': [data]},
                    trainY: labelData: {'col name': [data]},
                    testX: testX: {'col name': [data]},
                    testY: testY: {'col name': [data]}
                }
            */

            const numSample = Object.values(labelData)[0].length;

            if ( numSample != Object.values(featureData)[0].length ) {
                throw new Error("data and split have different numbers of examples");
            }

            const features = Object.keys(featureData);
            const labels = Object.keys(labelData);

            const numTrainSample = Math.round(numSample * trainRatio);
            
            const testX = {}
            const testY = {}
            
            for ( const col of features ) {
                testX[col] = []
            }

            for ( const col of labels ) {
                testY[col] = []
            }

            for ( var i = numSample; i > numTrainSample; i-- ) {
                var idx = Math.floor(Math.random() * i)

                for ( const col of features ) {
                    testX[col].push(featureData[col].splice(idx, 1)[0]);
                }
                for ( const col of labels ) {
                    testY[col].push(labelData[col].splice(idx, 1)[0]);
                }
            }

            return {
                trainX: featureData,
                trainY: labelData,
                testX: testX,
                testY: testY
            }
        }

        try {
          setLoading(true);
          
          dispatch(preprocessingActions.updateProcess({
            title: 'label',
            columns: trainY.columns,
            kind: "train"
          }));

          dispatch(preprocessingActions.updateProcess({
            title: 'feature',
            columns: trainX.columns,
            kind: "train"
          }))

          const { labelData, featureData } = await preprocess(selectColumn(data, trainY.columns), selectColumn(data, trainX.columns), process);
          
          if ( splitRatio["train set ratio"] == 1.0 || splitRatio['train set ratio'] == null ) {
            dispatch(trainActions.setData({
                title: "feature",
                data: featureData
              }))
        
            dispatch(trainActions.setData({
                title: "label",
                data: labelData
            }))

          } else {
            const { trainX, trainY, testX, testY } = await splitTrainTest(labelData, featureData, splitRatio["train set ratio"]);
            
            dispatch(trainActions.setData({
                title: "feature",
                data: trainX
              }))
        
            dispatch(trainActions.setData({
                title: "label",
                data: trainY
            }))

            dispatch(testActions.setFeatureData(testX));

            dispatch(testActions.setLabelData(testY));

            dispatch(testActions.setData({
                ...testX,
                ...testY
            }))
            
          }

    
        } catch (err) {

            alert(err);

            setLoading(false);

            console.log(err);
        }

      }

    const style = {
        CenterContainer: {
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
            { isLoading && <Loader type="spin" color="black" message="Loading"/>}
            <div className={mainStyle.container}>
                <Title
                    title="전처리 설정"
                    icon={<MdOutlineToc/>}
                    style={style.CenterContainer}
                />
                <div className={mainStyle.subContainer}>
                    <Title title={"라벨 설정"} />
                    <div style={{"padding": "0 1rem"}}>
                        <SetColumn 
                            title={"열 선택"}
                            setData={trainActions.setLabelData}
                            setLoading={setLoading}
                            data={data}
                            dataColumns={dataColumns}
                            initFunction={() => {
                                dispatch(preprocessingActions.initOne({
                                    "title": "train",
                                    "initName": "label"
                                }))
                            }}
                        />
                        {!isEmptyArray(trainY.columns) &&
                            <PreprocessingOptions
                                title="label"
                                kind="train"
                                columns={trainY.columns}
                                preprocess={process.label}
                            />
                        }
                    </div>
                    <Title title="특성 설정" style={{"marginTop":"2rem"}}/>
                    <div style={{"padding": "0 1rem"}}>
                        <SetColumn
                            title={"열 선택"}
                            setData={trainActions.setFeatureData}
                            setLoading={setLoading}
                            data={data}
                            dataColumns={dataColumns}
                            initFunction={() => {
                                dispatch(preprocessingActions.initOne({
                                    "title": "train",
                                    "initName": "feature"
                                }))
                            }}
                        />
                        {!isEmptyArray(trainX.columns) &&
                            <PreprocessingOptions
                                title="feature"
                                kind="train"
                                columns={trainX.columns}
                                preprocess={process.feature}
                            />
                        }
                    </div>
                    <Title title="훈련셋, 테스트셋 나누기" style={{"marginTop":"2rem"}}/>
                    <div style={{"padding":"0 1rem"}}>
                        <Inputs
                            kind="float"
                            type="number"
                            title="train set ratio"
                            min={0.0}
                            max={1.0}
                            default={1.0}
                            step={0.01}
                            value={splitRatio}
                            setValue={setSplitRatio}
                            placeholder="0.0 ~ 1.0 train set ratio"
                        />
                    </div>
                </div>
                <div style={style.CenterContainer}>
                    <Button 
                        className="red"
                        style={style.btn}
                        type="button"
                        onClick={() => {
                            dispatch(trainActions.initialize());
                            dispatch(preprocessingActions.initialize());
                        }}>
                        초기화
                    </Button>
                    <Button 
                        className="green"
                        style={style.btn}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            
                            onClickHandler().then( _ => {
                                setLoading(false);
                            })}}
                        >
                        적용
                    </Button>
                </div>
            </div>
            <div className={mainStyle.container}>
                <Title title="데이터 테이블"
                    icon={<MdOutlineToc/>}
                    style={style.CenterContainer}/>
                <div style={{"display":"flex",
                        "justifyContent":"space-between",
                        "marginRight":"2.5rem"}}>
                    <Title title="훈련 셋" />
                    <div style={{"display":"flex", "marginLeft":"2.5rem"}}>
                        <Inputs
                            kind="input"
                            type="number"
                            mainTitle="데이터 뷰 개수"
                            title="trainNData"
                            placeholder="정수만 입력"
                            defaultValue={5}
                            step={1}
                            min={1}
                            max={trainX.shape[1]}
                            required={true}
                            value={nData}
                            setValue={setNData}/>
                        <Button
                            className="right"
                            style={{"marginRight":"1rem", "wordBreak":"keep-all"}}
                            type="button"
                            onClick={() => {
                                try {
                                    if ( nData.trainNData < 1 && nData.trainNData > trainX.shape[1] ) {
                                        throw new Error(`0 ~ ${trainX.shape[1]}사이의 값을 입력해주세요. 현재 값 : ${nData.trainNData}`);
                                    }
                                    
                                    const newX = getNData(trainX.data, nData.trainNData);
                                    const newY = getNData(trainY.data, nData.trainNData);

                                    setViewTrainX({
                                        ['columns']: trainX.columns,
                                        ['data']: newX,
                                        ['shape']: getShape(newX)
                                    })
                                    setViewTrainY({
                                        ['columns']: trainY.columns,
                                        ['data']: newY,
                                        ['shape']: getShape(newY)
                                    })

                                } catch (err) {
                                    if ( err.message === "ParamError: end must be greater than start") {
                                        alert(`데이터 뷰 개수를 입력해주세요`);
                                    } else {
                                        alert(err.message);
                                    }
                                }
                            }}>
                            적용
                        </Button>
                    </div>
                </div>
                <div className={mainStyle.subContainer}>
                    <Title title="라벨 데이터 테이블"
                        style={{"fontSize":"1.25rem", "margin": "0.5rem 0"}}/>
                    <div className={mainStyle.subContainer}>
                        {contentView({
                            element: viewTrainY.columns,
                            children: <ArrayTable
                                        style={{"height":"24rem"}}
                                        data={viewTrainY}
                                        />,
                            checkFunction: isEmptyArray
                        })}
                    </div>
                        <Title title="특성 데이터 테이블"
                            style={{"fontSize":"1.25rem", "margin": "0.5rem 0"}}/>
                        <div className={mainStyle.subContainer}>
                            {contentView({
                                element: viewTrainX.columns,
                                children: <ArrayTable
                                            style={{"height":"24rem"}}
                                            data={viewTrainX}
                                          />,
                                checkFunction: isEmptyArray
                            })}
                        </div>
                </div>
                <div style={{"display":"flex",
                        "justifyContent":"space-between",
                        "marginRight":"2.5rem"}}>
                    <Title title="테스트 셋"/>
                    <div style={{"display":"flex", "marginLeft":"2.5rem"}}>
                        <Inputs
                            kind="input"
                            type="number"
                            mainTitle="데이터 뷰 개수"
                            title="testNData"
                            placeholder="정수만 입력"
                            defaultValue={5}
                            step={1}
                            min={1}
                            max={testX.shape[1]}
                            required={true}
                            value={nData}
                            setValue={setNData}/>
                        <Button
                            className="right"
                            style={{"marginRight":"1rem", "wordBreak":"keep-all"}}
                            type="button"
                            onClick={() => {
                                try {
                                    if ( nData.testNData < 1 && nData.testNData > testX.shape[1] ) {
                                        throw new Error(`0 ~ ${testX.shape[1]}사이의 값을 입력해주세요. 현재 값 : ${nData.testNData}`);
                                    }
                                    
                                    const newX = getNData(testX.data, nData.testNData);
                                    const newY = getNData(testY.data, nData.testNData);

                                    setViewTestX({
                                        ['columns']: testX.columns,
                                        ['data']: newX,
                                        ['shape']: getShape(newX)
                                    })
                                    setViewTestY({
                                        ['columns']: testY.columns,
                                        ['data']: newY,
                                        ['shape']: getShape(newY)
                                    })

                                } catch (err) {
                                    if ( err.message === "ParamError: end must be greater than start") {
                                        alert(`데이터 뷰 개수를 입력해주세요`);
                                    } else {
                                        alert(err.message);
                                    }
                                    if ( err.message === "Value Error") {
                                        alert();
                                    }
                                }
                            }}>
                            적용
                        </Button>
                    </div>
                </div>
                <div className={mainStyle.subContainer}>
                        <Title title="라벨 데이터 테이블"
                            style={{"fontSize":"1.25rem", "margin": "0.5rem 0"}}/>
                        <div className={mainStyle.subContainer}>
                            {contentView({
                                element: viewTestY.columns,
                                children: <ArrayTable
                                            style={{"height":"24rem"}}
                                            data={viewTestY}
                                          />,
                                checkFunction: isEmptyArray
                            })}
                        </div>
                        <Title title="특성 데이터 테이블"
                            style={{"fontSize":"1.25rem", "margin": "0.5rem 0"}}/>
                        <div className={mainStyle.subContainer}>
                            {contentView({
                                element: viewTestY.columns,
                                children: <ArrayTable
                                            style={{"height":"24rem"}}
                                            data={viewTestX}
                                          />,
                                checkFunction: isEmptyArray
                            })}
                        </div>
                </div>
            </div>
        </>
    )
}

export default Preprocessing;
