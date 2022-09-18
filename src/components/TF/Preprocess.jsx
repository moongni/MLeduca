import * as dfd from "danfojs"

const preprocessOption = {
  STARDARDSCALE: "stardardScale",
  NORMALIZE: "normalize",
  FILLMEAN: "fillMean",
  FILLMEDIAN: "fillMedian",
  FILLEMOSTFREQUNCE: "fillMostFrequnce",
  ONEHOTENCODING: "oneHotEncoding"
}


export function preprocess(data, process) {
  /*
    parameter
      data: dataSlice.info
      process: upreprocessingSlice.info

    return
      process 내부에 있는 컬럼으로만 이루어진 data(dataSlice.info와 구조 동일) 반환
  */

  const selectColumn = (data, columns) => {
    const newData = new Object();

    columns.map(column => {
        newData[column] = data[column]; 
    })

    return newData;
  }

  // const nullToNaN = (data, columns) => {
  //   for (const column of columns) {
  //     data[column] = data[column].map(value => {
  //       return (value == null ? NaN : value)
  //     })
  //   }
  // }


  function stardardScale(dataFrame, column) {    
    const scaler = new dfd.StandardScaler();

    scaler.fit(dataFrame[column]);

    dataFrame[column] = scaler.transform(dataFrame[column]).values;
  }

  function minMaxNormalize(dataFrame, column) {
    function normalizeAlgorithm(x) {
      return (x - min) / (max - min)
    }

    const max = dataFrame[column].max();
    const min = dataFrame[column].min();

    dataFrame[column] = dataFrame[column].map(normalizeAlgorithm).values;
  }

  async function fillMean(dataFrame, column) {
    const mean = dataFrame[column].mean();

    dataFrame[column] = dataFrame[column].fillNa(mean).values;
  }

  function fillMedian(dataFrame, column) {
    const median = dataFrame[column].median();

    dataFrame[column] = dataFrame[column].fillNa(median).values;
  }
  
  function fillMostFrequnce(dataFrame, column) {
    var series = dataFrame.column(dataFrame.columns[0]);
    series.valueCounts(); // Row index must contain unique values Error!
  }

  function oneHotEncoding(dataFrame, column) {
    const encode = new dfd.OneHotEncoder();

    encode.fit(dataFrame[column]);

    const sf_enc = encode.transform(dataFrame[column].values);

    const encodedDataFrame = new dfd.DataFrame(sf_enc);

    dataFrame.drop({ columns: [column], inplace: true });

    const newDataFrame = dfd.concat({ dfList: [dataFrame, encodedDataFrame], axis: 1 });

    return newDataFrame
  }

  var selectedData = selectColumn(data, Object.keys(process));
  var dataFrame = new dfd.DataFrame(selectedData);

  for (const [key, value] of Object.entries(process)) {

    if (value.length != 0) {

      for (const preprocess of value) {
        if (preprocess == preprocessOption.STARDARDSCALE)
          stardardScale(dataFrame, key);
        if (preprocess == preprocessOption.NORMALIZE)
          minMaxNormalize(dataFrame, key);
        if (preprocess == preprocessOption.FILLMEAN)
          fillMean(dataFrame, key);
        if (preprocess == preprocessOption.FILLMEDIAN)
          fillMedian(dataFrame, key);
        if (preprocess == preprocessOption.FILLEMOSTFREQUNCE)
          fillMostFrequnce(dataFrame, key);
        if (preprocess == preprocessOption.ONEHOTENCODING)
          dataFrame = oneHotEncoding(dataFrame, key);
      }

    }

  }

  const jsonData = dfd.toJSON(dataFrame, {
    format: "row"
  });
  
  return jsonData
}