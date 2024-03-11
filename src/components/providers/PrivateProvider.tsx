import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkAuth } from '../../store/slices/user';


const PrivateProvider = () => {
  const { isAuthorized, isLoading }: boolean = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      if (isLoading) {
        dispatch(checkAuth());
      } else {
        navigate('/sign-in');
      }
    }
  }, [isAuthorized, isLoading])

  return <Outlet />
}

export default PrivateProvider;
