import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from '../store';
import { posts } from '../store/posts/reducer';
import postsSelector from '../store/posts/selector';

const StyledHomePage = styled.div`
  height: 100%;
  overflow: scroll;
  background: linear-gradient(#111, #7355ff);
`;

function HomePage() {
  const globalState = useSelector(postsSelector);

  useEffect(() => {
    async function fetchPosts() {
      await store.dispatch(posts.actions.getPosts());
    }
    fetchPosts();
  }, []);
  return <StyledHomePage>{JSON.stringify(globalState)}</StyledHomePage>;
}

export default React.memo(HomePage);
