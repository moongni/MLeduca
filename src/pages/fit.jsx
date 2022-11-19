import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createModel } from "../components/TF/CreateModel";
import { convertToTensor } from "../components/TF/ConvertToTensor";
import { trainModel } from "../components/TF/TrainModel";
import { getNData, getShape, isEmptyArray, isEmptyObject, isEmptyStr } from "../components/Common/package";
import { Button } from "../components/Common/button/Button";
import Title from "../components/Common/title/title";
import { LayerBoard, SettingBoard } from "../components/ModelDashBoard/Board";
import { Loader } from "../components/Common/loader/Loader";
import mainStyle from "../components/Common/component.module.css";
import { historyActions } from "../reducers/historySlice";
import { ModelSelectModal, SettingSelectModal } from "../components/Common/modal/modal";
import { useOutletContext } from "react-router-dom";
import Inputs from "../components/Common/inputs/Inputs";
import { contentView } from "../components/Common/package";
import ArrayTable from "../components/Common/table/ArrayTable";

export async function run(model, compile, parameter, xs, ys) {
  const tensorData = convertToTensor(xs,  ys);
  console.log('convertToTensor 완료');
  console.log("tensorData", tensorData);

  const { features, labels } = tensorData;
  
  
  const { history, trainedModel } = await trainModel(model, features, labels, compile, parameter);
  console.log('Done Training');
  console.log("history", history);
  console.log('trainedModel', trainedModel);


  return { history, trainedModel };
}

function Fit() {
  const dispatch = useDispatch();
  
  const [ model, setModel ] = useOutletContext();

  const compile = useSelector( state => state.setting.compile );
  const parameter = useSelector( state => state.setting.parameter.info );
  const layers = useSelector( state => state.setting.layer );
  const xs = useSelector( state => state.train.feature );
  const ys = useSelector( state => state.train.label );
  console.log(layers);
  const initData = {
    'columns': [],
    'data': {},
    'shape': []
  };
  const [ viewTrainX, setViewTrainX ] = useState(initData);
  const [ viewTrainY, setViewTrainY ] = useState(initData);
  const [ nData, setNData ] = useState({"trainNData": 5});
  const [ modelModal, setModelModal ] = useState(false);
  const [ settingModal, setSettingModal ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);
  const [ disabled, setDisabled] = useState(
    isEmptyArray(layers) || isEmptyObject(parameter) || 
    isEmptyObject(compile.optimizer) || isEmptyStr(compile.loss) ||
    isEmptyObject(xs) || isEmptyObject(ys)
  );
  useEffect(() => {
    setModel({});
  }, [])
  useEffect(() => {
    if (!isEmptyArray(xs.columns)) {
      const newX = getNData(xs.data, nData.trainNData);

      setViewTrainX({
        'columns': xs.columns,
        'data': newX,
        'shape': getShape(newX)
      })
    }

    if (!isEmptyArray(ys.columns)) {
      const newY = getNData(ys.data, nData.trainNData);

      setViewTrainY({
        'columns': ys.columns,
        'data': newY,
        'shape': getShape(newY)
      })
    }
  }, [xs, ys])

  const onClickHandler = () => {
    setDisabled(true);
    setLoading(true);

    console.log("fit call");

    const makeModel = async () => {
      var preTrainModel = model;

      if (!isEmptyObject(layers) && isEmptyObject(preTrainModel)) {
        console.log("create model");
        preTrainModel = await createModel(layers);
        setModel(preTrainModel);
      }
      
      return preTrainModel;
    }   

    makeModel().then( model => {
      run(model, compile, parameter, xs.data, ys.data)
      .then( async ({ history, trainedModel }) => {
        const saveResult = await trainedModel.save("localstorage://model/recent");
  
        dispatch(historyActions.setHist(JSON.stringify(history)));
  
        console.log(saveResult);
        
      })
      .then( _ => {
        alert("모델 훈련 완료, localstroage://model/recent에 저장되었습니다.");
      })
      .catch( respond => {
        alert(respond);
        console.log(respond);
        // window.location.reload();
      })
      .finally( _ => {
        setDisabled(false);
        setLoading(false);
      })
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
        setModalShow={setModelModal}
        setModel={setModel}
        setLoading={setLoading}/>
      <SettingSelectModal
        modalShow={settingModal}
        setModalShow={setSettingModal}/>
      <div className={mainStyle.container}>
        {isLoading &&
          <div style={style.loadingStyle}>
            <Loader type="spin" color="black" message={"Loading..."} style={{"position":"fixed"}}/>
          </div>
        }
        <div style={{"display":"flex"}}>
          <Title title="모델 정보"/>
          <Button 
              className="right"
              type="button"
              style={style.btn}
              onClick={() => {
                setModelModal(true);
              }}
              >
              모델 선택
          </Button>
        </div>
        <div className={mainStyle.subContainer}>
            <LayerBoard />
        </div>
        <div style={{"display":"flex"}}>
          <Title title="설정 정보"/>
          <Button
              className="right"
              type="button"
              style={style.btn}
              onClick={() => {
                  setSettingModal(true);
              }}>
              설정 선택
          </Button>
        </div>
        <div className={mainStyle.subContainer}>
            <SettingBoard/>
        </div>
        <div style={{"display":"flex",
                    "justifyContent":"space-between",
                    "marginRight":"2.5rem"}}>
          <Title title="훈련 셋"/>
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
                max={xs.shape[1]}
                required={true}
                value={nData}
                setValue={setNData}/>
            <Button
                className="right"
                style={{"marginRight":"1rem", "wordBreak":"keep-all"}}
                type="button"
                onClick={() => {
                    try {
                        if ( nData.trainNData < 1 && nData.trainNData > xs.shape[1] ) {
                            throw new Error(`0 ~ ${xs.shape[1]}사이의 값을 입력해주세요. 현재 값 : ${nData.trainNData}`);
                        }
                        
                        const newX = getNData(xs.data, nData.trainNData);
                        const newY = getNData(ys.data, nData.trainNData);

                        setViewTrainX({
                            ['columns']: xs.columns,
                            ['data']: newX,
                            ['shape']: getShape(newX)
                        })
                        setViewTrainY({
                            ['columns']: ys.columns,
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

export default React.memo(Fit)