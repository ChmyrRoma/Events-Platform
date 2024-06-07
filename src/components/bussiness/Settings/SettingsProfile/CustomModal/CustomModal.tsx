import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import classNames from 'classnames';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';

import { ICodeType, IValueTypes } from '../SettingsProfile';

import styles from './customModal.module.scss';

interface IProps {
  value: IValueTypes
  apiName: string
  fieldName: string
  userValue: string | undefined
  isLoading: boolean | undefined
  isModalStatus: boolean | undefined
  codeValue: ICodeType | undefined
  setValue: (value: (((prevState: IValueTypes) => IValueTypes) | IValueTypes)) => void
  changeClickStatus: (statusField: boolean, fieldName: string, value: IValueTypes | string, setValue: (value: (((prevState: IValueTypes) => IValueTypes) | IValueTypes)) => void) => void
  onChange: (event: string, fieldName: string, value: IValueTypes, setValue: (value: (((prevState: IValueTypes) => IValueTypes) | IValueTypes)) => void) => void
  onClick: (apiName: string, fieldValue: IValueTypes, setValue: (value: (((prevState: IValueTypes) => IValueTypes) | IValueTypes)) => void) => void
}

const CustomModal = ({
 changeClickStatus, onChange, value, fieldName, setValue, onClick, apiName, isLoading, isModalStatus, userValue, codeValue
}: IProps) => {
  const [timer, setTimer] = useState<number>(0);
  const phoneNumberName = apiName === 'phoneNumber';
  const emailName = apiName === 'email';

  useEffect(() => {
    setInterval(() => {
      setTimer((timer) => {
        if (timer > 0) return timer - 1;
      });
    }, 1000);
  }, []);

  return (
    <Modal open={value.status || false}>
      <Box className={styles.modal}>
        <Box>
          <Box className={styles.modal__header}>
            <h3 className={styles.modal__header_title}>
              Verify {(emailName && 'Email Address') || (phoneNumberName && 'Mobile Number' )}
            </h3>
            <CloseIcon
              onClick={() => changeClickStatus(false, fieldName, '', setValue)}
              className={styles.modal__header_button}
            />
          </Box>
          {!isModalStatus ? (
            <Box className={styles.modal__text}>
              To add this {(phoneNumberName && 'mobile number') || (emailName && 'email address')} to your profile we need you to verify it. Enter it below and click send to have a verification code sent to that {(phoneNumberName && 'number') || (emailName && 'email')}
            </Box>
          ) : (
            <Box>
              <Box className={styles.modal__phoneNumber}>
                <p className={styles.modal__phoneNumber_text}>{(phoneNumberName && 'Mobile Number') || (emailName && 'Email Address')}</p>
                <p className={styles.modal__phoneNumber_number}>{userValue}</p>
              </Box>
              <Box className={styles.modal__text}>
                We just sent you a verification code. Please check your text messages and enter the code below.
              </Box>
            </Box>
          )}
        </Box>
        <Box className={styles.modal__content}>
          <p className={styles.modal__content_title}>{isModalStatus ? 'Verification code' : (phoneNumberName && 'Mobile number') || (emailName && 'Email address')}</p>
          <input
            placeholder={isModalStatus ? 'Enter code' : ((phoneNumberName ? 'Number' : '') || (emailName ? 'Email' : ''))}
            onChange={(event) => onChange(event?.target.value, fieldName, value, setValue)}
            className={styles.modal__content_input}
            value={value.value || ''}
          />
          { ((value.validText && value.value) || (codeValue?.status && value.value )) && (<p className={styles.modal__content_validError}>{value.validText || codeValue?.value}</p>)}
        </Box>
        {isModalStatus && (
          <Box
            className={classNames(
              styles.modal__resendButton,
              {[ styles.modal__resendButton_error]: "true" === 'error' }
            )}
          >
            {"true" === 'error' && ( <span className={styles.modal__resendButton_errorText}>This is not the correct code</span> )}
            <span
              // onClick={resendCode}
              className={classNames(
                styles.modal__resendButton_code,
                {[ styles.modal__resendButton_disabled ]: timer}
              )}
            >
              resend code {timer ? `(${timer})` : ''}
            </span>
          </Box>
        )}
        <Box className={styles.modal__footer}>
          <Box
            onClick={() => onClick(apiName, value, setValue)}
            className={classNames(
              styles.modal__footer_button,
              styles.modal__footer_buttonSave,
              {[styles.modal__footer_buttonDisabled]: isLoading || !value.value?.length || value.validStatus },
            )}
          >
            { isLoading ? <AutorenewIcon className={styles.modal__footer_buttonLoader} /> : 'Save' }
          </Box>
          <Box
            onClick={() => changeClickStatus(false, fieldName, '', setValue)}
            className={classNames(
              styles.modal__footer_button,
              styles.modal__footer_buttonCancel
            )}
          >
            Cancel
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CustomModal;
