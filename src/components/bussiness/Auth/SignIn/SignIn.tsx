import React, { useState, useEffect } from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { login } from '../../../../store/slices/user';
import { useAppDispatch } from '../../../../store/hooks';

import PageComponent from '../../../shared/PageComponent/PageComponent';
import CustomInput from '../../../shared/CustomInput/CustomInput';
import CustomButton from '../../../shared/CustomButton/CustomButton';

import styles from './signIn.module.scss';

interface IUserInfo {
  email: string
  password: string
}

interface IFormTypes {
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

  const handleShow = () => setIsShow(!isShow);

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

  const { handleSubmit } = useForm<IUserInfo>();
  const methods = useForm<IFormTypes>();

  const submit: SubmitHandler<IFormTypes> = (data) => console.log(data);

  const error: SubmitErrorHandler<IFormTypes> = (error) => console.log('errors', error);

  return (
    <PageComponent text="All Login Options" path="sign-in">
      <form onSubmit={handleSubmit(submit, error)}>
        <FormProvider {...methods}>
          <Box className={styles.page}>
            <h2 className={styles.page__title}>Log in with Email</h2>
            <Box>
              <CustomInput
                title="Email Address"
                label={<CancelIcon fontSize="small" />}
                type="text"
                placeholder="email@email.com"
                value={authInfo.email}
                onChange={handleEmail}
                onClick={handleField}
                name="email"
              />
              <CustomInput
                title="Password"
                label={!isShow ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                type={isShow ? 'text' : 'password'}
                placeholder="******"
                value={authInfo.password}
                onChange={handlePassword}
                onClick={handleShow}
                name="password"
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
              isFieldLength={!authInfo.email.length || !authInfo.password.length}
            />
          </Box>
        </FormProvider>
      </form>
    </PageComponent>
  )
}

export default SignIn;
