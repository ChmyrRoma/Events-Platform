import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicProvider from './components/providers/PublicProvider';
import PublicLayouts from './components/layouts/PublicLayouts';

import SignIn from './components/bussiness/Auth/SignIn/SignIn';
import SignUp from './components/bussiness/Auth/SignUp/SignUp';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicProvider />}>
          <Route element={<PublicLayouts />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
