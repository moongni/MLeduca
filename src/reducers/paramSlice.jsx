import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const paramSlice = createSlice({
    name: 'parameter',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        setParam(state, action) {
            state.info = action.payload;
        },
        removeParam(state, action) {
            const title = action.payload;
            state.info = state.info.filter((information) => information.title !== title);
        },
    },
});

export const paramActions = paramSlice.actions;

export default paramSlice;