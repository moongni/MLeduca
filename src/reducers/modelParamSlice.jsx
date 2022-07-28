import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const modelParamSlice = createSlice({
    name: 'modelParams',
    initialState,

    reducers: {
        addParams(state, action) {
            const newInfo = action.payload;
            state.info = {
                
            }
        }
    }
})