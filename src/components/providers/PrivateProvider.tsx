import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const isAuthorized = false;

const PublicProvider: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthorized) {
      navigate('/login')
    }
  }, [])

  return <Outlet />
}

export default PublicProvider;
