import React, { useState } from 'react';
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

import styles from './sideBar.module.scss';

interface ITypes {
  teeUps: ISideBarLinksTypes[]
  calendar: ISideBarLinksTypes[]
  people: ISideBarLinksTypes[]
}

interface ISideBarLinksTypes {
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
  ]
};

const SideBar = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);

  const handleCollapse = () => setIsCollapse(!isCollapse);

  return (
    <Box className={classNames( styles.sideBar, {[styles.sideBar__collapse]: isCollapse} )}>
      <Box className={styles.sideBar__collapseButton} onClick={handleCollapse}>
        {isCollapse ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </Box>
      <Box>
        <h4 className={styles.sideBar__title}>{isCollapse ? 'Events' : 'Events Page'}</h4>
        <Box className={classNames(styles.sideBar__links, {[styles.sideBar__links_collapse]: isCollapse})}>
          { !isCollapse && <h4 className={styles.sideBar__links_title}>TeeUps</h4> }
          { sideBarLinks.teeUps.map(el => (
            <Box className={classNames(styles.sideBar__container, {[styles.sideBar__container_collapse]: isCollapse })}>
              <Box className={styles.sideBar__container_icon}>{el.icon}</Box>
              { !isCollapse && <Box className={styles.sideBar__container_text}>{el.text}</Box> }
            </Box>
          ))}
          { !isCollapse && <h4 className={styles.sideBar__links_title}>Calendar</h4> }
          { sideBarLinks.calendar.map(el => (
            <Box className={classNames(styles.sideBar__container, {[styles.sideBar__container_collapse]: isCollapse })}>
              <Box className={styles.sideBar__container_icon}>{el.icon}</Box>
              { !isCollapse && <Box className={styles.sideBar__container_text}>{el.text}</Box> }
            </Box>
          ))}
          { !isCollapse && <h4 className={styles.sideBar__links_title}>People</h4> }
          { sideBarLinks.people.map(el => (
            <Box className={classNames(styles.sideBar__container, {[styles.sideBar__container_collapse]: isCollapse })}>
              <Box className={styles.sideBar__container_icon}>{el.icon}</Box>
              { !isCollapse && <Box className={styles.sideBar__container_text}>{el.text}</Box> }
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={styles.sideBar__footer}>
        <Box className={classNames(styles.sideBar__settings, {[styles.sideBar__settings_collapse]: isCollapse })}>
          <SettingsOutlinedIcon fontSize="smaller" className={styles.sideBar__settings_icon} />
          { !isCollapse && <Box className={styles.sideBar__settings_text}>Settings</Box> }
        </Box>
        <Box className={classNames(styles.sideBar__footer_container, {[styles.sideBar__footer_collapse]: isCollapse })}>
          <Box className={styles.sideBar__footer_avatar}></Box>
          { !isCollapse && <Box className={styles.sideBar__footer_text}>Profile</Box> }
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar;
