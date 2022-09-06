import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from '../store';
import { posts } from '../store/posts/reducer';
import postsSelector from '../store/posts/selector';

function HomePage() {
  const globalState = useSelector(postsSelector);

  useEffect(() => {
    async function fetchPosts() {
      await store.dispatch(posts.actions.getPosts());
    }
    fetchPosts();
  }, []);
  return <div>{JSON.stringify(globalState)}</div>;
}

export default React.memo(HomePage);
