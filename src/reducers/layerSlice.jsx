import { createSlice } from "@reduxjs/toolkit";

const initialState = { info: [] };

const layerSlice = createSlice({
    name: 'layers',
    initialState,

    reducers: {
        addLayer(state, action) {
            const newInfo = action.payload;
            state.info.push({
                idx: state.info.length + 1,
                info: newInfo
            });
        },
        removeLayer(state, action) {
            const idx = action.payload;
            state.info = state.info.filter((information) => information.idx !== idx)
        },
        reIndexing(state, action) {
            state.info.map((layer, idx) => {
                layer.idx = idx + 1;
            })
        },
        initialize(state, action){
            state.info = [];
        }
    }
})

export const layerActions = layerSlice.actions;

export default layerSlice