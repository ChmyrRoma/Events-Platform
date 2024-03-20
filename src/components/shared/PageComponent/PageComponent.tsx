import React, {ReactNode} from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import styles from './pageComponent.module.scss';

interface IProps {
  children: ReactNode
  path: string
  text: string
}

const PageComponent = ({ children, path, text }: IProps) => {
  return (
    <Box className={styles.page}>
      <Box>
        <Box className={styles.page__title}>Events Page</Box>
        <Box className={styles.page__modal}>
         <Box className={styles.page__modal_content}>
           {children}
         </Box>
        </Box>
        <Link to={`/${path}`} className={styles.page__closeButton}>
          <ArrowBackIosIcon fontSize="smaller" />
          <p className={styles.page__closeButton_text}>{text}</p>
        </Link>
      </Box>
    </Box>
  )
};

export default PageComponent;
