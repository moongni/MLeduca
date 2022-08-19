import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    columns: [],
    info: {},
}

const dataSlice = createSlice({
    name: 'data',
    initialState,

    reducers: {
        addData(state, action) {
            state.info = 
            {
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
        // addData(state,action) {
        //     const { columns , samples } = action.payload;
        //     state.columns = columns;
        //     state.info = samples;
        // },
        initialize(state, action){
            state.columns = []
            state.info = []
        }
    }
})

export const dataActions = dataSlice.actions;
export default dataSlice;