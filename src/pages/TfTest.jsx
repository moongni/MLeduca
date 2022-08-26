import React from "react";
import { useSelector } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { createModel } from "../components/TF/CreateModel";
import { convertToTensor } from "../components/TF/ConvertToTensor";
import { trainModel } from "../components/TF/TrainModel";
import { testModel } from "../components/TF/TestModel";

function TfTest() {
    const compile = useSelector((state) => state.compile);
    const parameter = useSelector((state) => state.parameter.info);
    const layers = useSelector((state) => state.layers.info);
    const xs = useSelector((state) => state.train.x);
    const ys = useSelector((state) => state.train.y);
    const data = useSelector((state) => state.data.info);

  async function run() {
    // tfvis.render.scatterplot(
    //   {name: 'Horsepower v MPG'},
    //   {values},
    //   {
    //     xLabel: '',
    //     yLabel: 'MPG',
    //     height: 300
    //   }
    // );

    const model = createModel(layers);
    tfvis.show.modelSummary({name: 'Model Summary'}, model);

    const tensorData = convertToTensor(xs,  ys);
    console.log('convertToTensor 완료');
    const {inputs, labels} = tensorData;

    await trainModel(model, inputs, labels, compile, parameter);
    console.log('Done Training');
    testModel(model, data, tensorData);
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