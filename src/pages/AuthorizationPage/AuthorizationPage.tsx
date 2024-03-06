import React from 'react';
import { useLocation } from 'react-router-dom';

import CustomButton from '../../components/bussiness/Auth/CustomButton/CustomButton';


const AuthorizationPage = () => {
  const location = useLocation();

  return <CustomButton pathname={location.pathname} />
}

export default AuthorizationPage;
