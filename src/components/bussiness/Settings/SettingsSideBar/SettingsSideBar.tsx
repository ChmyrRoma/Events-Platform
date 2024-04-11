import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconProps } from '@mui/material';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

import SettingsSideBarLinks from './SettingsSideBarLinks/SettingsSideBarLinks';

import styles from './settingsSideBar.module.scss';

interface IProps {
  params: string
}

export interface ISettingsLinkType {
  id: number
  text: string
  path: string
  icon: React.ReactElement<IconProps> | string
}

interface IArrayTypes {
  header: ISettingsLinkType[]
}

interface IPrivacyLinksTypes {
  id: number
  text: string
  path: string
}

const settingsLink: IArrayTypes = {
  header: [
    { id: 1, text: 'Profile', path: 'profile', icon: <AccountCircleOutlinedIcon fontSize="smaller" /> },
    { id: 2, text: 'Account Management', path: 'accountManagement', icon: <ContactMailOutlinedIcon fontSize="smaller" /> },
    { id: 3, text: 'See invitations sent to', path: 'invitationsDetails', icon: <MarkAsUnreadOutlinedIcon fontSize="smaller" /> },
    { id: 4, text: 'Sync Contacts', path: 'syncContacts', icon: <CachedOutlinedIcon fontSize="smaller" /> },
    { id: 5, text: 'Calendars', path: 'calendars', icon: <EventNoteOutlinedIcon fontSize="smaller" /> },
    { id: 6, text: 'Time-zones', path: 'timezones', icon: <QueryBuilderOutlinedIcon fontSize="smaller" /> },
    { id: 7, text: 'Notifications', path: 'notificationSettings', icon: <NotificationsOutlinedIcon fontSize="smaller" /> },
  ]
};

const privacyLinks: IPrivacyLinksTypes[] = [
  { id: 1, text: 'Privacy Policy', path: 'https://privacy.coowe.com/' },
  { id: 2, text: 'Terms of Service', path: 'https://tos.coowe.com/' },
  { id: 3, text: 'Licenses', path: 'https://licenses.coowe.com/' }
];

const SettingsSideBar = ({ params }: IProps) => {
  return (
    <Box className={styles.settingsSideBar}>
      <Box className={styles.settingsSideBar__header}>
        <SettingsSideBarLinks settingsLink={settingsLink.header} params={params} />
        <Box className={styles.settingsSideBar__line} />
        <Box className={styles.settingsSideBar__header_logOut}>
          <LogoutOutlinedIcon fontSize="smaller" className={styles.settingsSideBar__header_icon} />
          <Box className={styles.settingsSideBar__header_text}>Log Out</Box>
        </Box>
      </Box>
      <Box  className={styles.settingsSideBar__footer}>
        <Box className={styles.settingsSideBar__line} />
        {privacyLinks.map(el => (
          <Link to={el.path} target="_blank" rel="noopener noreferrer" className={styles.settingsSideBar__footer_container} key={el.text}>
            <InsertDriveFileOutlinedIcon fontSize="smaller" className={styles.settingsSideBar__footer_icon} />
            <Box className={styles.settingsSideBar__footer_text}>
              {el.text}
            </Box>
          </Link>
        ))}
        <Box className={styles.settingsSideBar__footer_versionText}>v1.6.0</Box>
      </Box>
    </Box>
  )
}

export default SettingsSideBar;
