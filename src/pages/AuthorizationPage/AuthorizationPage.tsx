import React from 'react';

import AuthorizationButton from '../../components/bussiness/Auth/AuthorizationButton/AuthorizationButton';


const AuthorizationPage = ({ type }: string) => {

  return <AuthorizationButton type={type} />
}

export default AuthorizationPage;
