import { CombinedState, createSelector } from '@reduxjs/toolkit';
// import { initialState } from './reducer';
import { InitialStateInterface } from './types';

const postsSelf = (state: CombinedState<InitialStateInterface>) => state.posts;

const postsSelector = createSelector(postsSelf, (posts) => posts);

export default postsSelector;
