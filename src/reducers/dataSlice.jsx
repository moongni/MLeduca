import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    columns: [],    
    labels: [],
    info: [],
    data:{
        xs: [],
        ys: []
    }
}

const dataSlice = createSlice({
    name: 'data',
    initialState,

    reducers: {
        addSample(state, action) {
            state.info.push(action.payload);
        },
        addLabels(state, action){
            const labels = action.payload;
            labels.map(label => {
                if (state.columns.includes(label)) {
                    state.labels = action.payload;
                } else {
                    alert("해당 컬럼을 찾을 수 없습니다. : ", label);
                }
            })
        },
        addColumns(state, action){
            state.columns = action.payload;
        },
        addData(state,action) {
            const { columns , samples } = action.payload;
            state.columns = columns;
            state.info = samples;
        },
        getTensorData(state, action) {
            if (state.labels.length > 0 && state.columns.length > state.labels.length) {
                state.info.map(data => {
                    const curX = [];
                    const curY = [];
                    for (const [key, value] of Object.entries(data)){
                        if (state.labels.includes(key)){
                            curY.push(value)
                        } else {
                            curX.push(value)
                        }
                    }
                    state.data.xs.push(curX);
                    state.data.ys.push(curY);
                })
            } else {
                alert("레이블 컬럼을 확인해주세요 : ", state.labels);
            }
        },
        initialize(state, action){
            state.columns = []
            state.labels = []
            state.info = []
            state.data = {
                xs: [],
                ys: []
            }
        }
    }
})

export const dataActions = dataSlice.actions;
export default dataSlice;