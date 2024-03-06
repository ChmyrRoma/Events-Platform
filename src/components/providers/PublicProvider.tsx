import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const isAuthorized = false;

const PrivateProvider = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthorized) {
      navigate('/')
    }
  }, [navigate])

  return <Outlet />
}

export default PrivateProvider;
