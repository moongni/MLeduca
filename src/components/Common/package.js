export const isEmptyObject = (param) => {
    return Object.keys(param).length === 0 && param.constructor === Object;
}

export const isEmptyArray = (param) => {

    return Array.isArray(param) && !param.length
}

export const isEmpty = (param) => {

    return typeof param == "undefined" || param == null
}

export const toOption = (items) => {
    const newOptions = [];

    !isEmptyArray(items) && !isEmpty(items) &&
    items.map(item => newOptions.push({
        label: item,
        value: item
    }))
    return newOptions
}

export const toArray = (options) => {
    const newArray = [];
    !isEmptyArray(options) && !isEmpty(options) &&
    options.map(option => newArray.push(option.value));
    return newArray;
}
