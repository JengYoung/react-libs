import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import AppLayout from './AppLayout';
import HomePage from './pages/HomePage';
import store from './store';

import {
  ChangeMobileNumberPage,
  ChangePasswordPage,
  MyPage,
} from './pages/MyPage/index';
import Navigator from './components/Navigator/Index';
import NavigatorDirections from './components/Navigator/types';

const directions = {
  '/home': NavigatorDirections.BOTTOM,
  '/me': NavigatorDirections.LEFT,
};
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout>
          <Navigator
            directions={directions}
            delay={0.75}
            height="calc(100vh - 5rem)"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="me">
                <Route index element={<MyPage />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage />}
                />
                <Route
                  path="change-mobile-number"
                  element={<ChangeMobileNumberPage />}
                />
              </Route>
            </Routes>
          </Navigator>
        </AppLayout>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
