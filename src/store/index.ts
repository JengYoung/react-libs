import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import postsReducer, { postsSaga } from './posts/reducer';
import { navigatorReducer } from './navigator';
import { navigatorSaga } from './navigator/reducer';

export function* rootSaga() {
  yield all([fork(postsSaga), fork(navigatorSaga)]);
}

export const rootReducer = combineReducers({
  posts: postsReducer,
  navigator: navigatorReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
