import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, DrogDropFile } from "../components/LoadData/LoadCsvJson";
import Inputs from "../components/Common/Inputs";
import DictTable from "../components/Common/DictTable";

export default function LoadData() {
    const dispatch = useDispatch();

    const dataInfo = useSelector(state => state.data.info);
    const dataColumns = useSelector(state => state.data.columns);
    const [url, setUrl] = useState("");
    return (
        <>
            <div className="flex  bg-yellow-400 mb-10">
                <Inputs props={{
                    kind: "text",
                    title: "Url",
                    placeholder: "Url 입력",
                    value: url,
                    setValue: setUrl
                }}/>
                <button className="mr-10" type="button" onClick={()=>{getData(url, dispatch, '\t')}}>Fetch</button>
            </div>
            <DrogDropFile dispatch={dispatch}/>
            <DictTable
                props={{
                    data: dataInfo,
                    columns: dataColumns
                }}
            />
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