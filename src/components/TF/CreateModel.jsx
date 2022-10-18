import * as tf from "@tensorflow/tfjs";

export const createModel = (layers) => {
    console.log('Create layers');

    if ( layers.isModel ) {
      // model
      const input = tf.input({...layers.info[0].info})
      const output = layers.info.slice(1).reduce(( preVal, val ) => {
        return tf.layers.dense({...val.info}).apply(preVal);
      }, input)

      const model = tf.model({inputs: input, outputs: output});

      console.log("model",model);

      return model

    } else {
      // sequence
      const model = tf.sequential();

      layers.info.map(layer => {
        model.add(tf.layers.dense(layer.info));
      })
      
      console.log("model",model);

      return model

    }
    
}

export const createOptimizer = (optimizer) => {
  const learningRate = optimizer.value.learningRate;
  switch(optimizer.title){

    case "sgd":
      return tf.train.sgd(learningRate);

    case "momentum":
      var momentum = optimizer.value.momentum;
      var useNesterov = optimizer.value.useNesterov;
      return tf.train.momentum(learningRate, momentum, useNesterov);
    
    case "adagrad":
      var initialAccumulatorValue = optimizer.value.initialAccumulatorValue;
      return tf.train.adagrad(learningRate, initialAccumulatorValue);
    
    case "adadelta":
      var rho = optimizer.value.rho
      var epsilon = optimizer.value.epsilon;
      return tf.train.adadelta(learningRate, rho, epsilon);

    case "adam":
      var beta1 = optimizer.value.beta1;
      var beta2 = optimizer.value.beta2;
      var epsilon = optimizer.value.epsilon;
      return tf.train.adam(learningRate, beta1, beta2, epsilon);

    case "adamax":
      var beta1 = optimizer.value.beta1;
      var beta2 = optimizer.value.beta2;
      var epsilon = optimizer.value.epsilon;
      var decay = optimizer.value.decay;
      return tf.train.adamax(learningRate, beta1, beta2, epsilon, decay);

    case "rmsprop":
      var decay = optimizer.value.decay;
      var momentum = optimizer.value.momentum;
      var epsilon = optimizer.value.epsilon;
      var centered = optimizer.value.centered;
      return tf.train.rmsprop(decay, momentum, epsilon, centered);

  }
}
