import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    features: [],
    x: {},
    labels: [],
    y: {},
}

const trainSlice = createSlice({
    name: "train",
    initialState,

    reducers: {
        setLabelData(state, action){
            state.y = action.payload;
        },
        setLabels(state, action){
            state.labels = action.payload
        },
        setFeatures(state, action){
            state.features = action.payload;
        },
        setFeatureData(state, action) {
            state.x = action.payload;
        },  
        initialize(state, action){
            state.labels = [];
            state.features = [];
            state.x = {};
            state.y = {};
        }
    }
})

export const trainActions = trainSlice.actions;
export default trainSlice;