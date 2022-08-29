import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    info: {}
 };

const modelSlice = createSlice({
    name: 'model',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        setModel(state, action){
            state.info = JSON.stringify(action.payload);
        },
        removeModel(state, action) {
            state.optimizer = {};
        },
        loadModel(state, action){
            state.info = action.payload;
        },
        initialize(state, action) {
            state = {
                info: {}
            };
        }
    },
});

export const modelActions = modelSlice.actions;

export default modelSlice;