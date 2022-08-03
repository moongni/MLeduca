import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    columns: [],    
    info: [],
}

const dataSlice = createSlice({
    name: 'data',
    initialState,

    reducers: {
        addSample(state, action) {
            state.info.push(action.payload);
        },
        addColumns(state, action){
            state.columns = action.payload;
        },
        addData(state,action) {
            const { columns , samples } = action.payload;
            state.columns = columns;
            state.info = samples;
        },
        initialize(state, action){
            state.columns = []
            state.info = []
        }
    }
})

export const dataActions = dataSlice.actions;
export default dataSlice;