import React from 'react';
import { Box } from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useAppSelector } from '../../../../store/hooks';
import { UserProfile } from '../../../../types/user';

import SettingsPageComponent from '../SettingsPageComponent/SettingsPageComponent';
import SettingsProfileInfo from './SettingsProfileInfo/SettingsProfileInfo';

import natureImg from '../../../../assets/img/nature.jpg';

import styles from './settingsProfile.module.scss';

export interface ITypes {
  title: string
  buttonName: string
  content: IArrayTypes[]
}

interface IArrayTypes {
  fieldName: string
  name: string
}

interface ISettingsProfileInfo {
  publicProfile: ITypes
  publicInformation: ITypes
}

const SettingsProfile = () => {
  const { userInfo }: UserProfile = useAppSelector(state => state.user);

  const settingsProfileInfo: ISettingsProfileInfo = {
    publicProfile: {
      title: 'Public Profile',
      buttonName: 'Change',
      content: [
        { fieldName: 'Full Name', name: userInfo?.name || 'Not Set' },
        { fieldName: 'Display Name', name: userInfo?.nickname ?`@${userInfo.nickname}` : 'Not Set' },
        { fieldName: 'Bio', name: 'Not Set' },
        { fieldName: 'Location', name: 'Not Set' }
      ]
    },
    publicInformation: {
      title: 'Public information',
      buttonName: 'Add',
      content: [
        { fieldName: 'Website', name: 'Not Set' },
        { fieldName: 'Mobile number', name: 'Not Set' },
        { fieldName: 'Email', name: 'Not Set' },
      ]
    }
  }

  return (
    <SettingsPageComponent title="Profile">
      <Box className={styles.userInfo}>
        <Box
          className={styles.userInfo__backgroundPhoto}
          style={{ backgroundImage: `url(${ userInfo?.backgroundImageUrl || natureImg })` }}
        >
          <Box className={styles.userInfo__backgroundPhoto_iconBlock}>
            <EditOutlinedIcon fontSize="small" className={styles.userInfo__backgroundPhoto_icon} />
          </Box>
        </Box>
        <Box className={styles.userInfo__avatarBlock}>
          <img src={userInfo?.avatar} alt="avatar-img" className={styles.userInfo__avatarBlock_avatar} />
          <Box className={styles.userInfo__iconBlock}>
            <EditOutlinedIcon fontSize="small" className={styles.userInfo__iconBlock_icon} />
          </Box>
        </Box>
        <Box className={styles.userInfo__infoBlock}>
          <h1 className={styles.userInfo__infoBlock_name}>{userInfo?.name}</h1>
          <p className={styles.userInfo__infoBlock_displayName}>@{userInfo?.nickname}</p>
        </Box>
      </Box>
      <SettingsProfileInfo title="Public Profile" settingsProfileInfo={settingsProfileInfo.publicProfile} />
      <SettingsProfileInfo title="Public Profile" settingsProfileInfo={settingsProfileInfo.publicInformation} />
    </SettingsPageComponent>
  )
}

export default SettingsProfile;
