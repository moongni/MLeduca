import React, { useState , useRef , useCallback}from "react";
import { dataActions } from "../../reducers/dataSlice";
import * as tf from "@tensorflow/tfjs";

export const getData = async (url, dispatch, sep=',') => {
    console.log('getData 호출', url);
    dispatch(dataActions.initialize());
    
    var splitUrl = url.split("/")
    var splitFileName = splitUrl[splitUrl.length - 1].split('.');
    var fileExtension = splitFileName[1];
    
    const dataResponse = await fetch(url);
    
    switch (fileExtension){
        case "json":
            const jsonData = await dataResponse.json();
            dispatch(dataActions.setColumns(Object.keys(jsonData[0])));
            Object.keys(jsonData[0]).map(column => {
                const newSample = {
                    [column]: tf.tensor(jsonData.map(sample => sample[column])).reshape([-1, 1])
                }
                dispatch(dataActions.addData(newSample));
            })
            // dispatch(dataActions.addData({
            //     columns:Object.keys(jsonData[0]),
            //     samples:jsonData
            // }));
            break;

        case "csv":
            const csvData = await dataResponse.text();
            const rows = csvData.split((/\r?\n|\r/));
            const features = rows.shift().split(sep);
            dispatch(dataActions.setColumns(features));
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
            features.map(feature => {
                newData[feature] = tf.tensor(newData[feature]).reshape([-1, 1]);
            })
            console.log(newData);
            dispatch(dataActions.setData(newData));
    }
}

export const DrogDropFile = ({dispatch}) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const readFile = (file, type) => {
        var reader = new FileReader();
        reader.onload = async function(e) {
            var contents = e.target.result;
            switch(type){
                case "text/csv":
                  const rows = contents.split((/\r?\n|\r/));
                  const features = rows.shift().split(',');
                  console.log(features);
                  dispatch(dataActions.addColumns(features));
                  rows.forEach(row => {
                      const values = row.split(',');
                      const curObject = new Object();
                      features.forEach((value, key) => {
                          curObject[value] = values[key];
                      })
                      console.log(curObject);
                      dispatch(dataActions.addSample(curObject));
                  })
                  break;            
               case "application/json":
                  const jsonData = await JSON.parse(contents);
                  dispatch(dataActions.addData({
                      columns:Object.keys(jsonData[0]),
                      samples:jsonData
                  }))
              }
          };
        reader.readAsText(file);
    }

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    },[]);

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            var file = e.dataTransfer.files[0];
            readFile(file, file.type);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        let selectFile = {};
        
        if (e.type === "drop"){
            selectFile = e.dataTransfer.files[0];
        } else {
            selectFile = e.target.files[0];
        }
        readFile(selectFile);
    };

    const onButtonClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    }

    return (
        <form className="relative h-64 w-full mb-4 max-w-full text-center"
            onDragEnter={handleDrag}
            onChange={handleChange}>
            <input ref={inputRef} 
                type="file" 
                className="hidden"
                multiple={false} />
            <label className={`h-full flex items-center justify-center border-2 rounded-2xl border-dashed ${dragActive? "bg-white": " bg-slate-100"}`}
                style={{"borderColor":"#cbd5e1"}}
                htmlFor="input-file-upload">
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className="upload-button cursor-pointer p-1 text-base border-none bg-transparent hover:underline"
                    onClick={onButtonClick}>Upload a file</button>
                </div> 
            </label>
            { dragActive && 
            <div className="absolute w-full h-full rounded-2xl top-0 right-0 bottom-0 left-0"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                ></div>}
      </form>
    );
}