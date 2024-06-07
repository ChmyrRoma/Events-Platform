import React from 'react';
import { Box } from '@mui/material';

import styles from './settingsPageComponent.module.scss';

interface IProps {
  title: string
  children: React.ReactNode
}

const SettingsPageComponent = ({ title, children }: IProps) => {
  return (
    <Box className={styles.page}>
      <h1 className={styles.page__title}>{title}</h1>
      <Box>
        {children}
      </Box>
    </Box>
  )
}

export default SettingsPageComponent;
