import { createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';

export const initialState = {
  isLoading: true,
  page: null,
  props: null,
  error: null,
};
export const navigatorSlice = createSlice({
  name: 'navigator',
  initialState,
  reducers: {
    updatePage: (state, action) => {
      return {
        ...state,
        page: action.payload,
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
