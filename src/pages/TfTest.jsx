import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createModel } from "../components/TF/CreateModel";
import { convertToTensor } from "../components/TF/ConvertToTensor";
import { trainModel } from "../components/TF/TrainModel";
import { isEmptyArray, isEmptyObject, isEmptyStr } from "../components/Common/package";
import { Button } from "../components/Common/button/Button";
import Title from "../components/Common/title/title";
import { LayerBoard, SettingBoard } from "../components/ModelDashBoard/Board";
import { Loader } from "../components/Common/loader/Loader";
import mainStyle from "../components/Common/component.module.css";
import { historyActions } from "../reducers/historySlice";
import { ModelSelectModal } from "../components/Common/modal/CommonModal";

export async function run(layers, compile, parameter, xs, ys) {
  const model = createModel(layers);
  // tfvis.show.modelSummary({name: 'Model Summary'}, model);
  
  const tensorData = convertToTensor(xs,  ys);
  console.log('convertToTensor 완료');
  console.log("tensorData", tensorData);
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

  const [ modelModal, setModelModal ] = useState(false);
  const [ model, setModel ] = useState({});
  
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

      dispatch(historyActions.setHist(JSON.stringify(history)));

      console.log(saveResult);
      
    })
    .then( _ => {
      setDisabled(false);
      setLoading(false);
      
      alert("complete model fit, and save localstroage://model/recent");
      
      window.location = `/analytic`;

    })
    .catch( respond => {
      alert(respond);

      window.location.reload();
    })

  }

  const style = {
    loadingStyle: {
      "position":"fixed",
      "top":"0",
      "left":"0",
      "width":"100vw",
      "height":"100vw",
      "backgroundColor":"gray",
      "opacity":"0.3",
      "zIndex":"100"
    },
    btn: {
      "alignText":"center",
      "marginLeft":"auto"
    }
  }

  return (
    <>
      <ModelSelectModal
        modalShow={modelModal}
        setModalShow={setModelModal}/>
      <div className={mainStyle.container}>
        {isLoading &&
          <div style={style.loadingStyle}>
            <Loader type="spin" color="black" message={"Loading..."} style={{"position":"fixed"}}/>
          </div>
        }
        <div style={{"display":"flex"}}>
          <Title title="Model Info"/>
          <Button 
              className="right"
              type="button"
              style={style.btn}
              onClick={() => {
                setModelModal(true);
              }}
              >
              Model Select
          </Button>
        </div>
        <div className={mainStyle.subContainer}>
            <LayerBoard />
        </div>
        <div style={{"display":"flex"}}>
          <Title title="Setting Info"/>
          <Button
              className="right"
              type="button"
              style={style.btn}
              onClick={() => {
                  
              }}>
              Setting Select
          </Button>
        </div>
        <div className={mainStyle.subContainer}>
            <SettingBoard/>
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
    </>
  )
}

export default React.memo(TfTest)
