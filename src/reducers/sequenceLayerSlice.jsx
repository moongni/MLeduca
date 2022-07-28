import { createSlice } from "@reduxjs/toolkit";

const initialState = { info: [] };

const sequenceLayersSlice = createSlice({
    name: 'sequenceLayer',
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
            state.info = initialState;
        }
    }
})

export const SequenceLayersActions = sequenceLayersSlice.actions;

export default sequenceLayersSlice