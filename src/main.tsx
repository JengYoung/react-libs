import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import AppLayout from './AppLayout';
import './index.css';
import HomePage from './pages/HomePage';
import store from './store';

import {
  ChangeMobileNumberPage,
  ChangePasswordPage,
  MyPage,
} from './pages/MyPage/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="me">
              <Route index element={<MyPage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route
                path="change-mobile-number"
                element={<ChangeMobileNumberPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
