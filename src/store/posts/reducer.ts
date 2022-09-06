import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import getPostsAPI from '../../apis/posts/getPosts';
import { InitialStateInterface, PostInterface } from './types';

export const initialState: InitialStateInterface = {
  isLoading: false,
  posts: [],
  postsError: null,
};

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    getPostsSuccess: (
      state = initialState,
      action: PayloadAction<PostInterface[]>
    ) => {
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    },
    getPostsFailure: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        postsError: error,
      };
    },
  },
});

export const postsName = posts.name;
export const postsReducer = posts.reducer;
export const postsAction = posts.actions;

// get Saga
export function* getPostsSaga() {
  const { getPostsSuccess, getPostsFailure } = postsAction;

  try {
    const response: AxiosResponse<PostInterface[]> = yield call(getPostsAPI);
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    yield put(getPostsSuccess(response.data));
    // put은 dispatch 를 뜻한다.
  } catch (err) {
    yield put(getPostsFailure(err));
  }
}

export function* postsSaga() {
  const { getPosts } = postsAction;
  yield takeEvery(getPosts, getPostsSaga);
}

export default postsReducer;
