import React from 'react';
import classNames from 'classnames';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ISideBarLinksTypes } from '../SideBar';

import styles from './sideBarLinks.module.scss';


interface IProps {
  title?: string
  linksArr: ISideBarLinksTypes[]
  isCollapse: boolean
}

const SideBarLinks = ({ title, linksArr, isCollapse }: IProps) => {
  return (
    <Box className={styles.sideBarLinks}>
      { title && (!isCollapse && <h4 className={styles.sideBarLinks__title}>{title}</h4>) }
      { linksArr.map(el => (
        <Box
          className={classNames(styles.sideBarLinks__container, {[styles.sideBarLinks__container_collapse]: isCollapse })}
          key={el.text}
        >
          <NavLink
            to={el.path}
            className={({ isActive }) => isActive && isCollapse ? (
                `${styles.sideBarLinks__container_activeCollapse}`)
              : isActive ? `${styles.sideBarLinks__container_active}` : ''}
          >
            {({ isActive }) => (
              <>
                <Box className={classNames(styles.sideBarLinks__container_icon, {[styles.sideBarLinks__container_iconActive]: isActive })}>
                  {el.icon}
                </Box>
                { !isCollapse && (
                  <Box className={classNames(styles.sideBarLinks__container_text, {[styles.sideBarLinks__container_textActive]: isActive})}>
                    {el.text}
                  </Box>
                )}
              </>
            )}
          </NavLink>
        </Box>
      ))}
    </Box>
  )
}

export default SideBarLinks;
