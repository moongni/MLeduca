import React from "react";
import { useState } from "react";
import { Button } from "../Common/button/Button";
import { Modal } from "../Common/modal/modal";
import Title from "../Common/title/title";

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
            <Modal
                isShow={modalShow}
                label="Model Select"
            >
                <p>Model List</p>
                <div style={{"position":"relative",
                            "left":"50%",
                            "display":"flex",
                            "transform":"translateX(-50%)",
                            "justifyContent":"center"}}
                > 
                    <Button
                        className="red"
                        style={{"width":"8rem",
                                "margin":"0.5rem",
                                "height":"2.5rem"}}
                        type="button"
                        onClick={() => setModalShow(false)}>
                        close
                    </Button>
                    <Button
                        className="green"
                        style={{"width":"8rem",
                                "margin":"0.5rem",
                                "height":"2.5rem"}}
                        type="button"
                        onClick={() => {}}>
                        save
                    </Button>
                </div>
            </Modal>
        </>   
    )
}