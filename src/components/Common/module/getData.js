import * as dfd from "danfojs";
import { isEmptyStr } from "./checkEmpty";

export const getData = async (url) => {
    /* 
        parameter
            url: ""
            dispatch: redux dispatch 객체 
            actions: function 값을 redux 변수에 할당하기 위한 함수
            setLoading: loading 컴포넌트를 위한 값

        return
            none
    */
    if (isEmptyStr(url)){
        return {
            isError: true,
            errorData: {
                message: "Url을 입력해주세요",
                statuscode: 0
            }
        }
    }

    const response = await fetch(url)

    if (response.ok) {
        let newData = {};
    
        var splitUrl = url.split("/");
        var splitFileName = splitUrl[splitUrl.length - 1].split('.');
        var fileExtension = splitFileName[1];
    
        switch (fileExtension){
            case "json":
                // const jsonData = await dataResponse.json();
                const jsonDf = await dfd.readJSON(url);
                newData = dfd.toJSON(jsonDf, { format: 'row' });
    
                // dispatch(actions.setColumns(Object.keys(jsonData[0])));
                // Object.keys(jsonData[0]).map(column => {
                //     const newColumn = {
                //         [column]: jsonData.map(sample => sample[column])
                //     };
                //     dispatch(actions.addData(newColumn));
                // })
                break;
            case "csv":
                const csvDf = await dfd.readCSV(url);
                newData = dfd.toJSON(csvDf, { format: 'row' });
                break;
                // const rows = csvData.split((/\r?\n|\r/));
                // const features = rows.shift().split(',');
                // dispatch(actions.setColumns(features));
                
                // const newData = new Object();
                
                // features.map(feature => {
                //     newData[feature] = [];
                // })
    
                // rows.forEach(row => {
                //     const values = row.split(sep);
                //     features.forEach((value, key) => {
                //         newData[value].push(values[key]);
                //     })
                // })
                // dispatch(actions.setData(newData));
            default:
                return {
                    isError: true,
                    errorData: {
                        message: "파일 형식이 맞지 않습니다. json, csv 파일만 지원합니다.",
                        statuscode: 1
                    }
                }
        }

        return {
            isError: false,
            data: newData
        }
    
    } else {
        return {
            isError: true,
            errorData: {
                message: "Unknown",
                statuscode: response.status
            }
        }
    }
}

export const getDtype = (data) => {
    const df = new dfd.DataFrame(data);
    
    const columns = df.columns;
    const dtype = df.dtypes;

    const ret = {};

    if ( columns.length == dtype.length ) {
        for(var i = 0; i < columns.length ; i++) {
            ret[columns[i]] = dtype[i];
        }
    }
    return ret;
}

export const getShape = (data) => {
    return new dfd.DataFrame(data).shape;
}

export const getNData = (data, nData) => {
    const newData = new Object();

    for ( const [ key, value ] of Object.entries(data)) {
        newData[key] = value.slice(0, nData);
    }

    return newData;
}

export const getViewData = ({ nData, data }) => {
    if (nData < 1 && nData > data.shape[1]) {
        return {
            isError: true,
            errorData: {
                message: `0 ~ ${data.shape[1]}사이의 값을 입력해주세요. 현재 값 : ${nData}`,
                statuscode: 3
            }
        }
    }

    const newData = getNData(data.data, nData);

    return {
        isError: false,
        data: {
            ['columns']: data.columns,
            ['data']: newData,
            ['shape']: getShape(newData)
        }
    }
} 