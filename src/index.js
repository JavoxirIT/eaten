import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';
import LoginLayout from 'Layyouts/AuthLayout/LoginLayout';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import App from './App';
import './index.css';
import createAuthStore from 'Store/createAuthStore';
import AuthProvider from 'react-auth-kit/AuthProvider';
// import script from "./tools/loding";
// import { GlobalLoad } from "../globalLoad/GlobalLoad";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider store={createAuthStore}>
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <Routes>
          <Route path={'/login'} element={<LoginLayout />} />
          <Route
            path={'*'}
            element={
              <RequireAuth fallbackPath={'/login'}>
                <App />
              </RequireAuth>
            }
          />
        </Routes>
      </DevSupport>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
