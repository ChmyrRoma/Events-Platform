import React from 'react';
import { Box } from '@mui/material';

import { ITypes } from '../SettingsProfile';

import styles from './SettingsProfileInfo.module.scss';

interface IProps {
  title: string
  settingsProfileInfo: ITypes
}

const SettingsProfileInfo = ({ title, settingsProfileInfo }: IProps) => {
  return (
    <Box className={styles.profileContainer}>
      <h6 className={styles.profileContainer__title}>{title}</h6>
      <span className={styles.profileContainer__text}>
        Items added to {title} is accessible to all users of the application. Anyone viewing your User Profile can see this information.
      </span>
      <Box className={styles.profileContainer__container}>
        {settingsProfileInfo.content.map(el => (
          <Box className={styles.profileContainer__container_block} key={el.fieldName}>
            <Box>
              <span className={styles.profileContainer__container_fieldName}>{el.fieldName}</span>
              <span className={styles.profileContainer__container_name}>{el.name}</span>
            </Box>
            <Box className={styles.profileContainer__container_button}>{settingsProfileInfo.buttonName}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default SettingsProfileInfo;
