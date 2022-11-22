import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNav } from "../../Common/singlePageNav/useNav";
import { isEmptyArray } from "../../Common/module/checkEmpty";
import Inputs from "../../Common/inputs/Inputs";
import Title from "../../Common/title/title";
import Tabs from "../../Common/tab/Tabs"
import { LayerList } from "./LayerList";
import { AdvancedSettingButton, Button } from "../../Common/button/Button";
import { settingActions } from "../../../reducers/settingSlice";
import { AiOutlineControl } from "react-icons/ai";
import data from "../../../data/data.json"
import style from "../../Common/component.module.css";

function Layers() {
    const dispatch = useDispatch();

    const [ currentTab, setCurrentTab ] = useState('1');
    const [ disabled, setDisabled ] = useState(false);

    const layers = useSelector(state => state.setting.layer);
    const layerRef = useNav("Layer");

    function tapContent(currentTab) {
        const curContent = data.Layers.filter(tab => `${tab.id}` == currentTab)
        switch (curContent[0].title) {
            case "Sequence":
                return <Sequence info={curContent[0].info} icon={<AiOutlineControl/>} disabled={disabled} setDisabled={setDisabled}/>                
            case "Model":
                return <Model info={curContent[0].info} icon={<AiOutlineControl/>} disabled={disabled} setDisabled={setDisabled}/>
        }
    }


    const handleRemove = async (idx) => {
        setDisabled(true);
        dispatch(settingActions.removeLayer(idx))
        dispatch(settingActions.reIndexing())
        setDisabled(false);
    }
    
    return(
        <div 
            className={style.container}
            ref={layerRef}
            id="layerContainer"
        >
            <Title title="레이어 구성" icon={<AiOutlineControl/>}/>
            <Tabs 
                currentTab={currentTab} 
                setCurrentTab={setCurrentTab} 
                tabData={data.Layers}
            />
            <div>
                {tapContent(currentTab)}
            </div>
            {!isEmptyArray(layers.info) &&
                <>
                    <Title title="레이어 테이블"/>
                    <div className={style.subContainer}>
                        <LayerList 
                            style={{"maxHeight":"24rem"}}
                            data={layers.info}
                            isModel={layers.isModel}
                            isHandleRemove={true}
                            handleRemove={handleRemove}/>
                    </div>
                </>
            }
        </div>
    )
}

export default Layers

function Model({icon, disabled, setDisabled, ...props}) {
    const dispatch = useDispatch();

    const [value, setValue] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);

        dispatch(settingActions.addModel(value))
        setDisabled(false);        
    }

    return (
        <div>
            <form
                className={style.subContainer}
                onSubmit={handleSubmit}
            >
                {props.info.filter(n => n.name === "mainParams")[0].params
                    .map( info => (
                        <Inputs
                            {...info}
                            value={value}
                            setValue={setValue}/>
                ))}
                <Button
                    className="green center"
                    style={{"width":"100%", "marginTop":"1.25rem"}}
                    type="submit"
                    disabled={disabled}>
                    Add Layer
                </Button>
            </form>
        </div>
    )
}


function Sequence({icon, disabled, setDisabled, ...props}) {
    const dispatch = useDispatch();

    const [ isSubOpen, setSubOpen ] = useState(false);
    const [ value, setValue ] = useState({});

    const handleSubmit = async (event) =>{
        setDisabled(true);
        event.preventDefault();
        dispatch(settingActions.addLayer(value));
        setDisabled(false);
    }

    return(
        <div >
            <form
                className={style.subContainer} 
                onSubmit={handleSubmit}
            >
                {props.info.filter((n)=> n.name === "mainParams")[0].params
                    .map(v => (
                        <Inputs 
                            {...v}
                            value={value}
                            setValue={setValue}/>
                ))}
                <AdvancedSettingButton
                    style={{"marginTop":"1rem",
                            "marginBottom":"1rem"}}
                    value={isSubOpen}
                    setValue={setSubOpen}
                />
                {isSubOpen &&
                    <>
                        {props.info.filter((n)=>n.name === "subParams")[0].params
                            .map(v => (
                                <Inputs 
                                    {...v}
                                    value={value}
                                    setValue={setValue}
                                />
                        ))}
                    </>
                }
                <Button
                    className="green center"
                    style={{"width":"100%"}}
                    type="submit"
                    disabled={disabled}>
                    Add Layer
                </Button>
            </form>
        </div>
    )
}