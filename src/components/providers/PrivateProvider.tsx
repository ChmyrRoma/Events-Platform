import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const isAuthorized = false;

const PublicProvider = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthorized) {
      navigate('/sign-in')
    }
  }, [navigate])

  return <Outlet />
}

export default PublicProvider;
