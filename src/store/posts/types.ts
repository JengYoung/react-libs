export interface PostInterface {
  id: string;
  title: string;
  body: string;
}

export interface PostsErrorInterface {
  status: number;
  message: string;
}

export interface InitialStateInterface {
  isLoading: boolean;
  posts: PostInterface[];
  postsError: null | PostsErrorInterface;
}
