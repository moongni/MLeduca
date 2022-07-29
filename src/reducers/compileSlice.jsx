import { createSlice } from '@reduxjs/toolkit'

const initialState = { info: [] };

const compileSlice = createSlice({
    name: 'compile',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        addCompile(state, action) {
            const newInfo = action.payload;
            state.info.push({
                title: newInfo.title,
                name: newInfo.name,
            });
        },
        removeCompile(state, action) {
            const title = action.payload;
            state.info = state.info.filter((information) => information.title !== title);
        },
    },
});

export const compileActions = compileSlice.actions;

export default compileSlice;