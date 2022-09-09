import { createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import { InitialStateInterface } from './types';

export const initialState: InitialStateInterface = {
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
    updatePage: (state, { payload }) => {
      /* eslint-disable no-prototype-builtins */
      console.log(payload);

      if (payload.type === payloadTypes.pop) {
        if (!state.prevPages.length) return initialState;

        const nextPrevPages = [...state.prevPages];
        const nextNowPage = nextPrevPages.pop();

        return {
          ...state,
          prevPages: nextPrevPages,
          nowPage: nextNowPage,
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
  const { updatePage } = navigatorAction;
  yield put(updatePage);
}

export default navigatorReducer;
