import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmptyObject, isEmptyStr, isEmptyArray } from "../components/Common/package";
import { ModelSelectModal, HistorySelectModal } from "../components/Common/modal/CommonModal";
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
import { useCallback } from "react";

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
    const [ modelUrl, setModelUrl ] = useState("");

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
                text: "Loss by Epochs"
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: "loss"
                }
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
                        label: "History" + "1",
                        data: history.history.loss,
                        fill: false,
                        backgroundColor: "rgba(78, 115, 223, 0.05)",
                        borderColor: "rgba(78, 115, 223, 1)",
                        pointBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointBorderColor: "rgba(78, 115, 223, 1)",
                        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
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

    const content = useCallback(({ element, children, checkFunction }) => {
        const style = {
            center: {
                "width": "100%",
                "padding": "10px",
                "textAlign": "center",
                "fontSize": "1.25rem",
                "lineHeight": "1.75rem",
                "opacity": "0.6",
            }
        }

        if ( checkFunction( element ) ){
            return (
                <div style={style.center}>
                    <span >No Data</span>
                </div>
            )
        } else {
            return children
        }

    })

    return (
        <>
            <ModelSelectModal
                modalShow={modelModal}
                setModalShow={setModelModal}
                setModelUrl={setModelUrl}
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
                    <Title title="Model Info"/>
                    <Button 
                        className="right"
                        type="button"
                        style={style.btn}
                        onClick={() => {
                            setModelModal(true);
                        }}
                        >
                        Model Select
                    </Button>
                </div>
                <div className={mainStyle.subContainer}>
                    <LayerBoard />
                </div>
            </div>
            <div className={mainStyle.container}>
                <div style={{"display":"flex"}}>
                    <Title title="Setting Info"/>
                    <Button
                        className="right"
                        type="button"
                        style={style.btn}
                        onClick={() => {
                            
                        }}>
                        Setting Select
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
                    {content({
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
                    {content({
                        element: plotData.datasets, 
                        children: <Bubble options={plotOpt} data={plotData}/>,
                        checkFunction: isEmptyArray})}
                </div>
            </div>
        </>
    )
}

const PlotData = ({setPlotData, setOption, ...props}) => {
    const train = useSelector( state => state.train );

    const columns = train.label.concat(train.feature);
    const rowData = {
        ...train.x,
        ...train.y
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