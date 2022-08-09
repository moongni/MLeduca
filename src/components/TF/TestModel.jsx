import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export function testModel(model, inputData, normalizationData) {
  console.log("getting start test");
    const {inputMax, inputMin, labelMin, labelMax} = normalizationData;
    // Generate predictions for a uniform range of numbers between 0 and 1;
    // We un-normalize the data by doing the inverse of the min-max scaling
    // that we did earlier.
    const [xs, preds] = tf.tidy(() => {
      console.log("predict labels using data");
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
      x : d.Horsepower, y: d.Miles_per_Gallon
    }))
    
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
