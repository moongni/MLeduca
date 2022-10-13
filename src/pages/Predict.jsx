import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mainStyle from "../components/Common/component.module.css";
import Title from "../components/Common/title/title";
import { AiOutlineLineChart } from "react-icons/ai";
import { Button } from "../components/Common/button/Button";
import { PredictData } from "../components/Predict/PredictData";
import { PredictModel } from "../components/Predict/PredictModel";
import { useEffect } from "react";
import { isEmpty, isEmptyArray, isEmptyObject } from "../components/Common/package";
import { mkConTensor } from "../components/TF/ConvertToTensor";
import { testActions } from "../reducers/testSlice";
import ArrayTable from "../components/Common/table/ArrayTable";

const Predict = () => {
    const dispatch = useDispatch();

    const testData = useSelector( state => state.test.x );
    const predY = useSelector( state => state.test.y );
    const predYColumn = useSelector( state => state.test.label );

    const [ model, setModel ] = useState({});
    const [ disable, setDisable ] = useState(true);

    const [ predData, setPredData ] = useState([]);

    useEffect(() => {
        if ( !isEmptyObject(model) && !isEmptyObject(testData) ) {
            
            setDisable(false);
            
        } else {
            
            setDisable(true);

        }
    }, [ model, testData ])

    const onClickHandler = async (e) => {
        const arrToObject = async ( data ) => {
            var ret = data.reduce(( acc, val ) => {
                if ( !isEmptyArray(val) ) {
                    val.map(( value, idx ) => {
                        if ( !isEmpty(acc[`${idx}`]) ) {
                            acc[`${idx}`].push(value);
                        } else {
                            acc[`${idx}`] = [value]
                        }
                    })
                }
                return acc;
            }, {})

            return ret;
        }

        e.preventDefault();
    
        var tensorData = mkConTensor(testData);
        
        var predData = await model.predict(tensorData);

        setPredData(predData);

        dispatch( testActions.setLabelData(await arrToObject(predData.arraySync())) );

    }
    const style = {
        btnContainer: {
            "display":"flex",
            "flexDirection":"column",
            "fontSize":"1.25rem",
            "lineHeight":"1.75rem",
            "wordBreak":"break-word",
            "justifyContent":"space-between",
            "padding":"4rem"
        }
    }
    return (
        <>
            <div className={mainStyle.container}>
                <Title title="Predict Data" icon={<AiOutlineLineChart/>}/>
                <div className={mainStyle.subContainer}>
                    <PredictData/>
                </div>
            </div>
            <div className={mainStyle.container}>
                <Title title="Model For Predict" icon={<AiOutlineLineChart/>}/>
                <div className={mainStyle.subContainer}>
                    <PredictModel 
                        setModel={setModel}/>
                </div>
                <Button
                    className="center green"
                    style={{"width":"100px"}}
                    type="button"
                    disabled={disable}
                    onClick={(e) => onClickHandler(e)}
                >
                    predict
                </Button>
            </div>
            {!isEmptyArray(predYColumn) &&
                <div className={mainStyle.container}>
                    <Title title="predicted Data"/>
                    <div className={mainStyle.subContainer}
                        style={{"display":"flex"}}>
                            <ArrayTable
                                style={{"height":'24rem'}}
                                data={predY}
                                columns={predYColumn}/>
                            <div style={style.btnContainer}>
                                <Button
                                    type="button"
                                    children="download as css"/>
                                <Button
                                    type="button"
                                    children="download as json"/>
                                <Button
                                    type="button"
                                    children="download as excel"/>
                            </div>
                    </div>
                        
                </div>
            }
        </>
    )
}

export default Predict;