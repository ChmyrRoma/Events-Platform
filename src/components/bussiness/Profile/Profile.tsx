import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconProps } from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import natureImg from '../../../assets/img/nature.jpg';

import { UserProfile } from '../../../types/user';
import { useAppSelector}  from '../../../store/hooks';

import styles from './profile.module.scss';

interface IUserInfoTypes {
  id: number
  icon: React.ReactElement<IconProps>
  text: string
}

const usersInfo: IUserInfoTypes[] = [
  { id: 1, icon: <LocalPhoneIcon fontSize="smaller" style={{ color: '#6bc943' }} />, text: 'Not Set' },
  { id: 2, icon: <EmailIcon fontSize="smaller" style={{ color: '#f7cf6f' }} />, text: 'Not Set' },
  { id: 3, icon: <LocationOnIcon fontSize="smaller" style={{ color: '#f17979' }} />, text: 'Not Set' },
  { id: 4, icon: <LinkedInIcon fontSize="smaller" style={{ color: '#007fc0' }} />, text: 'Not Set' },
  { id: 5, icon: <TwitterIcon fontSize="smaller" style={{ color: '#00b6e3' }} />, text: 'Not Set' },
]

const Profile = () => {
  const { userInfo }: UserProfile = useAppSelector(state => state.user);

  return (
    <Box className={styles.profile}>
      <Box className={styles.profile__container}>
        <Box className={styles.profile__userInfo}>
          <Box
            className={styles.profile__userInfo_photo}
            style={{ backgroundImage: `url(${ usersInfo?.backgroundImageUrl || natureImg })` }}
          />
          <img src={userInfo?.avatar} alt="avatar-img" className={styles.profile__userInfo_avatar} />
          <Box className={styles.profile__infoBlock}>
            <Box>
              <h1 className={styles.profile__infoBlock_name}>{userInfo?.name}</h1>
              <p className={styles.profile__infoBlock_displayName}>@{userInfo?.nickname}</p>
            </Box>
            <Link to="/settings" className={styles.profile__infoBlock_edit}>
              <EditOutlinedIcon fontSize="smaller" />
              <p className={styles.profile__infoBlock_text}>Edit</p>
            </Link>
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
            {usersInfo.map(el => (
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
