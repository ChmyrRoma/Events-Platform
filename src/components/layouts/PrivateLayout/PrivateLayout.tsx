import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import SideBar from '../../bussiness/SideBar/SideBar';

import styles from './privateLayout.module.scss';

const PrivateLayout = () => {

  return (
    <Box className={styles.layout}>
      <SideBar />
      <Box className={styles.layout__right}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default PrivateLayout;
