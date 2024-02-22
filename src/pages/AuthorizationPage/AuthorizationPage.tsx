import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import SignIn from '../../components/bussiness/Auth/SignIn/SignIn';
import SignUp from '../../components/bussiness/Auth/SignUp/SignUp';


const AuthorizationPage = () => {
  const location = useLocation();

  return useMemo(() => {
    const pathname = location.pathname;
    if (pathname === '/sign-in') return <SignIn/>
    if (pathname === '/sign-up') return <SignUp/>

  }, [location.pathname]);
}

export default AuthorizationPage;
