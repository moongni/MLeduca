import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export async function trainModel(model, inputs, labels, compile, parameter) {
  console.log("set model compile...");
  model.compile({
      ...compile
    })

    console.log("getting train model")
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
  };  