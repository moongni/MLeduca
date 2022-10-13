import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feature: [],
    x: {},
    label: [],
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
            state.label = action.payload
        },
        setFeatures(state, action){
            state.feature = action.payload;
        },
        setFeatureData(state, action) {
            state.x = action.payload;
        },  
        setData(state, action){
            const { title, data } = action.payload;
            if (title == "label") {
                state.label = Object.keys(data);
                state.y = data;
            } else if (title == "feature") {
                state.feature = Object.keys(data);
                state.x = data;
            } else {
                console.log("wrong title");
            }
        },
        initialize(state, action){
            state.label = [];
            state.feature = [];
            state.x = {};
            state.y = {};
        }
    }
})

export const trainActions = trainSlice.actions;
export default trainSlice;