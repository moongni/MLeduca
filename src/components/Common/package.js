export const isEmptyObject = (param) => {
    return Object.keys(param).length === 0 && param.constructor === Object;
}

export const isEmptyArray = (param) => {

    return Array.isArray(param) && !param.length
}

export const isEmpty = (param) => {
    return typeof param === "undefined" || param === null;
}

export const isEmptyStr = (param) => {
    return isEmpty(param) || param === "";
}

export const toOption = (items) => {
    const newOptions = [];
    if( !isEmptyArray(items) && !isEmpty(items) ){
        items.map(item => newOptions.push({
            label: item,
            value: item
        }))
    }
    return newOptions
}

export const toArray = (options) => {
    const newArray = [];
    if( !isEmptyArray(options) && !isEmpty(options) ){
        options.map(option => newArray.push(option.value));
    }
    return newArray;
}

export const makeRangeArray = (start=0, end) => {
    var num = end - start
    let newArray = new Array(num);
    for (var i = 0; i < num; i ++) {
        newArray[i] = start;
        start++;
    }

    return newArray;
}

export const selectColumn = (data, columns) => {
    const newData = new Object();

    columns.map(column => {
        newData[column] = data[column]; 
    })

    return newData;
}