import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';

import SettingsSideBar from './SettingsSideBar/SettingsSideBar';
import SettingsProfile from './SettingsProfile/SettingsProfile';

import styles from './settings.module.scss';

const Settings = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/settings' && location.search === '') return navigate('/settings?option=profile');
  }, [location.search, location.pathname, navigate])

  const params = useMemo(() => {
    return Object.fromEntries([...searchParams]).option
  }, [searchParams]);

  const paramsComponent = () => {
    if (params === 'profile') return <SettingsProfile />;
    if (params === 'accountManagement') return <div>Management</div>;
  }

  return (
    <Box className={styles.settings}>
      <SettingsSideBar params={params} />
      {paramsComponent()}
    </Box>
  )
}

export default Settings;
