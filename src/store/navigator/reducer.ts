import { createSlice } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';
import { InitialStateInterface } from './types';

export const initialState: InitialStateInterface = {
  isLoading: false,
  prevPages: [],
  nowPage: null,
};

const payloadTypes = {
  push: 'PUSH',
  pop: 'POP',
} as const;

export const navigatorSlice = createSlice({
  name: 'navigator',
  initialState,
  reducers: {
    loadingNavigator: (state) => ({
      ...state,
      isLoading: true,
    }),
    initialize: () => ({
      ...initialState,
      isLoading: false,
    }),
    updatePage: (state, { payload }) => {
      /* eslint-disable no-prototype-builtins */
      if (state.isLoading) return;

      if (payload.type === payloadTypes.pop) {
        if (!state.prevPages.length) return initialState;

        const nextPrevPages = [...state.prevPages];
        const nextNowPage = nextPrevPages.pop();

        return {
          ...state,
          isLoading: false,
          prevPages: nextPrevPages,
          nowPage: nextNowPage,
        };
      }

      if (state.nowPage === null) {
        return {
          ...state,
          prevPages: [],
          nowPage: payload.page,
        };
      }

      return {
        ...state,
        prevPages: [...state.prevPages, state.nowPage],
        nowPage: payload.page,
      };
    },
  },
});

export const navigatorName = navigatorSlice.name;
export const navigatorAction = navigatorSlice.actions;
const navigatorReducer = navigatorSlice.reducer;

export function* navigatorSaga() {
  const { loadingNavigator, initialize, updatePage } = navigatorAction;
  yield takeEvery(loadingNavigator, updatePage);
  yield takeEvery(loadingNavigator, initialize);
}

export default navigatorReducer;
