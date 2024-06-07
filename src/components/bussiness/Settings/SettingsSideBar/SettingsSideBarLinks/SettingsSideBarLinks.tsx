import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import classNames from 'classnames';

import { ISettingsLinkType } from '../SettingsSideBar';

import styles from './settingsSideBarLinks.module.scss';

interface IProps {
  settingsLink: ISettingsLinkType[]
  params: string
}

const SettingsSideBarLinks = ({ settingsLink, params }: IProps) => {
  return (
    <Box>
      {settingsLink.map(el => (
        <Box className={styles.settingsSideBarLinks} key={el.id}>
          <NavLink
            to={`?option=${el.path}`}
            className={({ isActive }) => (isActive && params === el.path) ? `${styles.settingsSideBarLinks__active}` : ''}
          >
            {({ isActive }) => (
              <>
                <Box className={classNames(styles.settingsSideBarLinks__icon, {[styles.settingsSideBarLinks__icon_active]: isActive })}>
                  {el.icon}
                </Box>
                <Box className={styles.settingsSideBarLinks__text}>
                  {el.text}
                </Box>
              </>
            )}
          </NavLink>
        </Box>
      ))}
    </Box>
  )
}

export default SettingsSideBarLinks;
