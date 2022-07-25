import { configureStore } from '@reduxjs/toolkit'
import sequenceSlice from './sequenceSlice';
import modelSelectionSlice from './modelSelectionSlice'

const store = configureStore({
  reducer: {
    modelInfo: modelSelectionSlice.reducer,
    sequence: sequenceSlice.reducer,
  },
});

export default store;