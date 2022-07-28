import { configureStore } from '@reduxjs/toolkit'
import modelSelectionSlice from './modelSelectionSlice'
import sequenceLayersSlice from './sequenceLayerSlice';

const store = configureStore({
  reducer: {
    modelInfo: modelSelectionSlice.reducer,
    sequenceLayers: sequenceLayersSlice.reducer,
  },
});

export default store;