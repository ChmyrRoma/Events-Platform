import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import Tabs, { ITab } from '../../shared/Tabs/Tabs';
import AuthorizationPage from '../../../pages/AuthorizationPage/AuthorizationPage';

import styles from './publicLayout.module.scss';


const tabs: ITab[] = [
  {
    id: 1,
    title: 'Sign In',
    path: '/sign-in',
    content: <AuthorizationPage />
  },
  {
    id: 2,
    title: 'Sign Up',
    path: '/sign-up',
    content: <AuthorizationPage />
  }
]


const PublicLayout = () => {
  const [currentTabId, setCurrentTabId] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/sign-in') {
      setCurrentTabId(1);
    }
    if (pathname === '/sign-up') {
      setCurrentTabId(2);
    }
  }, [location.pathname]);

  return (
    <Box className={styles.layout}>
      <Box className={styles.layout__left}>
        <p className={styles.layout__left_title}>
          Events Platform
        </p>
        <Tabs defaultTabId={currentTabId} tabs={tabs} />
      </Box>
      <Box className={styles.layout__right}>
      </Box>
    </Box>
  )
}

export default PublicLayout;
