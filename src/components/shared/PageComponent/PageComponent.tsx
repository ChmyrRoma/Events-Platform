import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import styles from './pageComponent.module.scss';

const PageComponent = ({ children }) => {
  return (
    <Box className={styles.page}>
      <Box>
        <Box className={styles.page__title}>Events Page</Box>
        <Box className={styles.page__modal}>
          {children}
        </Box>
        <Link to="/sign-in" className={styles.page__closeButton}>
          <ArrowBackIosIcon fontSize="smaller" />
          <p className={styles.page__closeButton_text}>All Login Options</p>
        </Link>
      </Box>
    </Box>
  )
};

export default PageComponent;
