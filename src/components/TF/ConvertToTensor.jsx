import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs";

export const mkConTensor = (data) => {
  const df = new dfd.DataFrame(data);
  const tensorData = df.tensor;
  // const tensorData = Object.entries(data).map(items => (
  //   tf.tensor({value:items[1], dtype:"float32"}).reshape([-1, 1])
  // ))
  // return tf.concat(tensorData, 1);
  return tensorData;
}

export function convertToTensor(xs, ys) {
    console.log('Convert Array To Tensor');
  
    return tf.tidy(() => {
      // 텐서로 데이터 변환
      const inputTensor = mkConTensor(xs);
      const labelTensor = mkConTensor(ys);
  
      return {
        features: inputTensor,
        labels: labelTensor,
      }
    })
  }
  