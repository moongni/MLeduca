import { createSlice } from '@reduxjs/toolkit'
import { isEmpty } from '../components/Common/package';

const initialState = { info: {} };

const preprocessingSlice = createSlice({
    name: 'preprocess',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        setProcess(state, action) {
            const { column, preprocess } = action.payload; 
            if (!isEmpty(column) && !isEmpty(preprocess)){
                state.info = {
                    ...state.info,
                    [column]: preprocess
                }
            }
        },
        updateProcess(state, action) {
            state.info = action.payload;
        },
    },
});

export const preprocessingActions = preprocessingSlice.actions;

export default preprocessingSlice;