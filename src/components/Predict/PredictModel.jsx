import React, { useState, useEffect} from "react";
import Title from "../Common/title/title";
import { ModelSelectModal } from "../Common/modal/CommonModal";
import { isEmptyStr } from "../Common/package";
import * as tf from "@tensorflow/tfjs";

export const PredictModel = ({ setModel, ...props }) => {
    const [ modalShow, setModalShow ] = useState(false);
    const [ modelUrl, setModelUrl ] = useState("");

    useEffect(() => {
        const initLoad = async () => {
            const modelList = await tf.io.listModels();

            if ( Object.keys(modelList).includes("localstorage://model/recent") ) {
                const model = await tf.loadLayersModel("localstorage://model/recent");
                
                setModel(model);
                setModelUrl("localstorage://model/recent");
            }

        }
        
        initLoad();

    }, [])

    const style = {
        container: {
            display:"inline-block",
            width:"calc(100% - 280px)",
            marginRight: "2.5rem",
            padding:"0 5px",
            textAlign:"left",
            fontSize:"1.25rem",
            lineHeight:"1.75rem",
            opacity:"0.7",
            borderBottom:"solid 2px rgb(203 213 255)",
            cursor: "pointer"
        }
    }

    return (
        <>
            <ModelSelectModal
                modalShow={modalShow}
                setModalShow={setModalShow}
                setModelUrl={setModelUrl}
                setModel={setModel}/>
            <div>
                <Title 
                    title="Selected Model"
                    style={{display:"inline-block",
                            width:"200px"}}
                />
                <div style={style.container}
                    onClick={() => setModalShow(true)}>
                    <span>{!isEmptyStr(modelUrl)? modelUrl: "No Model Data"}</span>
                </div>
            </div>
        </>   
    )
}