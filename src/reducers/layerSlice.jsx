import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    info: [],
    isModel: false,
    lastIdx: 0
};

const layerSlice = createSlice({
    name: 'layers',
    initialState,

    reducers: {
        addLayer(state, action) {
            const newInfo = action.payload;

            state.info.push({
                idx: state.lastIdx + 1,
                info: newInfo
            });
            state.lastIdx++;
        },
        addModel(state, action) {
            const inputLayer = {
                idx: "input",
                info: action.payload
            }

            if ( state.isModel ) {
                state.info[0] = inputLayer;
            } else {
                state.isModel = true
                state.info = [inputLayer].concat(state.info);
            }
        },
        removeLayer(state, action) {
            const idx = action.payload;
            
            if ( ["input", "output"].includes(idx) ) {
                state.info = state.info.filter((information) => !["input", "output"].includes(information.idx));
                state.isModel = false;
            } else {
                state.info = state.info.filter((information) => information.idx !== idx);
                state.lastIdx--;
            }
        },
        reIndexing(state, action) {
            
            if ( state.isModel ) {
                for (var i = 1; i < state.lastIdx + 1; i++) {
                    state.info[i].idx = i;
                }
            } else {
                state.info.map((layer, idx) => {
                    layer.idx = idx + 1;
                });
            }
        },
        initialize(state, action){
            state.info = [];
            state.isModel= false;
            state.lastIdx = 0;
        }
    }
})

export const layerActions = layerSlice.actions;

export default layerSlice