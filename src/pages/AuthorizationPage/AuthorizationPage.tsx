import React from 'react';

import AuthorizationButton from '../../components/bussiness/Auth/AuthorizationButton/AuthorizationButton';

interface IProps {
  type?: string
}

const AuthorizationPage = ({ type }: IProps) => {

  return <AuthorizationButton type={type} />
}

export default AuthorizationPage;
