export const makeRangeArray = ( start, end ) => {
    if (start > end){
        return [];
    }

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

export const hashMap = (data) => {
    var hashmap = data.reduce(( acc, val ) => {
        acc[val] = ( acc[val] || 0 ) + 1;
        
        return acc; 
    }, {})

    return hashmap;
}