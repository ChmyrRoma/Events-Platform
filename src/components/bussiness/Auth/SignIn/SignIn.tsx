import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import { login } from '../../../../store/slices/user';
import { useAppDispatch } from '../../../../store/hooks';

import PageComponent from '../../../shared/PageComponent/PageComponent';
import CustomInput from '../../../shared/CustomInput/CustomInput';
import CustomButton from '../../../shared/CustomButton/CustomButton';

import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  const [checkedStatus, setCheckedStatus] = useState<boolean>(JSON.parse(localStorage.getItem('checkedStatus')) || false);

  const dispatch = useAppDispatch()

  const handleEmail = (value: string) => setAuthInfo({ email: value, password: authInfo.password });

  const handlePassword = (value: string) => setAuthInfo({ email: authInfo.email, password: value });

  useEffect(() => {
    localStorage.setItem('checkedStatus', JSON.stringify(checkedStatus));
  }, [checkedStatus]);

  const handleField = () => {
    setAuthInfo({ email: '', password: authInfo.password })
  }

  const handleCheckBox = (event) => {
    setCheckedStatus(event.target.checked);
  }

  const onSubmit = async () => {
    setIsLoading(true);
    await dispatch(login({ email: authInfo.email, password: authInfo.password }));
    setIsLoading(false);
  }

  return (
    <PageComponent text="All Login Options" path="sign-in">
      <Box className={styles.page}>
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
              <input
                id="checkbox_id"
                type="checkbox"
                className={styles.page__checkbox_input}
                onChange={handleCheckBox}
              />
              <label htmlFor="checkbox_id" className={styles.page__checkbox_text}>Remember me</label>
            </Box>
            <Link to="/forgot-password" className={styles.page__block_text}>Forgot Password?</Link>
          </Box>
        </Box>
        <CustomButton
          text="Log In"
          isLoading={isLoading}
          onClick={onSubmit}
          emailLength={!authInfo.email.length}
          passwordLength={!authInfo.password.length}
        />
      </Box>
    </PageComponent>
  )
}

export default SignIn;
