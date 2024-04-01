import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { recoveryPassword } from '../../../../store/slices/user';
import { useAppDispatch } from '../../../../store/hooks';
import { deviceId } from '../../../shared/deviceId/deviceId';

import PageComponent from '../../../shared/PageComponent/PageComponent';
import CustomInput from '../../../shared/CustomInput/CustomInput';
import CustomButton from '../../../shared/CustomButton/CustomButton';
import ForgotPasswordSuccess from './ForgotPasswordSuccess/ForgotPasswordSuccess';

import styles from './forgotPassword.module.scss';

interface IResStatus {
  status: string | null
  email: string | null
}

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resStatus, setResStatus] = useState<IResStatus>({
    status: null,
    email: null,
  });
  const [timer, setTimer] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setInterval(() => {
      setTimer((timer) => {
        if (timer > 0) return timer - 1;
      });
    }, 1000);
  }, []);

  const handleEmail = (value: string) => {
    setUserEmail(value);
    setResStatus({ status: null, email: null });
  };

  const handleField = () => {
    setUserEmail('');
    setResStatus({ status: null, email: null });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const response = await dispatch(recoveryPassword({ email: userEmail, deviceId: deviceId() }));
    if (response?.payload) {
      setResStatus({ status: 'success', email: response?.meta.arg.email });
    } else {
      setResStatus({ status: 'error', email: response?.meta.arg.email });
    }
    setIsLoading(false);
    setTimer(60);
  };

  return (
    <PageComponent text="Back to Login" path="sign-in-email">
      <Box className={styles.page}>
        {resStatus.status === 'success' ? (
          <ForgotPasswordSuccess email={resStatus.email} onClick={onSubmit} timer={timer} />
        ) : (
          <Box>
            <h2 className={styles.page__title}>Forgot Password</h2>
            <span className={styles.page__direction}>Enter the email address you use to login, to receive password reset link.</span>
            <Box>
              <CustomInput
                title="Email Address"
                label={<CancelIcon fontSize="small" />}
                type="text"
                placeholder="email@email.com"
                value={userEmail}
                onChange={handleEmail}
                onClick={handleField}
                isError={resStatus.status === 'error'}
                name="email"
              />
            </Box>
            { resStatus.status === 'error' ? (
              <Box className={styles.page__errorBlock}>
                <span>We couldn’t find a Events Page account associated with</span>
                <span>{resStatus.email}</span>
              </Box>
            ) : null}
            <CustomButton
              text="Get Password Reset Link"
              isLoading={isLoading}
              onClick={onSubmit}
              isFieldLength={!userEmail.length}
              isError={resStatus.status === 'error'}
            />
          </Box>
        )}
      </Box>
    </PageComponent>
  )
}

export default ForgotPassword;
