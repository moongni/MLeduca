import React, { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { dataActions } from "../reducers/dataSlice";


function convertToTensor(data) {
  console.log('convertToTensor 호출');
  console.log("data",data);
  return tf.tidy(() => {
    // 1. 데이터 셔플
    // tf.util.shuffle();

    // 2. 텐서로 데이터 변환
    const inputs = data.xs;
    const labels = data.ys;
    const inputTensor = tf.tensor2d(inputs, [inputs.length, inputs[0].length]);
    const labelTensor = tf.tensor2d(labels, [labels.length, labels[0].length]);
    console.log("inputs",inputTensor);
    console.log("labels",labelTensor);

    // 3. 정규화
    const inputMax = inputTensor.max(1);
    const inputMin = inputTensor.min(1);
    const labelMax = labelTensor.max(1);
    const labelMin = labelTensor.min(1);

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
    console.log("Ninput",normalizedInputs);
    console.log("Nlabel",normalizedLabels);

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // 최솟값 최댓값 반환
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    }
  })
}

function TfTest2() {
    const dispatch = useDispatch();
    const compile = useSelector((state) => state.compile.info);
    const layers = useSelector((state) => state.layers.info);
    const parameter = useSelector((state) => state.parameter.info);
    const data = useSelector((state) => state.data.data);
    
    const [Xsample, setXsample] = useState([]);
    const [Ysample, setYsample] = useState([]);

    useEffect(() => {
      setXsample(data.xs);
      setYsample(data.ys);
    }, [data])

    console.log(data);

  async function run() {
    dispatch(dataActions.getTensorData());
    
    // tfvis.render.scatterplot(
    //   {name: 'Horsepower v MPG'},
    //   {values},
    //   {
    //     xLabel: '',
    //     yLabel: 'MPG',
    //     height: 300
    //   }
    // );

    const model = createModel();
    tfvis.show.modelSummary({name: 'Model Summary'}, model);

    const tensorData = convertToTensor(data);
    console.log('convertToTensor 완료');
    const {inputs, labels} = tensorData;

    await trainModel(model, inputs, labels);
    console.log('Done Training');
    testModel(model, data, tensorData);
  }


  function createModel() {
    console.log('createModel 호출');
    // model sequence 
    const model = tf.sequential();

    layers.map(layer => {
      model.add(tf.layers.dense(layer.info));
    })
    // model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
    // model.add(tf.layers.dense({units: 1, useBias: true}));
  
    return model;
  }

  async function trainModel(model, inputs, labels) {
    model.compile({
      ...compile
    })

    return await model.fit(inputs, labels, {
      ...parameter,
      // batchSize:parameter.filter(param => param.title == "batchSize")[0].name,
      // epochs:parameter.filter(param => param.title == "epochs")[0].name,
      shuffle: true,
      callbacks: tfvis.show.fitCallbacks(
        { name: 'Training Performance'},
        ['loss', 'mse'],
        { height: 200, callbacks: ['onEpochEnd']}
      )
    })
  }

  function testModel(model, inputData, normalizationData) {
    const {inputMax, inputMin, labelMin, labelMax} = normalizationData;
  
    // Generate predictions for a uniform range of numbers between 0 and 1;
    // We un-normalize the data by doing the inverse of the min-max scaling
    // that we did earlier.
    const [xs, preds] = tf.tidy(() => {
  
      const xs = tf.linspace(0, 1, 100);
      const preds = model.predict(xs.reshape([100, 1]));
  
      const unNormXs = xs
        .mul(inputMax.sub(inputMin))
        .add(inputMin);
  
      const unNormPreds = preds
        .mul(labelMax.sub(labelMin))
        .add(labelMin);
  
      // Un-normalize the data
      return [unNormXs.dataSync(), unNormPreds.dataSync()];
    });
  
    const predictedPoints = Array.from(xs).map((val, i) => {
      return {x: val, y: preds[i]}
    });
  
    const originalPoints = inputData.map(d => ({
      x: d.horsepower, y: d.mpg,
    }));
  
    tfvis.render.scatterplot(
      {name: 'Model Predictions vs Original Data'},
      {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
      {
        xLabel: 'Horsepower',
        yLabel: 'MPG',
        height: 300
      }
    );
  }
    return(
        <div className="relative w-full">
            {/* {createModel().toJSON()} */}
            {/* {tf.sequential().toJSON()} */}
            {run()}
        </div>
    )
}

export default React.memo(TfTest2)