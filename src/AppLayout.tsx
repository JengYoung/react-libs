import React, { ReactNode } from 'react';

import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

interface AppProps {
  children?: ReactNode;
}

function App({ children }: AppProps) {
  return (
    <>
      <Header />
      {children || <Outlet />}
    </>
  );
}

export default App;
