import React, { ReactNode } from 'react';

import './App.css';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './components/Header';

interface AppProps {
  children?: ReactNode;
}

const StyledContainer = styled.div`
  height: 100%;
  height: calc(100vh - 5rem);
  margin-top: 5rem;
`;

function App({ children }: AppProps) {
  return (
    <>
      <Header />
      <StyledContainer>{children || <Outlet />}</StyledContainer>
    </>
  );
}

export default App;
