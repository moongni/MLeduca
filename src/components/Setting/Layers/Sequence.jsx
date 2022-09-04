import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layerActions } from "../../../reducers/layerSlice";
import Inputs from "../../Common/inputs/Inputs";
import { AdvancedSettingButton, Button} from "../../Common/button/Button";
import Title from "../../Common/title/title";
import style from "../../Common/component.module.css";
import { isEmptyArray } from "../../Common/package";
import { LayerList } from "./LayerList";

function Sequence({icon, ...props}) {
    const dispatch = useDispatch();

    const layers = useSelector((state) => state.layers.info);

    const [isSubOpen, setSubOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState({});

    const handleSubmit = async (event) =>{
        setDisabled(true);
        event.preventDefault();
        dispatch(layerActions.addLayer(value));
        setDisabled(false);
    }

    const handleRemove = async (idx) => {
        console.log("call remove");
        setDisabled(true);
        dispatch(layerActions.removeLayer(idx))
        dispatch(layerActions.reIndexing())
        setDisabled(false);
    }

    return(
        <div >
            <Title title="Sequence" icon={icon}/>
            <form
                className={style.subContainer} 
                onSubmit={handleSubmit}
            >
                <div>
                    {props.info.filter((n)=> n.name === "mainParams")[0].params
                        .map(v => (
                            <Inputs 
                                {...v}
                                value={value}
                                setValue={setValue}/>
                    ))}
                </div>
                <AdvancedSettingButton
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
            {!isEmptyArray(layers) &&
                <>
                    <Title title="Layers"/>
                    <div className={style.subContainer}>
                        <LayerList 
                            style={{"maxHeight":"24rem"}}
                            data={layers}
                            handleRemove={handleRemove}/>
                    </div>
                </>
            }
        </div>

    )
}

export default Sequence;