// export const INIT_MODEL_INFO_STATE = {
//     info: []
// }
// export const SETINFO = "SETINOF"
// export const ERASEINFO = "CLEARINFO"

// export function setInfo() {
//     return {
//         type: SETINFO
//     };
// }
// export function eraseInfo() {
//     return {
//         type: ERASEINFO
//     };
// }
import { createSlice } from '@reduxjs/toolkit'

const initialState = { info: [] };

const modelInfoSlice = createSlice({
    name: 'model',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        addInfo(state, action) {
            const newInfo = action.payload;
            state.info.push({
                title: newInfo.title,
                info: newInfo.info,
            });
        },
        removeInfo(state, action) {
            const title = action.payload;
            state.info = state.info.filter((infomation) => infomation.title !== title);
        },
    },
});

export const modelInfoActions = modelInfoSlice.actions;

export default modelInfoSlice;