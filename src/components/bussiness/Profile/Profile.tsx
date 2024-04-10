import React from 'react';
import { Box, IconProps } from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import defaultAvatarImg from '../../../assets/img/butterfly.jpg';

import styles from './profile.module.scss';

interface IUserInfoTypes {
  id: number
  icon: React.ReactElement<IconProps>
  text: string
}

const userInfo: IUserInfoTypes[] = [
  { id: 1, icon: <LocalPhoneIcon fontSize="smaller" style={{ color: '#6bc943' }} />, text: 'Not Set' },
  { id: 2, icon: <EmailIcon fontSize="smaller" style={{ color: '#f7cf6f' }} />, text: 'Not Set' },
  { id: 3, icon: <LocationOnIcon fontSize="smaller" style={{ color: '#f17979' }} />, text: 'Not Set' },
  { id: 4, icon: <LinkedInIcon fontSize="smaller" style={{ color: '#007fc0' }} />, text: 'Not Set' },
  { id: 5, icon: <TwitterIcon fontSize="smaller" style={{ color: '#00b6e3' }} />, text: 'Not Set' },
]

const Profile = () => {
  return (
    <Box className={styles.profile}>
      <Box className={styles.profile__container}>
        <Box className={styles.profile__userInfo}>
          <Box className={styles.profile__userInfo_photo} />
          <img src={defaultAvatarImg} alt="avatar-img" className={styles.profile__userInfo_avatar} />
          <Box className={styles.profile__infoBlock}>
            <Box>
              <h1 className={styles.profile__infoBlock_name}>Roma</h1>
              <p className={styles.profile__infoBlock_displayName}>@romero</p>
            </Box>
            <Box className={styles.profile__infoBlock_edit}>
              <EditOutlinedIcon fontSize="smaller" />
              <p className={styles.profile__infoBlock_text}>Edit</p>
            </Box>
          </Box>
        </Box>
        <Box className={styles.profile__userInfo}>
          <Box className={styles.profile__aboutInfo}>
            <p className={styles.profile__aboutInfo_text}>About</p>
            <Box className={styles.profile__line} />
          </Box>
        </Box>
        <Box className={styles.profile__userInfo}>
          <Box className={styles.profile__publicInfo}>
            <p className={styles.profile__aboutInfo_text}>Public Information</p>
            <Box className={styles.profile__line} />
            {userInfo.map(el => (
              <Box className={styles.profile__publicInfo_container} key={el.id}>
                {el.icon}
                <Box className={styles.profile__publicInfo_text}>{el.text}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile;
