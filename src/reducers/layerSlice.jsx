import { createSlice } from "@reduxjs/toolkit";

const initialState = { info: [] };

const layersSlice = createSlice({
    name: 'sequence',
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
            Object.assign(state, initialState);
        }
    }
})

export const layersActions = layersSlice.actions;

export default layersSlice;