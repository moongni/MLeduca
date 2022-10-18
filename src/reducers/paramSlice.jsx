import { createSlice } from '@reduxjs/toolkit'

const initialState = { info: {} };

const paramSlice = createSlice({
    name: 'parameter',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        setParam(state, action) {
            state.info = action.payload;
        },
        removeParam(state, action) {
            state.info = [];
        },
    },
});

export const paramActions = paramSlice.actions;

export default paramSlice;