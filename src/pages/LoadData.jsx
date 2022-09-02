import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, DrogDropFile } from "../components/LoadData/LoadCsvJson";
import Inputs from "../components/Common/Inputs";
import ArrayTable from "../components/Common/ArrayTable";
import { dataActions } from "../reducers/dataSlice";

export default function LoadData() {
    const dispatch = useDispatch();

    const dataInfo = useSelector(state => state.data.info);
    const dataColumns = useSelector(state => state.data.columns);
    const [url, setUrl] = useState("");

    return (
        <div className="min-h-full rounded-2xl p-5 bg-slate-50 shadow-lg shadow-slate-400">
            <span className="text-lg">Load Data</span>
            <div className="flex mb-4">
                <Inputs 
                    kind="text"
                    title="Load For Url"
                    placeholder="Url 입력"
                    value={url}
                    setValue={setUrl}
                />
                <button 
                    className="mr-4" 
                    type="button" 
                    onClick={() => {getData(url, dispatch, dataActions, '\t')}}
                >
                    Fetch
                </button>
            </div>
            <DrogDropFile 
                dispatch={dispatch}
            />
            <ArrayTable 
                data={dataInfo}
                columns={dataColumns}
            />
        </div>
    );
}