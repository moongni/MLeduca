import { createSlice } from "@reduxjs/toolkit";

const initialState = { info: [] };

const sequenceSlice = createSlice({
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
        }
    }
})

export const sequenceActions = sequenceSlice.actions;

export default sequenceSlice;