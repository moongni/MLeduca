import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { input } from "@tensorflow/tfjs";

function TfTest() {
    const compile = useSelector((state) => state.compile.info);
    const sequenceLayers = useSelector((state) => state.sequenceLayers.info);
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
  }


  function createModel() {
    console.log('createModel 호출');
    // model sequence 
    const model = tf.sequential();

    sequenceLayers.map(layer => {
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
      optimizer: compile.filter(info => info.title == 'optimizer')[0].name,
      loss: compile.filter(info => info.title == 'loss')[0].name,
    })

    // const batchSize = 32;
    // const epochs = 50;

    return await model.fit(inputs, labels, {
      batchSize:parameter.filter(param => param.title == "batchSize")[0].name,
      epochs:parameter.filter(param => param.title == "epochs")[0].name,
      shuffle: true,
      callbacks: tfvis.show.fitCallbacks(
        { name: 'Training Performance'},
        ['loss', 'mse'],
        { height: 200, callbacks: ['onEpochEnd']}
      )
    })
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