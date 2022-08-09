import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, DrogDropFile } from "../components/LoadData/LoadCsvJson";
import Inputs from "../components/Common/Inputs";
import DictTable from "../components/Common/DictTable";

export default function LoadData() {
    const dispatch = useDispatch();

    const dataInfo = useSelector(state => state.data.info);
    const dataColumns = useSelector(state => state.data.columns);
    const [url, setUrl] = useState("");
    return (
        <>
            <div className="flex  bg-yellow-400 mb-10">
                <Inputs props={{
                    kind: "text",
                    title: "Url",
                    placeholder: "Url 입력",
                    value: url,
                    setValue: setUrl
                }}/>
                <button className="mr-10" type="button" onClick={()=>{getData(url, dispatch, '\t')}}>Fetch</button>
            </div>
            <DrogDropFile dispatch={dispatch}/>
            <DictTable
                props={{
                    data: dataInfo,
                    columns: dataColumns
                }}
            />
        </>
    );
}