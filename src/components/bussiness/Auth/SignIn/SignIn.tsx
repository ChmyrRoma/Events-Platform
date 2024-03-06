import React, { useState } from 'react';
import { Box } from '@mui/material';

import { login } from '../../../../store/slices/user';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import PageComponent from '../../../shared/PageComponent/PageComponent';
import CustomInput from '../CustomInput/CustomInput';

import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import styles from './signIn.module.scss';
import classNames from "classnames";

interface IUserInfo {
  email: string
  password: string
}

const SignIn = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: '',
    password: '',
  })
  const [isShow, setIsShow] = useState<boolean>(false);

  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(state => state.user);

  const handleEmail = (value: string) => setUserInfo({ email: value, password: userInfo.password });

  const handlePassword = (value: string) => setUserInfo({ email: userInfo.email, password: value });

  const onSubmit = () => {
    dispatch(login({ email: userInfo.email, password: userInfo.password }))
  }

  const handleField = () => {
    setUserInfo({ email: '', password: userInfo.password })
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
              value={userInfo.email}
              onChange={handleEmail}
              onClick={handleField}
            />
            <CustomInput
              title="Password"
              label={!isShow ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              type={isShow ? 'text' : 'password'}
              placeholder="******"
              value={userInfo.password}
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
              {[styles.page__button_disabled]: !userInfo.email.length || !userInfo.password.length || isLoading }
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
