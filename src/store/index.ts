import { all } from 'redux-saga/effects';
import postsReducer, { postsSaga } from './posts/reducer';

export function* rootSaga() {
  yield all([postsSaga()]);
}

export const rootReducer = () => {
  return {
    posts: postsReducer,
  };
};
