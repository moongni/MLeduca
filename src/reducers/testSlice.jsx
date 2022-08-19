import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    labels: [],
    features: [],
    x: {},
    y: {},
}

const testSlice = createSlice({
    name: "test",
    initialState,

    reducers: {
        setData(state, action) {
            const { columns , samples } = action.payload;
            state.columns = columns;
            state.info = samples;
        },  
        setLabels(state, action){
            state.labels = action.payload
        },
        setFeatures(state, action){
            state.features = action.payload;
        },
        initialize(state, action){
            state.labels = [];
            state.features = [];
            state.x = [];
            state.y = [];
        }
    }
})

export const testActions = testSlice.actions;
export default testSlice;