import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import postsReducer, { postsSaga } from './posts/reducer';

export function* rootSaga() {
  yield all([fork(postsSaga)]);
}

export const rootReducer = combineReducers({
  posts: postsReducer,
});
