import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../reducers/dataSlice";

const getData = async ({url, dispatch}) => {
    dispatch(dataActions.initialize());
    console.log('getData 호출');
    const dataResponse = await fetch(url);
    var splitUrl = url.split("/")
    var splitFileName = splitUrl[splitUrl.length - 1].split('.');
    var fileExtension = splitFileName[1];
    switch (fileExtension){
        case "json":
            const dataJson = await dataResponse.json();
            dispatch(dataActions.addData({
                columns:Object.keys(dataJson[0]),
                samples:dataJson
            }));
            break;
        case "csv":
            const DATA_ARRAY = [];
            const dataCsv = await dataResponse.text();
            const rows = dataCsv.split((/\r?\n|\r/));
            const features = rows.shift().split('\t');
            dispatch(dataActions.addColumns(features));
            console.log(features);
            rows.forEach(row => {
                const values = row.split('\t');
                const curObject = new Object();
                features.forEach((value, key) => {
                    curObject[value] = values[key];
                })
                dispatch(dataActions.addSample(curObject));
                DATA_ARRAY.push(curObject);
            })            
    }
}

export default function CSVReader() {
    const dispatch = useDispatch();

    const dataInfo = useSelector(state => state.data.info);
    const dataColumns = useSelector(state => state.data.columns);
    const [url, setUrl] = useState("");

    console.log('csv 리렌더링');

    return (
        <>
        <div className="flex justify-between items-center h-14 w-full bg-yellow-400">
            <label className="ml-10" htmlFor={'csv url'}>
                {'Url'}
            </label>
            <input className="mx-10 w-full border-2 border-black" 
                name={'Url'}
                type={'text'}
                value={url}
                onChange={(e) => {
                    let { value } = e.target;
                    setUrl(value)
                }}/> 
            <button className="mr-10" type="button" onClick={()=>{getData({"url": url, "dispatch":dispatch})}}>Fetch</button>
        </div>
        { dataInfo.length > 0 && 
            <table>
                <thead>
                <tr key={"column"}>
                    {dataColumns.map((column) => (
                    <th>{column}</th>
                    ))}
                </tr>
                </thead>
    
                <tbody>
                    {dataInfo.map((items, idx) => {
                        return (
                            <tr key={idx}>
                                {
                                    dataColumns.map((column) => {
                                        return (
                                            <td >
                                                {items[column]}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                    )})}
                </tbody>
            </table>
    }
        </>
    );
    }

// const DragAndDrop = () => {
//     const GREY = '#CCC';
//     const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
//     const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
//     const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
//     DEFAULT_REMOVE_HOVER_COLOR,
//     40
//     );
//     const GREY_DIM = '#686868';
//     const styles = {
//     zone: {
//         alignItems: 'center',
//         border: `2px dashed ${GREY}`,
//         borderRadius: 20,
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100%',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     file: {
//         background: 'linear-gradient(to bottom, #EEE, #DDD)',
//         borderRadius: 20,
//         display: 'flex',
//         height: 120,
//         width: 120,
//         position: 'relative',
//         zIndex: 10,
//         flexDirection: 'column',
//         justifyContent: 'center',
//     },
//     info: {
//         alignItems: 'center',
//         display: 'flex',
//         flexDirection: 'column',
//         paddingLeft: 10,
//         paddingRight: 10,
//     },
//     size: {
//         backgroundColor: GREY_LIGHT,
//         borderRadius: 3,
//         marginBottom: '0.5em',
//         justifyContent: 'center',
//         display: 'flex',
//     },
//     name: {
//         backgroundColor: GREY_LIGHT,
//         borderRadius: 3,
//         fontSize: 12,
//         marginBottom: '0.5em',
//     },
//     progressBar: {
//         bottom: 14,
//         position: 'absolute',
//         width: '100%',
//         paddingLeft: 10,
//         paddingRight: 10,
//     },
//     zoneHover: {
//         borderColor: GREY_DIM,
//     },
//     default: {
//         borderColor: GREY,
//     },
//     remove: {
//         height: 23,
//         position: 'absolute',
//         right: 6,
//         top: 6,
//         width: 23,
//     },
//     };
//     const { CSVReader } = useCSVReader();
//     const [zoneHover, setZoneHover] = useState(false);
//     const [removeHoverColor, setRemoveHoverColor] = useState(
//         DEFAULT_REMOVE_HOVER_COLOR
//     );
    

// }
//     {/* <CSVReader
//     onUploadAccepted={(results) => {
//         console.log('---------------------------');
//         console.log(results);
//         setFeature(results.data[0]);
//         setUrl(results.data.shift());
//         console.log('---------------------------');
//         console.log(results.data);
//         console.log(results.data.shift());
//         setZoneHover(false);
//     }}
//     onDragOver={(event) => {
//         event.preventDefault();
//         setZoneHover(true);
//     }}
//     onDragLeave={(event) => {
//         event.preventDefault();
//         setZoneHover(false);
//     }}
//     >
//     {({
//         getRootProps,
//         acceptedFile,
//         ProgressBar,
//         getRemoveFileProps,
//         Remove,
//     }) => (
//         <>
//         <div>
            
//         </div>
//         <div
//             {...getRootProps()}
//             style={Object.assign(
//             {},
//             styles.zone,
//             zoneHover && styles.zoneHover
//             )}
//         >
//             {acceptedFile ? (
//             <>
//                 <div style={styles.file}>
//                 <div style={styles.info}>
//                     <span style={styles.size}>
//                     {formatFileSize(acceptedFile.size)}
//                     </span>
//                     <span style={styles.name}>{acceptedFile.name}</span>
//                 </div>
//                 <div style={styles.progressBar}>
//                     <ProgressBar />
//                 </div>
//                 <div
//                     {...getRemoveFileProps()}
//                     style={styles.remove}
//                     onMouseOver={(event) => {
//                     event.preventDefault();
//                     setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
//                     }}
//                     onMouseOut={(event) => {
//                     event.preventDefault();
//                     setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
//                     }}
//                 >
//                     <Remove color={removeHoverColor} />
//                 </div>
//                 </div>
//             </>
//             ) : (
//             'Drop CSV file here or click to upload'
//             )}
//         </div>
//         </>
//     )}
//     </CSVReader> */}