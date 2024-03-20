import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkAuth } from '../../store/slices/user';


const PublicProvider = () => {
  const { isAuthorized }: boolean = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/')
    } else {
      dispatch(checkAuth())
    }
  }, [isAuthorized])

  return <Outlet />
}

export default PublicProvider;
