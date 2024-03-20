import React from 'react';
import { Box } from '@mui/material';

import styles from './forgotPasswordSuccess.module.scss';
import classNames from "classnames";

interface IProps {
  email: string | null
  onClick: () => void
  timer: number
}

const ForgotPasswordSuccess = ({ email, onClick, timer }: IProps) => {
  return (
    <Box className={styles.page}>
      <Box className={styles.page__icon}>
        <img src="https://web.coowe.com/static/media/passwordChangeSuccess.7e7fd9b1.svg" alt="success" />
      </Box>
      <h2 className={styles.page__title}>Check your email</h2>
      <span className={styles.page__direction}>An email has been sent to {email} with a link to reset your password.</span>
      <Box className={styles.page__buttonBlock}>
        <span className={styles.page__buttonBlock_text}>Didn't receive an email?</span>
        <Box
          onClick={onClick}
          className={classNames(
            styles.page__buttonBlock_button,
            {[styles.page__buttonBlock_button_disabled]: timer}
          )}
        >
          Resend Email {timer ? `(${timer} sec)` : null}
        </Box>
      </Box>
    </Box>
  )
}

export default ForgotPasswordSuccess;
