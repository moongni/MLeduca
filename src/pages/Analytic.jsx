import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmptyObject, isEmptyStr, isEmptyArray, contentView } from "../components/Common/package";
import { ModelSelectModal, HistorySelectModal } from "../components/Common/modal/modal";
import Title from "../components/Common/title/title";
import { LayerBoard, SettingBoard } from "../components/ModelDashBoard/Board";
import { Loader } from "../components/Common/loader/Loader";
import mainStyle from "../components/Common/component.module.css";
import { Bubble, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as TitleJS,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Button } from "../components/Common/button/Button";
import Inputs from "../components/Common/inputs/Inputs";
import { useOutletContext } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TitleJS,
    Tooltip,
    Legend
  );

const Analytic = () => {
    const history = useSelector( state => state.history.info );
    
    const [ isLoading, setLoading ] = useState(false);
    const [ modelModal, setModelModal ] = useState(false);
    const [ historyModal, setHistoryModal ] = useState(false);
    const [ model, setModel ] = useOutletContext();
    
    const [ histData, setHistData ] = useState({
        datasets: []
    });
    const [ plotData, setPlotData ] = useState({
        datasets: []
    });
    const [ plotOpt, setPlotOpt ] = useState({});

    const histOpt = {
        reponsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "History by Epochs"
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            x: {
                type: 'linear',
                display: true,
                title: {
                    display: true,
                    text: "epoch"
                }
            }
        }
    }

    useEffect(() => {
        if ( !isEmptyObject(history) ) {
            setHistData({
                labels: history.epoch,
                datasets: [
                    {
                        label: "loss",
                        data: history.history.loss,
                        fill: false,
                        backgroundColor: "rgba(78, 115, 223, 0.05)",
                        borderColor: "rgba(78, 115, 223, 1)",
                        pointBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointBorderColor: "rgba(78, 115, 223, 1)",
                        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                    },
                    {
                        label: "accuracy",
                        data: history.history.acc,
                        fill: false,
                        backgroundColor: "rgba(255, 99, 71, 0.05)",
                        borderColor: "rgba(255, 99, 71, 1)",
                        pointBackgroundColor: "rgba(255, 99, 71, 1)",
                        pointBorderColor: "rgba(255, 99, 71, 1)",
                        pointHoverBackgroundColor: "rgba(255, 99, 71, 1)",
                        pointHoverBorderColor: "rgba(255, 99, 71, 1)",
                    }
                ]
            });
        }
    }, [ history ])

    const style = {
        loadingStyle: {
            "position":"fixed",
            "top":"0",
            "left":"0",
            "width":"100vw",
            "height":"100vw",
            "backgroundColor":"gray",
            "opacity":"0.3",
            "zIndex":"100"
        },
        btn: {
            "alignText":"center",
            "marginLeft":"auto"
        }
    }

    return (
        <>
            <ModelSelectModal
                modalShow={modelModal}
                setModalShow={setModelModal}
                setLoading={setLoading}/>
            <HistorySelectModal
                modalShow={historyModal}
                setModalShow={setHistoryModal}/>
            {isLoading &&
                <div style={style.loadingStyle}>
                    <Loader 
                        type="spin" 
                        color="black" 
                        message={"training..."}
                        style={{"position":"fixed"}}/>
                </div>
            }
            <div className={mainStyle.container}>
                <div style={{"display":"flex"}}>
                    <Title title="모델 정보"/>
                    <Button 
                        className="right"
                        type="button"
                        style={style.btn}
                        onClick={() => {
                            setModelModal(true);
                        }}
                        >
                        모델 선택
                    </Button>
                </div>
                <div className={mainStyle.subContainer}>
                    <LayerBoard />
                </div>
            </div>
            <div className={mainStyle.container}>
                <div style={{"display":"flex"}}>
                    <Title title="설정 정보"/>
                    <Button
                        className="right"
                        type="button"
                        style={style.btn}
                        onClick={() => {
                            
                        }}>
                        설정 선택
                    </Button>
                </div>
                <div className={mainStyle.subContainer}>
                    <SettingBoard/>
                </div>
            </div>
            <div className={mainStyle.container}>
                <div style={{"display":"flex"}}>
                    <Title title="History"/>
                    <Button 
                        className="right"
                        type="button"
                        style={style.btn}
                        onClick={() => {
                            setHistoryModal(true);
                        }}
                        >
                        History Select
                    </Button>
                </div>
                <div className={mainStyle.subContainer}>
                    {contentView({
                        element: histData.datasets, 
                        children:<Line options={histOpt} data={histData}/>, 
                        checkFunction: isEmptyArray})}
                </div>
            </div>
            <div className={mainStyle.container}>
                <Title title="Data Set"/>
                <PlotData
                    setPlotData={setPlotData}
                    setOption={setPlotOpt}/>
                <div className={mainStyle.subContainer}>
                    {contentView({
                        element: plotData.datasets, 
                        children: <Bubble options={plotOpt} data={plotData}/>,
                        checkFunction: isEmptyArray})}
                </div>
            </div>
        </>
    )
}

const PlotData = ({setPlotData, setOption, ...props}) => {
    const trainSet = useSelector( state => state.train );

    const columns = trainSet.label.columns.concat(trainSet.feature.columns);
    const rowData = {
        ...trainSet.feature.data,
        ...trainSet.label.data
    }

    const [ xTick, setXTick ] = useState("");
    const [ yTick, setYTick ] = useState("");
    
    useEffect( () => {
        if ( !isEmptyStr(xTick) && !isEmptyStr(yTick) ){
            setOption({
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: yTick
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: xTick
                        }
                    }
                }
            })
            
            setPlotData({                    
                datasets: [
                    {
                        label: "Data",
                        data: Array.from(rowData[xTick], 
                            ( element, index ) => ({
                                x: rowData[xTick][index],
                                y: rowData[yTick][index],
                                r: 5
                            })),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    // {
                    //     label: yTick,
                    //     data: Array.from(rowData[yTick],
                    //         ( element, index )=> ({
                    //             x: rowData[xTick][index],
                    //             y: element,
                    //             r: 5
                    //         })),
                    //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    // }
                ]
            });
        }

    }, [ xTick, yTick ])

    return (
        <>
            <div style={{"display":"flex"}}>
                <Inputs
                    title="x-ticks"
                    kind="selectOne"
                    value={xTick}
                    setValue={setXTick}
                    default={""}
                    defaultName={"select x-ticks"}
                    list={columns}
                />
                <Inputs
                    title="y-ticks"
                    kind="selectOne"
                    value={yTick}
                    setValue={setYTick}
                    default={""}
                    defaultName={"select y-ticks"}
                    list={columns}
                />
            </div>
        </>
    )
}

export default Analytic;