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