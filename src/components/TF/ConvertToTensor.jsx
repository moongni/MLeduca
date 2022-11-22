import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs";
import { getDtype } from "../Common/module/getData";

export const mkConTensor = (data) => {
  const tensorData = Object.entries(data).map((items) => (
    tf.tensor(items[1]).reshape([-1, 1])
  ))

  return tf.concat(tensorData, 1);
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
  