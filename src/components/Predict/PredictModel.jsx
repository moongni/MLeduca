import React from "react";
import { useState } from "react";
import Title from "../Common/title/title";
import { ModelSelectModal } from "../Common/modal/CommonModal";

export const PredictModel = ({model, ...props}) => {
    const [ modalShow, setModalShow ] = useState(false);

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
            <div>
                <Title 
                    title="Selected Model"
                    style={{display:"inline-block",
                            width:"200px"}}
                />
                <div style={style.container}
                    onClick={() => setModalShow(true)}
                >
                    <span>{model? model: "No Model Data"}</span>
                </div>
            </div>
            <ModelSelectModal
                modalShow={modalShow}
                setModalShow={setModalShow}/>
        </>   
    )
}