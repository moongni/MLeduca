import { isEmptyArray, isEmpty } from "./checkEmpty";

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
