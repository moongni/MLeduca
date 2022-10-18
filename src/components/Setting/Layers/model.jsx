import React, { useState } from "react";
import Title from "../../Common/title/title";
import style from "../../Common/component.module.css";
import Inputs from "../../Common/inputs/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Common/button/Button";
import { layerActions } from "../../../reducers/layerSlice";
import { LayerList } from "./LayerList";
import { isEmptyArray } from "../../Common/package";

function Model({icon, ...props}) {
    const dispatch = useDispatch();

    const layers = useSelector(state => state.layers.info);
    const isModel = useSelector(state => state.layers.isModel);

    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState({});

    const handleSubmit = async (event) => {
        setDisabled(true);
        event.preventDefault();

        dispatch(layerActions.addModel(value))
        setDisabled(false);        
    }

    const handleRemove = async (idx) => {
        console.log("call remove");
        setDisabled(true);
        dispatch(layerActions.removeLayer(idx))
        dispatch(layerActions.reIndexing())
        setDisabled(false);
    }
    
    return (
        <div>
            <Title title="Model" icon={icon}/>
            <form
                className={style.subContainer}
                onSubmit={handleSubmit}
            >
                {props.info.filter(n => n.name === "mainParams")[0].params
                    .map(v => (
                        <Inputs
                            {...v}
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
            {!isEmptyArray(layers) &&
                <>
                    <Title title="Layers"/>
                    <div className={style.subContainer}>
                        <LayerList 
                            style={{"maxHeight":"24rem"}}
                            data={layers}
                            isModel={isModel}
                            isHandleRemove={true}
                            handleRemove={handleRemove}/>
                    </div>
                </>
            }
        </div>
    )
}

export default Model;