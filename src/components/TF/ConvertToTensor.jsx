import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export function convertToTensor(xs, ys) {
    console.log('Convert Array To Tensor...');
  
    return tf.tidy(() => {
      // 1. 데이터 셔플
      // tf.util.shuffle();
  
      // 2. 텐서로 데이터 변환
      const inputs = xs;
      const labels = ys;
      const inputTensor = tf.tensor(inputs);
      const labelTensor = tf.tensor(labels);
  
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
  