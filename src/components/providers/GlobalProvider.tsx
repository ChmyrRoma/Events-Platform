import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkAuth, logOut } from '../../store/slices/user';


const GlobalProvider = () => {
  const { isAuthorized } = useAppSelector(state => state.user);
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      dispatch(checkAuth(event.newValue));
      if (token && (token !== event.newValue)) {
        dispatch(logOut());
      }
    })

  }, [isAuthorized, token])

  return <Outlet />
}

export default GlobalProvider;
