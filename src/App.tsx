import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicProvider from './components/providers/PublicProvider';
import PublicLayout from './components/layouts/PublicLayout/PublicLayout';

import SignIn from './components/bussiness/Auth/SignIn/SignIn';
import SignUp from './components/bussiness/Auth/SignUp/SignUp';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicProvider />}>
          <Route element={<PublicLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
