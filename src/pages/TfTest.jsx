import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createModel } from "../components/TF/CreateModel";
import { convertToTensor } from "../components/TF/ConvertToTensor";
import { trainModel } from "../components/TF/TrainModel";
import { useEffect } from "react";
import { isEmptyArray, isEmptyObject, isEmptyStr } from "../components/Common/package";
import style from "../components/Common/component.module.css";
import { Button } from "../components/Common/button/Button";
import Title from "../components/Common/title/title";
import { LayerBoard } from "../components/ModelDashBoard/LayerBoard";
import { CompileBoard } from "../components/ModelDashBoard/CompileBoard";
import { ParamBoard } from "../components/ModelDashBoard/ParamBoard";
import Chart from 'chart.js/auto';

export async function run(layers, compile, parameter, xs, ys) {
  const model = createModel(layers);
  // tfvis.show.modelSummary({name: 'Model Summary'}, model);
  
  const tensorData = convertToTensor(xs,  ys);
  console.log('convertToTensor 완료');
  const {inputs, labels} = tensorData;
  console.log('model1', model);
  const { history, trainedModel } = await trainModel(model, inputs, labels, compile, parameter);
  console.log('Done Training');
  console.log("history", history);
  console.log('model2', trainedModel);


  return { history, trainedModel };
}

function TfTest() {
  const dispatch = useDispatch();

  const compile = useSelector((state) => state.compile);
  const parameter = useSelector((state) => state.parameter.info);
  const layers = useSelector((state) => state.layers.info);
  const xs = useSelector((state) => state.train.x);
  const ys = useSelector((state) => state.train.y);
  
  const [hist, setHist] = useState({});

  let disabled = (isEmptyArray(layers) || isEmptyObject(parameter) || 
    isEmptyObject(compile.optimizer) || isEmptyStr(compile.loss))
  
  useEffect(
    () => {
      if(isEmptyArray(xs) || isEmptyArray(ys)){
        alert("please, prepare samples for training")
        window.location = '/preprocessing'
      }
    }
  , [])

  const onClickHandler = ()=> {
    run(layers, compile, parameter, xs, ys)
    .then(async ({ history, trainedModel }) => {
      const saveResult = await trainedModel.save("localstorage://model/my-model-1");
      console.log("save model :", saveResult);
      console.log("history", history);
      setHist(history);
    })
    .catch(
      respond => {
        console.log(respond);
        alert("error : ", respond);
    })}

  return (
    <div className={style.container}>
      <Title title="Model Info"/>
      <div className={style.subContainer}
        style={{"width":"100%"}}>
        <LayerBoard />
        <CompileBoard />
        <ParamBoard />
      </div>
      <Button
        className="center green"
        style={{"width":"100%"}}
        type="button"
        disabled={disabled}
        onClick={onClickHandler}>
          fit
      </Button>
      {!isEmptyObject(hist) &&
        <>
          <Title title="Result"/>
          
        </>
      }

    </div>
  )
}

export default React.memo(TfTest)
