import React from 'react';
import classNames from 'classnames';
import { Box } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

import CustomInput from '../../../shared/CustomInput/CustomInput';

import styles from './signUpCode.module.scss';

interface IProps {
  codeStatus: string
  reqCode: string
  handleCode: (value: string) => void
  handleCodeField: () => void
  resendCode: () => void
  timer: number
}

const SignUpCode = ({ codeStatus, reqCode, handleCode, handleCodeField, resendCode, timer }: IProps) => {
  return (
    <Box className={styles.page}>
      { codeStatus !== 'success' && (
        <span className={styles.page__text}>We just sent you a sign-up code. Please check your inbox and paste the code below.</span>
      )}
      <CustomInput
        title="Sign-up code"
        label={codeStatus !== 'success' ? (
          <CancelIcon fontSize="small" />
        ) : (
          <CheckIcon className={styles.page__icon} fontSize="small" />
        )}
        placeholder="Sign-up code"
        type="text"
        value={reqCode}
        onChange={handleCode}
        onClick={codeStatus !== 'success' ? handleCodeField : null}
        isError={codeStatus === 'error'}
        isDisabledField={codeStatus === 'success'}
        name="code"
      />
      {codeStatus !== 'success' && (
        <Box
          className={classNames(
            styles.page__button,
            {[ styles.page__button_error]: codeStatus === 'error' }
          )}
        >
          {codeStatus === 'error' && ( <span className={styles.page__button_errorText}>This is not the correct code</span> )}
          <span
            onClick={resendCode}
            className={classNames(
              styles.page__button_resendCode,
              {[ styles.page__button_disabled ]: timer}
            )}
          >
          resend code {timer ? `(${timer})` : ''}
        </span>
        </Box>
      )}
    </Box>
  )
}

export default SignUpCode;
