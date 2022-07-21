// import { createStore, applyMiddleware, compose } from 'redux';
// import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './index';


// // redux 발동시 logger 사용하지 않음
// const enhancer = 
//   process.env.NODE_ENV === "production"
//     ? compose(applyMiddleware())
//     : composeWithDevTools(applyMiddleware(logger));

// const store = createStore(rootReducer, enhancer);

// export default store;

import { configureStore} from '@reduxjs/toolkit'
import modelInfoSlice from './model'

const store = configureStore({
  reducer: {
    modelInfo: modelInfoSlice.reducer,
  },
});

export default store;