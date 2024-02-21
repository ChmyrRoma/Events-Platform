import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const isAuthorized = false;

const PrivateProvider: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthorized) {
      navigate('/')
    }
  }, [])

  return <Outlet />
}

export default PrivateProvider;
