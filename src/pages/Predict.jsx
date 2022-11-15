import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import mainStyle from "../components/Common/component.module.css";
import Title from "../components/Common/title/title";
import { AiOutlineLineChart } from "react-icons/ai";
import { Button } from "../components/Common/button/Button";
import { PredictData } from "../components/Predict/PredictData";
import { PredictModel } from "../components/Predict/PredictModel";
import { isEmpty, isEmptyArray, isEmptyObject, getNData, getShape, makeRangeArray } from "../components/Common/package";
import { mkConTensor } from "../components/TF/ConvertToTensor";
import { testActions } from "../reducers/testSlice";
import ArrayTable from "../components/Common/table/ArrayTable";
import { contentView } from "../components/Common/package";
import Inputs from "../components/Common/inputs/Inputs";
import { PreprocessingOptions } from "../components/Preprocessing/PreprocessingOption";
import { preprocessingActions } from "../reducers/preprocessingSlice";
import SetColumn from "../components/Preprocessing/SetColumn";
import { selectColumn } from "../components/Common/package";
import { preprocess } from "../components/TF/Preprocess";
import * as dfd from "danfojs";
import { useOutletContext } from "react-router-dom";

const Predict = () => {
    const dispatch = useDispatch();

    const rowTestData = useSelector( state => state.test.rowData );
    const testX = useSelector( state => state.test.feature );
    const predY = useSelector( state => state.test.predData );
    const process = useSelector( state => state.preprocess.test );
    const yColumn = useSelector( state => state.train.label.columns );

    const [ model, setModel ] = useOutletContext();
    const [ disable, setDisable ] = useState(true);
    const [ isLoading, setLoading ] = useState(false);
    const [ sample, setSample ] = useState({});
    const [ nData, setNData ] = useState({"testNData":5});

    const [ viewTestX, setViewTestX ] = useState({
        'columns': [],
        'data': {},
        'shape': []
    });
    
    useEffect(() => {
        if ( !isEmptyObject(model) && !isEmptyObject(testX.data) ) {
            
            setDisable(false);
            
        } else {
            
            setDisable(true);

        }

        if (!isEmptyArray(testX.columns)) {
            const newData = getNData(testX.data, nData.testNData)

            setViewTestX({
                'columns': testX.columns,
                'data': newData,
                'shape': getShape(newData)
            })
        }
    }, [ model, testX.data ])

    const onClickPredict = async (e) => {
        const arrToObject = async ( data ) => {
            var colName = isEmptyArray(yColumn)? makeRangeArray(0, data[0].length) : yColumn;

            var ret = data.reduce(( acc, val ) => {
                if ( !isEmptyArray(val) ) {
                    val.map(( value, idx ) => {
                        if ( !isEmpty(acc[`${colName[idx]}`]) ) {
                            acc[`${colName[idx]}`].push(value);
                        } else {
                            acc[`${colName[idx]}`] = [value]
                        }
                    })
                }
                return acc;
            }, {})

            return ret;
        }

        e.preventDefault();
    
        var tensorData = mkConTensor(testX.data);
        var predData = await arrToObject((await model.predict(tensorData)).arraySync()) ;

        dispatch( testActions.setPredData(predData) );

    }

    const onClickHandler = async () => {
        try {
            setLoading(true);

            dispatch(preprocessingActions.updateProcess({
                title: 'feature',
                columns: testX.columns,
                kind: "test"
            }))

            const cashData = selectColumn(rowTestData.data, testX.columns);
            const dummyData = cashData;

            const { labelData, featureData } = await preprocess(dummyData, cashData, process);

            dispatch(testActions.setFeatureData(featureData));
            

        } catch (e) {
            alert(e);
        }
    }

    const style = {
        verticalBtnContainer: {
            "display":"flex",
            "flexDirection":"column",
            "fontSize":"1.25rem",
            "lineHeight":"1.75rem",
            "wordBreak":"break-word",
            "justifyContent":"space-between",
            "padding":"4rem"
        },
        horizonBtnContainer: {
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
            <div className={mainStyle.container}>
                <Title title="예측 데이터 준비" icon={<AiOutlineLineChart/>}/>
                <div className={mainStyle.subContainer}>
                    <PredictData/>
                </div>

                {!isEmptyArray(rowTestData.columns) &&
                    <SetColumn
                    title={"열 선택"}
                    style={{"padding":"0 1rem"}}
                    setData={testActions.setFeatureData}
                    setColumn={testActions.setFeatures}
                    setLoading={setLoading}
                    data={rowTestData.data}
                    dataColumns={rowTestData.columns}
                    />
                }
                <div style={{"display":"flex",
                        "justifyContent":"space-between",
                        "marginRight":"2.5rem"}}>
                    <Title title="데이터 테이블" icon={<AiOutlineLineChart/>}/>
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

                                    setViewTestX({
                                        ['columns']: testX.columns,
                                        ['data']: newX,
                                        ['shape']: getShape(newX)
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
                    {contentView({
                        element: viewTestX.columns,
                        children: 
                        <>
                            <ArrayTable 
                                style={{"maxHeight":"24rem"}}
                                data={viewTestX}
                            >
                                <Inputs 
                                    style={{"width":"100%"}}
                                    kind="float"
                                    value={sample}
                                    setValue={setSample}/>
                            </ArrayTable>
                            <PreprocessingOptions
                                title="feature"
                                kind="test"
                                columns={testX.columns}
                                preprocess={process}
                            />
                            <div style={style.horizonBtnContainer}>
                                <Button 
                                    className="red"
                                    style={style.btn}
                                    type="button"
                                    onClick={() => {
                                        dispatch(testActions.initialize());
                                        dispatch(preprocessingActions.initialize());
                                    }}
                                >
                                    초기화
                                </Button>
                                <Button 
                                    className="green"
                                    style={style.btn}
                                    type="button"
                                    onClick={() => {
                                        onClickHandler().then( _ => setLoading(false))}}
                                    >
                                    적용
                                </Button>
                            </div>

                        </>,
                        checkFunction: isEmptyArray
                    })}
                </div>
            </div>
            <div className={mainStyle.container}>
                <Title title="예측 모델 준비" icon={<AiOutlineLineChart/>}/>
                <div className={mainStyle.subContainer}>
                    <PredictModel 
                        model={model}
                        setModel={setModel}/>
                </div>
                <Button
                    className="center green"
                    style={{"width":"100px"}}
                    type="button"
                    disabled={disable}
                    onClick={(e) => onClickPredict(e)}
                >
                    예측
                </Button>
            </div>
            {!isEmptyArray(predY.columns) &&
                <div className={mainStyle.container}>
                    <Title title="예측 결과 데이터 테이블"/>
                    <div className={mainStyle.subContainer}
                        style={{"display":"flex"}}>
                            <div style={{"width":"100%"}}>
                                <ArrayTable
                                    style={{"height":'24rem'}}
                                    data={predY}/>
                            </div>
                            <div style={style.verticalBtnContainer}>
                                <Button
                                    type="button"
                                    children="download as csv"
                                    onClick={() => {
                                        try {
                                            var df = new dfd.DataFrame(predY.data);

                                            dfd.toCSV(df, {download: true});
                                        
                                        } catch (e) {
                                            alert(e);
                                        }
                                    }}/>
                                <Button
                                    type="button"
                                    children="download as json"
                                    onClick={() => {
                                        try {
                                            var df = new dfd.DataFrame(predY.data);

                                            dfd.toJSON(df, {download: true});
                                        } catch (e) {

                                            alert(e);

                                        }
                                    }}/>
                            </div>
                    </div>
                        
                </div>
            }
        </>
    )
}

export default Predict;