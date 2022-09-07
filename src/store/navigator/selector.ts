import { CombinedState, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

const navigatorSelf = (state: CombinedState<RootState>) => {
  return state.navigator;
};

const postsSelector = createSelector(navigatorSelf, (posts) => {
  return posts;
});

export default postsSelector;
