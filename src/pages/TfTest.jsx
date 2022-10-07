import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createModel } from "../components/TF/CreateModel";
import { convertToTensor } from "../components/TF/ConvertToTensor";
import { trainModel } from "../components/TF/TrainModel";
import { isEmptyArray, isEmptyObject, isEmptyStr } from "../components/Common/package";
import { Button } from "../components/Common/button/Button";
import Title from "../components/Common/title/title";
import { ModelInfoBoard } from "../components/ModelDashBoard/Board";
import { Loader } from "../components/Common/loader/Loader";
import style from "../components/Common/component.module.css";
import { historyActions } from "../reducers/history";

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
  const layers = useSelector((state) => state.layers);
  const xs = useSelector((state) => state.train.x);
  const ys = useSelector((state) => state.train.y);

  const [ isLoading, setLoading ] = useState(false);
  const [ disabled, setDisabled] = useState(
    isEmptyArray(layers) || isEmptyObject(parameter) || 
    isEmptyObject(compile.optimizer) || isEmptyStr(compile.loss)
  );
  
  useEffect(() => {
    if ( isEmptyArray(xs) || isEmptyArray(ys) ) {
      alert("please, prepare samples for training")
      window.location = '/preprocessing'
    }
  }, [])

  const onClickHandler = ()=> {
    setDisabled(true);
    setLoading(true);
    
    console.log("fit call");
    
    run(layers, compile, parameter, xs, ys)
    .then( async ({ history, trainedModel }) => {
      const saveResult = await trainedModel.save("localstorage://model/recent");
      const saveModel = await trainedModel.save("downloads://recent");
      console.log("save model :", saveResult);
      console.log("history", history);
      dispatch(historyActions.setHist(JSON.stringify(history)));
    })
    .then( _ => {
      setDisabled(false);
      setLoading(false);
      alert("complete model fit, and save localstroage://model/recent");
      window.location = `/analytic/localstorage/recent`;
    })
    .catch( respond => {
      console.log("respond", respond);
      alert(respond);
      window.location.reload();
    })

  }

  return (
    <div className={style.container}>
      {isLoading &&
        <div style={{
              "position":"fixed",
              "top":"0",
              "left":"0",
              "width":"100vw",
              "height":"100vw",
              "backgroundColor":"gray",
              "opacity":"0.3",
              "zIndex":"100"}}>
          <Loader type="spin" color="black" message={"Loading..."}
              style={{"position":"fixed"}}/>
        </div>
      }
      <Title title="Model Info"/>
      <div className={style.subContainer}
        style={{"width":"100%"}}>
        <ModelInfoBoard />
      </div>
      <Button
        className="center green"
        style={{"width":"100%"}}
        type="button"
        disabled={disabled}
        onClick={onClickHandler}>
          fit
      </Button>
    </div>
  )
}

export default React.memo(TfTest)
