import { createSlice } from '@reduxjs/toolkit'

const initialState = { info: [] };

const modelSelectionSlice = createSlice({
    name: 'modelSelection',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        addModelSelection(state, action) {
            const newInfo = action.payload;
            state.info.push({
                title: newInfo.title,
                info: newInfo.info,
            });
        },
        removeModelSelection(state, action) {
            const title = action.payload;
            state.info = state.info.filter((information) => information.title !== title);
        },
    },
});

export const modelSelectionActions = modelSelectionSlice.actions;

export default modelSelectionSlice;