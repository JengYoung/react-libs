import { CombinedState, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

const navigatorSelf = (state: CombinedState<RootState>) => state.navigator;

const navigatorSelector = createSelector(
  navigatorSelf,
  (navigator) => navigator
);

export default navigatorSelector;
