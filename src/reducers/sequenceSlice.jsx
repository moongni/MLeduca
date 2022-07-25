import { createSlice } from "@reduxjs/toolkit";

const initialState = { info: [] };

const sequenceSlice = createSlice({
    name: 'sequence',
    initialState,

    reducers: {
        addLayer(state, action) {
            const newInfo = action.payload;
            state.info.push({
                idx: newInfo.idx,
                info: newInfo.info,
            });
        },
        removeLayer(state, action) {
            const idx = action.payload;
            state.info = state.info.filter((information) => information.idx !== idx)
        }
    }
})

export const sequenceActions = sequenceSlice.actions;

export default sequenceSlice;