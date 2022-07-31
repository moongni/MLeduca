import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { input } from "@tensorflow/tfjs";

function TfTest() {
    const compile = useSelector((state) => state.compile.info);
    const layers = useSelector((state) => state.layers.info);
    const parameter = useSelector((state) => state.parameter.info);

    async function getData() {
    const carsDataResponse = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
    const carsData = await carsDataResponse.json();
    const cleaned = carsData.map(car => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter(car => (car.mpg != null && car.horsepower != null));
  
    return cleaned;
  }

  async function run() {
    const data = await getData();
    const values = data.map(d => ({
      x: d.horsepower,
      y: d.mpg,
    }));
    tfvis.render.scatterplot(
      {name: 'Horsepower v MPG'},
      {values},
      {
        xLabel: 'Horsepower',
        yLabel: 'MPG',
        height: 300
      }
    );

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
      console.log(layer.info);
      model.add(tf.layers.dense(layer.info));
    })
    // model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
    // model.add(tf.layers.dense({units: 1, useBias: true}));
  
    return model;
  }

  function convertToTensor(data) {
    console.log('convertToTensor 호출');
    return tf.tidy(() => {
      // 1. 데이터 셔플
      tf.util.shuffle(data);

      // 2. 텐서로 데이터 변환
      const inputs = data.map(d => d.horsepower);
      const labels = data.map(d => d.mpg);

      const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
      const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

      // 3. 정규화
      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();

      const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
      
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

export default React.memo(TfTest)