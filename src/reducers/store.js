import { configureStore } from '@reduxjs/toolkit'
import sequenceSlice from './sequenceSlice';
import modelSelectionSlice from './modelSelectionSlice'
import layersSlice from './layerSlice';
import sequence from './sequence';

const store = configureStore({
  reducer: {
    modelInfo: modelSelectionSlice.reducer,
    sequence: sequenceSlice.reducer,
    Layers: layersSlice.reducer,
    seq: sequence.reducer
  },
});

export default store;