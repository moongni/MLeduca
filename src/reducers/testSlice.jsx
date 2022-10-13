import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    label: [],
    y: {},

    feature: [],
    x: {},

    columns: [],
    info: {},
}

const testSlice = createSlice({
    name: "test",
    initialState,

    reducers: {
        addData(state, action) {
            state.info = {
                ...state.info,
                ...action.payload
            };
        },
        setData(state, action) {
            state.info = action.payload;
        },
        setColumns(state, action){
            state.columns = action.payload;
        },
        setLabelData(state, action){
            state.y = action.payload;
            state.label = Object.keys(state.y);
        },
        setLabels(state, action){
            state.label = action.payload
        },
        setFeatures(state, action){
            state.feature = action.payload;
        },
        setFeatureData(state, action) {
            state.x = action.payload;
            state.feature = Object.keys(state.x);
        },
        initialize(state, action){
            state.label= [];
            state.y= {};
            state.feature= [];
            state.x= {};
            state.columns= [];
            state.info= {};
        }    
    }
})

export const testActions = testSlice.actions;
export default testSlice;