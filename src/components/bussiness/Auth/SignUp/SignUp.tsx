import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm, FormProvider, SubmitErrorHandler, UseFormProps, FieldValues } from 'react-hook-form';
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { useAppDispatch } from '../../../../store/hooks';
import {getGeoInfo, signUp, verificationEmail, verificationValidate} from '../../../../store/slices/user';
import { deviceId } from '../../../shared/deviceId/deviceId';

import PageComponent from '../../../shared/PageComponent/PageComponent';
import CustomInput from '../../../shared/CustomInput/CustomInput';
import CustomButton from '../../../shared/CustomButton/CustomButton';
import SignUpCode from '../SignUpCode/SignUpCode';
import CreatePassword from '../CreatePassword/CreatePassword';
import SignUpUserInfo from '../SignUpUserInfo/SignUpUserInfo';

import styles from './signUp.module.scss';

export interface IValidateArray {
  id: number
  text: string
  status: boolean
  pattern: RegExp
}

export interface IGeoTypes {
  timezone: string | null
  country: string | null
}

interface IFormTypes {
  email: string
  code: string
  password: string
  firstName: string
  displayName: string
}

const validatesBlock: IValidateArray[] = [
  { id: 1, text: 'Have at least 6 characters', status: false, pattern: /.{6,}/ },
  { id: 2, text: 'Contain at least one number', status: false, pattern: /\d/ },
  { id: 3, text: 'At least one uppercase letter', status: false, pattern: /[A-Z]/ },
  { id: 4, text: 'At least one lowercase letter', status: false, pattern: /[a-z]/ },
  { id: 5, text: 'At least one symbol', status: false, pattern: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/ },
];


const SignUp = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [reqCode, setReqCode] = useState<string>('');
  const [codeStatus, setCodeStatus] = useState<string>('');
  const [reqStatus, setReqStatus] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [emailId, setEmailId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordValidStatus, setPasswordValidStatus] = useState<boolean>(false);
  const [geoInfo, setGeoInfo] = useState<IGeoTypes>({
    timezone: null,
    country: null
  });


  const methods = useForm<UseFormProps<FieldValues, IFormTypes> | undefined>({ mode: 'onBlur' });
  const { handleSubmit, formState: { isValid } } = methods;

  const dispatch = useAppDispatch();

  useEffect(() => {
    setInterval(() => {
      setTimer((timer) => {
        if (timer > 0) return timer - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    const checkElem = validatesBlock.every(el => el.status)
    if (checkElem) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [userPassword]);


  useEffect(() => {
    (async () => {
      const response = await dispatch(getGeoInfo());
      if (response?.payload) {
        const data = response.payload;
        setGeoInfo({ timezone: data.timezone, country: data.country })
      }
    })()
  }, []);

  const isFieldsDisabled = useMemo(() => {
    return reqStatus === 'success' ? !reqCode.length || codeStatus === 'error' : null
  }, [reqStatus, reqCode, codeStatus]);

  const handleEmail = (value: string) => {
    setUserEmail(value);
    setReqStatus('');
  };

  const handleCode = (value: string) => {
    setReqCode(value);
    setCodeStatus('');
  }

  const handleEmailField = () => {
    setUserEmail('');
    setReqStatus('');
    setIsLoading(false);
  };

  const handleCodeField = () => {
    setReqCode('');
    setCodeStatus('');
  }

  const handlePassword = (value: string) => {
    setUserPassword(value);
  };


  const onSubmit = async () => {
    setIsLoading(true);
    const response = await dispatch(signUp({ deviceId: deviceId(), email: userEmail, timezone: geoInfo.timezone }));
    if (response?.payload) {
      setReqStatus('success');
      await dispatch(verificationEmail({ deviceId: deviceId(), email: userEmail }));
      setUserId(response?.payload?.user.id);
      setEmailId(response?.payload.contactMechanism.id);
    } else {
      setReqStatus('error');
    }
    setIsLoading(false);
  };


  const onVerificationValidate = async () => {
    setIsLoading(true);
    const response = await dispatch(verificationValidate({ id: emailId, code: reqCode }));
    if (response?.payload.email1) {
      setCodeStatus('success');
    } else {
      setCodeStatus('error');
    }
    setIsLoading(false);
  }

  const onPasswordSubmit = () => {
    setPasswordValidStatus(true);
  }

  const resendCode = () => {
    dispatch(verificationEmail({ deviceId: deviceId(), email: userEmail }));
    setTimer(60);
  }
  const submit: SubmitHandler<IFormTypes> = (data) => data;

  const error: SubmitErrorHandler<IFormTypes> = (error) => error;

  return (
    <PageComponent text="All Signup Options" path="sign-up">
      <form onSubmit={handleSubmit(submit, error)}>
        <FormProvider {...methods}>
          { !passwordValidStatus ? (
            <Box className={styles.page}>
              <h2 className={styles.page__title}>Sign Up</h2>
              <CustomInput
                title="What is your email address?"
                type="text"
                placeholder="Email address"
                label={reqStatus !== 'success' ? <CancelIcon fontSize="small" /> : null}
                value={userEmail}
                onChange={handleEmail}
                onClick={handleEmailField}
                isDisabledField={reqStatus === 'success'}
                name="email"
              />
              { reqStatus === 'error' && (
                <Box className={styles.page__errorBlock}>
                  <span className={styles.page__errorBlock_text}>Another Events account is using this email address.</span>
                  <span>You cannot create a Events account with an email address used in another account.</span>
                </Box>
              )}
              { reqStatus === 'success' && (
                <SignUpCode
                  codeStatus={codeStatus}
                  reqCode={reqCode}
                  handleCode={handleCode}
                  handleCodeField={handleCodeField}
                  resendCode={resendCode}
                  timer={timer}
                />
              )}
              { codeStatus === 'success' && (
                <CreatePassword
                  validatesBlock={validatesBlock}
                  userPassword={userPassword}
                  handlePassword={handlePassword}
                />
              )}
              <CustomButton
                text="Continue"
                isLoading={isLoading}
                onClick={isValid ? (passwordValid ? onPasswordSubmit : reqCode ? onVerificationValidate : onSubmit) : null}
                isFieldLength={!userEmail.length || !isValid || (userPassword ? !userPassword.length || !passwordValid : true) || isFieldsDisabled}
                isError={reqStatus === 'error'}
              />
              { reqStatus === 'error' && (
                <Box className={styles.page__button}>
                  <Link to="/sign-up" className={styles.page__button_link}>Go Back</Link>
                </Box>
              )}
            </Box>
          ) : (
            <SignUpUserInfo
              deviceId={deviceId}
              userEmail={userEmail}
              userPassword={userPassword}
              geoInfo={geoInfo}
              userId={userId}
            />
          )}
        </FormProvider>
      </form>
    </PageComponent>
  )
}

export default SignUp;
