import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, DrogDropFile } from "../components/LoadData/LoadCsvJson";
import Inputs from "../components/Common/Inputs";
import ArrayTable from "../components/Common/ArrayTable";

export default function LoadData() {
    const dispatch = useDispatch();

    const dataInfo = useSelector(state => state.data.info);
    const dataColumns = useSelector(state => state.data.columns);
    const [url, setUrl] = useState("");

    return (
        <div className="rounded-2xl p-5 mb-4 bg-slate-50 shadow-lg shadow-slate-400">
            <div className="flex  bg-yellow-400 mb-4">
                <Inputs props={{
                    kind: "text",
                    title: "Url",
                    placeholder: "Url 입력",
                    value: url,
                    setValue: setUrl
                }}/>
                <button className="mr-4" 
                    type="button" 
                    onClick={()=>{getData(url, dispatch, '\t')}}>
                        Fetch
                </button>
            </div>
            <DrogDropFile dispatch={dispatch}/>
            <ArrayTable 
                data={dataInfo}
                columns={dataColumns}
            />
        </div>
    );
}