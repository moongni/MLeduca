import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DrogDropFile } from "../components/LoadData/DrogDropFile";
import { getData } from "../components/LoadData/getData";
import Inputs from "../components/Common/inputs/Inputs";
import ArrayTable from "../components/Common/table/ArrayTable";
import { dataActions } from "../reducers/dataSlice";
import style from "../components/Common/component.module.css";
import { FiDatabase } from "react-icons/fi";
import { isEmptyArray } from "../components/Common/package";
import Title from "../components/Common/title/title";
import { Button } from "../components/Common/button/Button";

export default function LoadData() {
    const dispatch = useDispatch();

    const dataInfo = useSelector(state => state.data.info);
    const dataColumns = useSelector(state => state.data.columns);
    const [url, setUrl] = useState("");

    return (
        <div className={style.container}>
            <Title title="Load Data" icon={<FiDatabase/>}/>
            <div className={style.subContainer}>
                <div style={{"display":"flex",
                            "marginRight":"2.5rem",
                            "marginLeft":"2.5rem"}}>
                    <Inputs 
                        kind="text"
                        title="Load For Url"
                        placeholder="Url 입력"
                        value={url}
                        setValue={setUrl}
                    />
                    <Button
                        className="right"
                        style={{"marginRight":"1rem"}}
                        type="button" 
                        onClick={() => {getData(url, dispatch, dataActions, '\t')}}
                    >
                        Fetch
                    </Button>
                </div>
                <DrogDropFile 
                    title="Load For File"
                    dispatch={dispatch}
                    actions={dataActions}
                />
                { !isEmptyArray(dataColumns) &&
                    <>
                        <Title title="Data Table"/>
                        <ArrayTable 
                            style={{"height":"24rem",
                                    "marginTop":"1rem"}}
                            data={dataInfo}
                            columns={dataColumns}/>
                    </>
                }
            </div>
        </div>
    );
}