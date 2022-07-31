import { createSlice } from '@reduxjs/toolkit'

const initialState = { info: {} };

const compileSlice = createSlice({
    name: 'compile',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        addCompile(state, action) {
            const { title, value } = action.payload;
            console.log("title", title);
            console.log("value", value);
            state.info = {
                ...state.info,
                [title]: value
            };
        },
        removeCompile(state, action) {
            const title = action.payload;
            delete state.info[action.payload];
        },
        initialize(state, action) {
            state.info = {};
        }
    },
});

export const compileActions = compileSlice.actions;

export default compileSlice;