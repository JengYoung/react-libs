import { CombinedState, createSelector } from '@reduxjs/toolkit';
// import { initialState } from './reducer';
import { InitialStateInterface } from './types';

const postsSelf = (state: CombinedState<InitialStateInterface>) => {
  return state.posts;
};

const postsSelector = createSelector(postsSelf, (posts) => {
  return posts;
});

export default postsSelector;
