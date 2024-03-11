import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalProvider from './components/providers/GlobalProvider';
import PublicProvider from './components/providers/PublicProvider';
import PrivateProvider from './components/providers/PrivateProvider';
import PublicLayout from './components/layouts/PublicLayout/PublicLayout';
import PrivateLayout from './components/layouts/PrivateLayout/PrivateLayout';

import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import SignIn from './components/bussiness/Auth/SignIn/SignIn';
import SignUp from './components/bussiness/Auth/SignUp/SignUp';
import MainPage from './pages/MainPage/MainPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalProvider />}>
          <Route element={<PublicProvider />}>
            <Route element={<PublicLayout />}>
              <Route path="/sign-in" element={<AuthorizationPage />} />
              <Route path="/sign-up" element={<AuthorizationPage />} />
            </Route>
            <Route path="/sign-in-email" element={<SignIn />} />
            <Route path="/sign-up-email" element={<SignUp />} />
          </Route>
          <Route element={<PrivateProvider />}>
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<MainPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<div>PAGE NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
