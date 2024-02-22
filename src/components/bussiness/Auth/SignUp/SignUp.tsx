import React from 'react';
import { Box } from '@mui/material';

import styles from './signUp.module.scss';


const SignUp = () => {
  return (
    <Box className={styles.signUp}>
      <Box className={styles.signUp__button}>
        <p className={styles.signUp__button_text}>Sign up with email</p>
      </Box>
    </Box>
  )
}

export default SignUp;
