import * as dfd from "danfojs";

export const isEmptyObject = ( param ) => {
    return Object.keys(param).length === 0 && param.constructor === Object;
}

export const isEmptyArray = ( param ) => {

    return Array.isArray(param) && !param.length
}

export const isEmpty = ( param ) => {
    return typeof param === "undefined" || param === null;
}

export const isEmptyStr = ( param ) => {
    return isEmpty(param) || param === "";
}

export const toOption = ( items ) => {
    const newOptions = [];

    if( !isEmptyArray(items) && !isEmpty(items) ){
        items.map(item => newOptions.push({
            label: item,
            value: item
        }))
    }
    return newOptions
}

export const toArray = ( options ) => {
    const newArray = [];
    
    if( !isEmptyArray(options) && !isEmpty(options) ){
        options.map(option => newArray.push(option.value));
    }

    return newArray;
}

export const makeRangeArray = ( start=0, end ) => {
    var num = end - start
    let newArray = new Array(num);
    for (var i = 0; i < num; i ++) {
        newArray[i] = start;
        start++;
    }

    return newArray;
}

export const selectColumn = ( data, columns ) => {
    const newData = new Object();

    columns.map(column => {
        newData[column] = data[column]; 
    })

    return newData;
}

export const contentView = ({ element, children, checkFunction }) => {
    const style = {
        center: {
            "width": "100%",
            "padding": "10px",
            "textAlign": "center",
            "fontSize": "1.25rem",
            "lineHeight": "1.75rem",
            "opacity": "0.6",
        }
    }
    
    if ( checkFunction( element ) ){
        return (
            <div style={style.center}>
                <span >No Data</span>
            </div>
        )
    } else {
        return children
    }
    
}

export const getData = async (url, dispatch, actions) => {
    /* 
        parameter
            url: ""
            dispatch: redux dispatch 객체 
            actions: function 값을 redux 변수에 할당하기 위한 함수
            setLoading: loading 컴포넌트를 위한 값

        return
            none
    */

    try {
        dispatch(actions.initialize());
        
        // const dataResponse = await fetch(url);
        
        let newData = {};

        var splitUrl = url.split("/")
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
                newData = dfd.toJSON(csvDf, { format: 'row' })

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
        }
        
        dispatch(actions.setColumns(Object.keys(newData)));

        dispatch(actions.setData(newData));

    } catch (e) {

        alert(e);
        
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
    return new dfd.DataFrame(data).shape.reverse();
}

export const getNData = (data, nData) => {
    const newData = new Object();

    for ( const [ key, value ] of Object.entries(data)) {
        newData[key] = value.slice(0, nData);
    }

    return newData;
}