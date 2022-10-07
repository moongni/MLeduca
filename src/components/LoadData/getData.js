export const getData = async (url, dispatch, actions, sep=',', setLoading) => {
    try {
        dispatch(actions.initialize());
        
        setLoading(true);
    
        const dataResponse = await fetch(url);
    
        var splitUrl = url.split("/")
        var splitFileName = splitUrl[splitUrl.length - 1].split('.');
        var fileExtension = splitFileName[1];
        
        switch (fileExtension){
            case "json":
                const jsonData = await dataResponse.json();
                dispatch(actions.setColumns(Object.keys(jsonData[0])));
                Object.keys(jsonData[0]).map(column => {
                    const newColumn = {
                        [column]: jsonData.map(sample => sample[column])
                    };
                    dispatch(actions.addData(newColumn));
                })
                break;
            case "csv":
                const csvData = await dataResponse.text();
                const rows = csvData.split((/\r?\n|\r/));
                const features = rows.shift().split(sep);
                dispatch(actions.setColumns(features));
                const newData = new Object();
                features.map(feature => {
                    newData[feature] = [];
                })
                rows.forEach(row => {
                    const values = row.split(sep);
                    features.forEach((value, key) => {
                        newData[value].push(values[key]);
                    })
                })
                dispatch(actions.setData(newData));
        }

    } catch (e) {
        
        console.log('error', e);
        alert("error : ", e);
    }

    setLoading(false);
}