import React from 'react';
import { Box } from '@mui/material';

import styles from './signIn.module.scss';


const SignIn = () => {
  return (
    <Box className={styles.signIn}>
      <Box className={styles.signIn__button}>Login with email</Box>
    </Box>
  )
}

export default SignIn;
