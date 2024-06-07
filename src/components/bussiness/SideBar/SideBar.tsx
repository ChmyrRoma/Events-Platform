import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, IconProps } from '@mui/material';
import classNames from 'classnames';

import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { UserProfile } from '../../../types/user';
import { useAppSelector } from '../../../store/hooks';

import SideBarLinks from './SideBarLinks/SideBarLinks';

import styles from './sideBar.module.scss';

interface ITypes {
  teeUps: ISideBarLinksTypes[]
  calendar: ISideBarLinksTypes[]
  people: ISideBarLinksTypes[]
  settings: ISideBarLinksTypes[]
}

export interface ISideBarLinksTypes {
  text: string
  path: string
  icon: React.ReactElement<IconProps>
}

const sideBarLinks: ITypes = {
  teeUps: [
    { text: 'Inbox', path: 'inbox', icon: <AllInboxOutlinedIcon fontSize="smaller" /> },
    { text: 'Archive', path: 'archive', icon: <Inventory2OutlinedIcon fontSize="smaller" /> },
    { text: 'Trash', path: 'trash', icon: <DeleteOutlinedIcon fontSize="smaller" /> },
  ],
  calendar: [
    { text: 'Coming Up', path: 'coming-up', icon: <QueryBuilderOutlinedIcon fontSize="smaller" /> },
    { text: 'All', path: 'calendar', icon: <CalendarTodayOutlinedIcon fontSize="smaller" /> },
  ],
  people: [
    { text: 'Contacts', path: 'contacts', icon: <GroupsOutlinedIcon fontSize="smaller" /> },
  ],
  settings: [
    { text: 'Settings', path: 'settings', icon: <SettingsOutlinedIcon fontSize="smaller" /> }
  ]
};

const SideBar = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const { userInfo }: UserProfile = useAppSelector(state => state.user);

  const handleCollapse = () => setIsCollapse(!isCollapse);

  return (
    <Box className={classNames( styles.sideBar, {[styles.sideBar__collapse]: isCollapse} )}>
      <Box className={styles.sideBar__collapseButton} onClick={handleCollapse}>
        {isCollapse ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </Box>
      <Box>
        <h4 className={styles.sideBar__title}>{isCollapse ? 'Events' : 'Events Page'}</h4>
        <Box className={classNames(styles.sideBar__links, {[styles.sideBar__links_collapse]: isCollapse})}>
          <SideBarLinks title="TeeUps" linksArr={sideBarLinks.teeUps} isCollapse={isCollapse} />
          <SideBarLinks title="Calendar" linksArr={sideBarLinks.calendar} isCollapse={isCollapse} />
          <SideBarLinks title="People" linksArr={sideBarLinks.people} isCollapse={isCollapse} />
        </Box>
      </Box>
      <Box className={styles.sideBar__footer}>
        <Box className={classNames(styles.sideBar__footer_settings, {[styles.sideBar__footer_settingsCollapse]: isCollapse })}>
          <SideBarLinks linksArr={sideBarLinks.settings} isCollapse={isCollapse} />
        </Box>
        <Box className={classNames(styles.sideBar__footer_container, {[styles.sideBar__footer_collapse]: isCollapse })}>
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive && isCollapse ?
              (`${styles.sideBar__footer_container_activeCollapse}`) : (isActive ? `${styles.sideBar__footer_container_active}` : '')
            }
          >
            {({ isActive }) => (
              <>
                <img src={userInfo?.avatar} alt="avatar-img" className={styles.sideBar__footer_avatar} />
                { !isCollapse && (
                  <Box className={classNames(styles.sideBar__footer_text, {[styles.sideBar__footer_textActive]: isActive })}>
                    Profile
                  </Box>
                )}
              </>
            )}
          </NavLink>
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar;
