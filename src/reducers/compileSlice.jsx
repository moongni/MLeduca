import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    optimizer: {},
    loss: ""
 };

const compileSlice = createSlice({
    name: 'compile',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        setOptimizer(state, action){
            state.optimizer = action.payload;
        },
        setLoss(state, action){
            state.loss = action.payload;
        },
        removeOptimizer(state, action) {
            state.optimizer = {};
        },
        removeLoss(state, action){
            state.loss = "";
        },
        initialize(state, action) {
            state = {
                optimizer: {},
                loss: ""
            };
        }
    },
});

export const compileActions = compileSlice.actions;

export default compileSlice;