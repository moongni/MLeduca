import { createSlice } from '@reduxjs/toolkit'
import { isEmpty, selectColumn } from '../components/Common/package';

const initialState = { 
    label: {},
    feature: {}
};

const preprocessingSlice = createSlice({
    name: 'preprocess',
    initialState, // 빈 배열
    
    // reducers -> 상태 업데이트 함수 모음
    reducers: {
        setProcess(state, action) {
            const { column, preprocess, title } = action.payload; 
            if (!isEmpty(column) && !isEmpty(preprocess)){
                state[title] = {
                    ...state[title],
                    [column]: preprocess
                }
            }
        },
        initialize(state, action) {
            state.label = {};
            state.feature = {};
        },
        updateProcess(state, action) {
            const { title, columns } = action.payload;
            state[title] = selectColumn(state[title], columns)
        },
    },
});

export const preprocessingActions = preprocessingSlice.actions;

export default preprocessingSlice;