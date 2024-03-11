import React, { useState } from 'react';
import classNames from 'classnames';
import { Box } from '@mui/material';

import { login } from '../../../../store/slices/user';
import { useAppDispatch } from '../../../../store/hooks';

import PageComponent from '../../../shared/PageComponent/PageComponent';
import CustomInput from '../CustomInput/CustomInput';

import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import styles from './signIn.module.scss';

interface IUserInfo {
  email: string
  password: string
}

const SignIn = () => {
  const [authInfo, setAuthInfo] = useState<IUserInfo>({
    email: '',
    password: '',
  })
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch()

  const handleEmail = (value: string) => setAuthInfo({ email: value, password: authInfo.password });

  const handlePassword = (value: string) => setAuthInfo({ email: authInfo.email, password: value });

  const onSubmit = async () => {
    setIsLoading(true);
    await dispatch(login({ email: authInfo.email, password: authInfo.password }));
    setIsLoading(false);
  }

  const handleField = () => {
    setAuthInfo({ email: '', password: authInfo.password })
  }

  return (
    <PageComponent>
      <Box className={styles.page}>
        <Box className={styles.page__container}>
          <h2 className={styles.page__title}>Log in with Email</h2>
          <Box>
            <CustomInput
              title="Email Address"
              label={<CancelIcon fontSize="small" />}
              type="email"
              placeholder="email@email.com"
              value={authInfo.email}
              onChange={handleEmail}
              onClick={handleField}
            />
            <CustomInput
              title="Password"
              label={!isShow ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              type={isShow ? 'text' : 'password'}
              placeholder="******"
              value={authInfo.password}
              onChange={handlePassword}
              onClick={() => setIsShow(!isShow)}
            />
            <Box className={styles.page__block}>
              <Box className={styles.page__checkbox}>
                <input id="checkbox_id" type="checkbox" className={styles.page__checkbox_input} />
                <label htmlFor="checkbox_id" className={styles.page__checkbox_text}>Remember me</label>
              </Box>
              <p className={styles.page__block_text}>Forgot Password?</p>
            </Box>
          </Box>
          <Box
            className={classNames(
              styles.page__button,
              {[styles.page__button_disabled]: !authInfo.email.length || !authInfo.password.length || isLoading }
            )}
            onClick={onSubmit}
          >
            {isLoading ? <AutorenewIcon className={styles.page__loader} /> : 'Log In'}
          </Box>
        </Box>
      </Box>
    </PageComponent>
  )
}

export default SignIn;
