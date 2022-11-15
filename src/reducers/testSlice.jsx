import { createSlice } from "@reduxjs/toolkit";
import { getDtype, getShape } from "../components/Common/package";

const initialState = {
    rowData: {
        data: {},
        columns: [],
        shape: [],
        dtype: {}
    },
    
    feature: {
        data: {},
        columns: [],
        shape: [],
        dtype: {}
    },
    
    label: {
        data: {},
        columns: [],
        shape: [],
        dtype: {}
    },
    
    predData: {
        data: {},
        columns: [],
        shape: [],
        dtype: {}
    }
}

const testSlice = createSlice({
    name: "test",
    initialState,

    reducers: {
        addData(state, action) {
            state.rowData.data = {
                ...state.rowData.data,
                ...action.payload
            }

            state.rowData.dtype = getDtype(state.rowData.data);
            state.rowData.shape = getShape(state.rowData.data);
        },
        setData(state, action) {
            state.rowData.data = action.payload;
            state.rowData.columns = Object.keys(action.payload);
            state.rowData.dtype = getDtype(action.payload);
            state.rowData.shape = getShape(action.payload);
        },
        setColumns(state, action){
            state.rowData.columns = action.payload;
        },
        setLabelData(state, action){
            state.label.data = action.payload;
            state.label.columns = Object.keys(action.payload);
            state.label.dtype = getDtype(action.payload);
            state.label.shape = getShape(action.payload);
        },
        setLabels(state, action){
            state.label.columns = action.payload;
        },
        setFeatureData(state, action) {
            state.feature.data = action.payload;
            state.feature.columns = Object.keys(action.payload);
            state.feature.dtype = getDtype(action.payload);
            state.feature.shape = getShape(action.payload);
        },
        setFeatures(state, action){
            state.feature.columns = action.payload;
        },
        setPredColumns(state, action) {
            state.predData.columns = action.payload;
        },
        setPredData(state, action) {
            state.predData.data = action.payload;
            state.predData.columns = Object.keys(action.payload);
            state.predData.dtype = getDtype(action.payload);
            state.predData.shape = getShape(action.payload);
        },
        initialize(state, action) {
            state.rowData = {
                data: {},
                columns: [],
                shape: [],
                dtype: {}
            }
            state.feature = {
                data: {},
                columns: [],
                shape: [],
                dtype: {}
            }
            state.label = {
                data: {},
                columns: [],
                shape: [],
                dtype: {}
            }
            state.predData = {
                data: {},
                columns: [],
                shape: [],
                dtype: {}
            }        
        }    
    }
})

export const testActions = testSlice.actions;
export default testSlice;