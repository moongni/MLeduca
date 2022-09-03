import React, { 
    useState,
    useRef,
    useCallback } from "react";
import style from './drogDropFile.module.css';

export const DrogDropFile = ({children, dispatch, actions, ...props}) => {
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
                  dispatch(actions.setColumns(features));
                  const newData = new Object();
                  features.map(feature => {
                    newData[feature] = [];
                  })
                  rows.forEach(row => {
                      const values = row.split(',');
                      features.forEach((value, key) => {
                          newData[value].push(values[key]);
                      })
                  })
                  dispatch(actions.setData(newData));
                  break;            
               case "application/json":
                  const jsonData = await JSON.parse(contents);
                  dispatch(actions.setColumns(Object.keys(jsonData[0])));
                  Object.keys(jsonData[0]).map(column => {
                    const newSample = {
                        [column]: jsonData.map(sample => sample[column])
                    }
                    dispatch(actions.addData(newSample));
                  })
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
        }}
    , []);

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
        <div className={style.container}>
            <span>
                {props.title}
            </span>
            <form 
                className={style.form}
                onDragEnter={handleDrag}
                onChange={handleChange}
            >
                <input 
                    ref={inputRef} 
                    type="file" 
                    style={{"display":"none"}}
                    multiple={false} 
                />
                <label 
                    className={`${style.label} ${dragActive? "bg-white": " bg-slate-100"}`}
                    htmlFor="input-file-upload"
                >
                    <div>
                        <p>Drag and drop your file here or</p>
                        <button 
                            className={style.button}
                            onClick={onButtonClick}
                        >
                            Upload a file
                        </button>
                    </div> 
                </label>
                { dragActive && 
                    <div 
                        className={style.dragActive}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        />
                }
            </form>
        </div>
    );
}