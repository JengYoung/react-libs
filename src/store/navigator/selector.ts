import { CombinedState, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

const navigatorSelf = (state: CombinedState<RootState>) => {
  return state.navigator;
};

const navigatorSelector = createSelector(navigatorSelf, (navigator) => {
  return navigator.page;
});

export default navigatorSelector;
