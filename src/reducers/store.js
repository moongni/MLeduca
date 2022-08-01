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
import storage from 'redux-persist/lib/storage/session';
import compileSlice from './compileSlice'
import paramSlice from './paramSlice';
import layerSlice from './layerSlice';
import dataSlice from './dataSlice';

const rootReducer = combineReducers({
  compile: compileSlice.reducer,
  layers: layerSlice.reducer,
  parameter: paramSlice.reducer,
  data: dataSlice.reducer,
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