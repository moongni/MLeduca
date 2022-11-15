import React, { useState, useEffect, useCallback } from "react";
import Modal from "./modal";
import { Button } from "../button/Button";
import * as tf from "@tensorflow/tfjs";
import Inputs from "../inputs/Inputs";
import mainStyle from "../component.module.css";
import Title from "../title/title";

export const SaveModal = ({ modalShow, setModalShow, data, ...props }) => {
    const [ fileName, setFileName ] = useState('');
    const [ hovering, setHovering ] = useState(false);
    
    const handleMouseOver = useCallback(() => {
        !hovering &&
        setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering &&
        setHovering(false);
    }, [hovering]);

    const style = {
        container: {
            "height":"14rem"
        },
        btnContainer: {
            "position":"relative",
            "left":"50%",
            "display":"flex",
            "transform":"translateX(-50%)",
            "justifyContent":"center"
        },
        btn: {
            "width":"8rem",
            "margin":"0.5rem",
            "height":"2.5rem"
        },
        inputContainer: {
            "position":"absolute",
            "bottom":"1rem",
            "left":"0",
            "width":"100%",
            "textAlign":"center",
            "alignItems":"center"
        }
    }

    return (
        <Modal
            isShow={modalShow}
        >
            <Title title={props.title}/>
            <div className={`${hovering? "scrollhost":"disViable"} ${mainStyle.subContainer}`}
                style={style.container}
                onMouseLeave={handleMouseOut}
                onMouseEnter={handleMouseOver}
            >
                {JSON.stringify(data)}
            </div>
            <form style={style.inputContainer}
                onSubmit={(e) => props.submitHandler(e, data, fileName)}>
                <Inputs
                    title="file name"
                    kind="text"
                    style={{"paddingLeft":"4rem"}}
                    value={fileName}
                    setValue={setFileName}
                    placeholder="write file name"
                    required={true}
                    />
                <div style={style.btnContainer}> 
                    <Button
                        className="red"
                        style={style.btn}
                        type="button"
                        onClick={() => {
                            setModalShow(false)}}>
                        close
                    </Button>
                    <Button
                        className="green"
                        style={style.btn}
                        type="submit">
                        save
                    </Button>
                </div>
            </form>

        </Modal>
    )
}

export const LocalSave = ({ modalShow, setModalShow, data, ...props }) => {
    const [ fileName, setFileName ] = useState('');
    const [ hovering, setHovering ] = useState(false);
    
    const handleMouseOver = useCallback(() => {
        !hovering &&
        setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering &&
        setHovering(false);
    }, [hovering]);

    const style = {
        container: {
            "height":"14rem"
        },
        btnContainer: {
            "position":"relative",
            "left":"50%",
            "display":"flex",
            "transform":"translateX(-50%)",
            "justifyContent":"center"
        },
        btn: {
            "width":"8rem",
            "margin":"0.5rem",
            "height":"2.5rem"
        },
        inputContainer: {
            "position":"absolute",
            "bottom":"1rem",
            "left":"0",
            "width":"100%",
            "textAlign":"center",
            "alignItems":"center"
        }
    }

    return (
        <Modal
            isShow={modalShow}
        >
            <Title title={props.title}/>
            <div className={`${hovering? "scrollhost":"disViable"} ${mainStyle.subContainer}`}
                style={style.container}
                onMouseLeave={handleMouseOut}
                onMouseEnter={handleMouseOver}
            >
                {JSON.stringify(data)}
            </div>
            <form style={style.inputContainer}
                onSubmit={(e) => props.submitHandler(e, data, fileName)}>
                <Inputs
                    title="file name"
                    kind="text"
                    style={{"paddingLeft":"4rem"}}
                    value={fileName}
                    setValue={setFileName}
                    placeholder="write file name"
                    required={true}
                    />
                <div style={style.btnContainer}> 
                    <Button
                        className="red"
                        style={style.btn}
                        type="button"
                        onClick={() => {
                            setModalShow(false)}}>
                        close
                    </Button>
                    <Button
                        className="green"
                        style={style.btn}
                        type="submit">
                        save
                    </Button>
                </div>
            </form>

        </Modal>
    )
}