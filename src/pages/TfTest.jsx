import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

function TfTest() {
    const [currentTab, setCurrentTab] = useState('1');
    const modelInfo = useSelector((state) => state.modelInfo.info);
    const sequence = useSelector((state) => state.sequence.info);

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
  }


  function createModel() {
    const model = tf.sequential();
    // sequence.map(layer => {
    //   model.add(tf.layers.dense(layer.info));
    // })
    model.add(tf.layers.dense({units:1, inputShape:[1], useBias: true}));

    // model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
    // model.add(tf.layers.dense({units: 1, useBias: true}));
  
    return model;
  }

    
    return(
        <div className="relative w-full">
            {createModel().toJSON()}
            {/* {tf.sequential().toJSON()} */}
            {/* {run()} */}
        </div>
    )
}

export default TfTest