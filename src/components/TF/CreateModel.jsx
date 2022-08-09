import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export const createModel = (layers) => {
    console.log('Create layers...');
    // model sequence 
    const model = tf.sequential();
  
    layers.map(layer => {
      model.add(tf.layers.dense(layer.info));
    })
  
    return model;
}