import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import styles from './customButton.module.scss';

const CustomButton = ({ type }: string) => {
  return (
    <Box className={styles.customButton}>
      { type === 'login' && (
        <Link to="/sign-in-email" className={styles.customButton__loginButton}>Login with email</Link>
      )}
      { type === 'register' && (
        <Box className={styles.customButton__registerButton}>
          <Link to="/sign-up-email" className={styles.customButton__registerButton_text}>Sign up with email</Link>
        </Box>
      )}
    </Box>
  )
}

export default CustomButton;
