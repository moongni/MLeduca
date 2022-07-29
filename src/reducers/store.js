import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import compileSlice from './compileSlice'
import paramSlice from './paramSlice';
import sequenceLayersSlice from './sequenceLayerSlice';

const rootReducer = combineReducers({
  compile: compileSlice.reducer,
  sequenceLayers: sequenceLayersSlice.reducer,
  parameter: paramSlice.reducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // }).concat(logger),
    }),
});
export const persistor = persistStore(store);
export default store;