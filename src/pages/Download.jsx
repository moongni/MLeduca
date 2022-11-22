import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmptyObject } from "../components/Common/module/checkEmpty";
import Title from "../components/Common/title/title";
import { Button } from "../components/Common/button/Button";
import { LocalSave, SaveModal } from "../components/Common/modal/SaveModal";
import { FaFileExport } from "react-icons/fa"
import mainStyle from "../components/Common/component.module.css"

const Download = () => {
    const history = useSelector( state => state.history.info );
    const preprocess = useSelector( state => state.preprocess );
    const setting = useSelector( state => state.setting );

    const [ model, setModel ] = useOutletContext();

    const modelSubmitHandler = async ( event, model, fileName ) => {
        event.preventDefault();

        try {
            const saveResults = await model.save(`downloads://${fileName}`);
        } catch (err) {
            if (err.name == "TypeError") {
                alert("model이 정의되지 않았습니다.");
            }
        }
    }
    
    const locModelSumitHandler = async ( event, model, fileName     ) => {
        event.preventDefault();

        if (isEmptyObject(model)) {
            alert("model이 정의되지 않았습니다.");
            return 0;
        }

        model.save(`localstorage://model/${fileName}`).then( saveResults => {
            alert(`localstorage://model/${fileName} 저장완료`);
            
        })
    }

    const jsonSubmitHandler = ( event, data, fileName ) => {
        event.preventDefault();

        const exportAsFile = ( data, filename ) => {
            const jsonString = `data:text/json;chartset=utf-8,${encodeURIComponent(
                JSON.stringify(data)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = `${filename}.json`;
    
            link.click();
        }
    
        exportAsFile(data, fileName)
    }

    const dataArr = [
        {
            title: "Model",
            isLocalstorage: true,
            data: model,
            submitHandler: modelSubmitHandler,
            locSubmitHandler: locModelSumitHandler
        },
        {
            title: "History",
            data: history,
            submitHandler: jsonSubmitHandler
        },
        {
            title: "Setting",
            data: {
                "preprocess":preprocess,
                "compile": setting.compile,
                "parameter": setting.parameter
            },
            submitHandler: jsonSubmitHandler
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
            {props.isLocalstorage && 
                <LocalSave
                    modalShow={locModShow}
                    setModalShow={setLocModShow}
                    title={props.title}
                    data={props.data}
                    submitHandler={props.locSubmitHandler}/>
            }
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