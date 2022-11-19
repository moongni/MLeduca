import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DrogDropFile } from "../components/LoadData/DrogDropFile";
import { contentView, getData, getNData, getShape, isEmptyStr } from "../components/Common/package";
import Inputs from "../components/Common/inputs/Inputs";
import ArrayTable from "../components/Common/table/ArrayTable";
import { dataActions } from "../reducers/dataSlice";
import style from "../components/Common/component.module.css";
import { FiDatabase } from "react-icons/fi";
import { isEmptyArray } from "../components/Common/package";
import Title from "../components/Common/title/title";
import { Button } from "../components/Common/button/Button";
import { Loader } from "../components/Common/loader/Loader";
import { trainActions } from "../reducers/trainSlice";
import { testActions } from "../reducers/testSlice";
import { preprocessingActions } from "../reducers/preprocessingSlice";
import { useEffect } from "react";
import * as dfd from "danfojs";

export default function LoadData() {
    const dispatch = useDispatch();

    const data = useSelector( state => state.data );

    const [ url, setUrl ] = useState("");
    const [ isLoading, setLoading ] = useState(false);
    const [ nData, setNData ] = useState({"nData": 5});
    const [ viewData, setViewData ] = useState({
        'columns': [],
        'data': {},
        'shape': []
    });
    
    useEffect(() => {
        if (!isEmptyArray(data.columns)) {
            const newData = getNData(data.data, nData.nData);
    
            setViewData({
                'columns': data.columns,
                'data': newData,
                'shape': getShape(newData)
            })
        }
    }, [ data ])

    const onClickHandler = () => {
        try {
            if ( isEmptyStr(url) ) {
                throw new Error("Url을 입력해주세요");
            }
    
            dispatch(trainActions.initialize());
            dispatch(testActions.initialize());
            dispatch(preprocessingActions.initialize());
    
            getData(url, dispatch, dataActions, setLoading)
            .finally( _ => {
                setLoading(false);
            })
        } catch (err) {
            alert(err.message)
        }
    }

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

                        // const jsonData = await JSON.parse(contents);
                        

                        // dispatch(actions.setColumns(Object.keys(jsonData[0])));
                        
                        // Object.keys(jsonData[0]).map(column => {
                        // const newSample = {
                        //     [column]: jsonData.map(sample => sample[column])
                        // }
                        // dispatch(actions.addData(newSample));
                        // })
                        break;

                    case "text/csv":
                        const csvDf = await dfd.readCSV(file);

                        newData = dfd.toJSON(csvDf, { format: 'row' });

                        // const rows = contents.split((/\r?\n|\r/));
                        // const features = rows.shift().split(',');
                        
                        // dispatch(actions.setColumns(features));
                        
                        // const newData = new Object();
                        
                        // features.map(feature => {
                        //     newData[feature] = [];
                        // })
                        
                        // rows.forEach(row => {
                        //     const values = row.split(',');
                        //     features.forEach((value, key) => {
                        //         newData[value].push(values[key]);
                        //     })
                        // })
                        
                        // dispatch(actions.setData(newData));
                  }

                dispatch(dataActions.setColumns(Object.keys(newData)));

                dispatch(dataActions.setData(newData));

              };
            
            reader.readAsText(file);

        } catch (e) {
            
            alert(e);

        }

        setLoading(false);
        
    }

    return (
        <div className={style.container}>
            <Title title="데이터 적재" icon={<FiDatabase/>}/>
            <div className={style.subContainer}>
                { isLoading && <Loader type="spin" color="black" message={"Load Data"}/>}
                <div style={{"display":"flex",
                            "marginRight":"2.5rem",
                            "marginLeft":"2.5rem"}}>
                    <Inputs 
                        kind="text"
                        title="Url로 불러오기"
                        placeholder="Url 입력"
                        value={url}
                        setValue={setUrl}
                    />
                    <Button
                        className="right"
                        style={{"marginRight":"1rem"}}
                        type="button" 
                        onClick={onClickHandler}>
                        불러오기
                    </Button>
                </div>
                <DrogDropFile 
                    title="File로 불러오기"
                    readFile={readFile}
                />
            </div>
            <div style={{"display":"flex",
                        "justifyContent":"space-between",
                        "marginRight":"2.5rem"}}>
                <Title title="데이터 테이블" />
                <div style={{"display":"flex", "marginLeft":"2.5rem"}}>
                    <Inputs
                        kind="input"
                        type="number"
                        mainTitle="데이터 뷰 개수"
                        title="nData"
                        placeholder="정수만 입력"
                        defaultValue={5}
                        step={1}
                        min={1}
                        max={data.shape[1]}
                        required={true}
                        value={nData}
                        setValue={setNData}/>
                    <Button
                        className="right"
                        style={{"marginRight":"1rem", "wordBreak":"keep-all"}}
                        type="button"
                        onClick={() => {
                            try {
                                if ( nData.nData < 1 && nData.nData > data.shape[1] ) {
                                    throw new Error(`0 ~ ${data.shape[1]}사이의 값을 입력해주세요. 현재 값 : ${nData.nData}`);
                                }

                                const newData = getNData(data.data, nData.nData)

                                setViewData({
                                    ['columns']: data.columns,
                                    ['data']: newData,
                                    ['shape']: getShape(newData)
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
            <div className={style.subContainer}>
                {contentView({
                    element: viewData.columns,
                    children: <ArrayTable 
                                style={{"height":"24rem"}}
                                data={viewData}/>,
                    checkFunction: isEmptyArray
                })}
            </div>
        </div>
    );
}