import React from "react";
import { Button } from "../components/Common/button/Button";
import mainStyle from "../components/Common/component.module.css"
import Title from "../components/Common/title/title";
import { FaFileExport } from "react-icons/fa"
import { useState } from "react";
import { SaveModal } from "../components/Common/modal/SaveModal";
import { useSelector } from "react-redux";

const Download = () => {
    const history = useSelector( state => state.history.info );
    const preprocess = useSelector( state => state.preprocess );
    const compile = useSelector( state => state.compile );
    const parameter = useSelector( state => state.parameter );

    const dataArr = [
        {
            title: "Model",
            isLocalstorage: true,
        },
        {
            title: "History",
            data: {
                "history": history
            }
        },
        {
            title: "Compiler Setting",
            data: {
                "preprocess":preprocess,
                "compile":compile,
                "parameter":parameter
            }
        }
    ]

    const style = {
        container: {
            "position":"fixed",
            "left":"50%",
            "top":"50%",
            "width":"500px",
            "minHeight":"400px",
            "height":"400px",
            "transform":"translate(-50%, -50%)"
        },
        subContainer: {
            "height":"calc(100% - 1.25rem - 32px)",
            "alignItems":"center",
            "textAlign":"center",
            "fontSize":"1.25rem",
            "lineHeight":"1.75rem",
        }
    }
    return (
        <div className={mainStyle.container}
            style={style.container}>
            <Title title="Download" icon={<FaFileExport/>}/>
            <div className={mainStyle.subContainer}
                style={style.subContainer}
            >
                {dataArr.map(data => <DownloadList {...data}/>)}
            </div>
        </div>
    )
}

const DownloadList = ({ ...props }) => {
    const [ modalShow, setModalShow ] = useState(false);
    const [ locModShow, setLocModShow ] = useState(false);
    
    const style = {
        container: {
            "display":"flex",
            "justifyContent":"space-between",
            "margin":"2.5rem 0"
        },
        btnContainer: {
            "display":"flex",
            "fontSize":"1rem",
            "lineHeight":"1.5rem"
        },
        btn: {
            "marginRight":"1rem"
        }
    }

    return (
        <>
            <SaveModal
                modalShow={modalShow}
                setModalShow={setModalShow}
                {...props}/>
            <div style={style.container}>
                <p>{props.title}</p>
                <div style={style.btnContainer}>
                    {props.isLocalstorage &&
                        <Button
                        className="underline"
                        style={style.btn}
                        type="button"
                        onClick={() => setLocModShow(true)}
                        >
                            localstorage
                        </Button>
                    }
                    <Button
                        className="underline"
                        style={style.btn}
                        type="button"
                        onClick={() => setModalShow(true)}
                    >
                        export 
                    </Button>
                </div>
            </div>
        </>
    )
}
export default Download;