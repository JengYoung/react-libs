import { InitialStateInterface as NavigatorStateInterface } from './navigator/types';
import { InitialStateInterface as PostsStateInterface } from './posts/types';

export interface RootState {
  posts: PostsStateInterface;
  navigator: NavigatorStateInterface;
}
