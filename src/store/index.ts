import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import postsReducer, { postsSaga } from './posts/reducer';

export function* rootSaga() {
  yield all([fork(postsSaga)]);
}

export const rootReducer = combineReducers({
  posts: postsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
