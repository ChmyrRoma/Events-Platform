import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useAppDispatch } from '../../../../store/hooks';
import { login, register } from '../../../../store/slices/user';

import CustomInput from '../../../shared/CustomInput/CustomInput';
import CustomButton from '../../../shared/CustomButton/CustomButton';
import { IGeoTypes } from '../SignUp/SignUp';

import styles from './signUpUserInfo.module.scss';

const REACT_USER_CAPTCHA = process.env.REACT_USER_CAPTCHA;


interface IProps {
  deviceId: () => void
  userEmail: string
  userPassword: string
  geoInfo: IGeoTypes
  userId: number | null
}

const SignUpUserInfo = ({ deviceId, userEmail, userPassword, geoInfo, userId }: IProps) => {
  const [userName, setUserName] = useState<string>('');
  const [userDisplayName, setUserDisplayName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<null>(null);
  const [selectedImages, setSelectedImages] = useState<object[]>([]);
  const [file, setFile] = useState('');

  const dispatch = useAppDispatch();

  const { getRootProps } = useDropzone({
    onDrop: acceptedFiles => {
      setSelectedImages(
        acceptedFiles.map(file => {
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          });
          onFileToBase64(file)
        })
      )
    }
  });

  const handleUploadedImg = (img) => {
    setFile(img);
  };

  const onFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
      raiseChangeData(event.target.result, file);
    };
  };

  const raiseChangeData = (base64, file) => {
    const newData = file;
    newData.base64 = base64;
    return handleUploadedImg(newData);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleName = (value: string) => setUserName(value);

  const handleDisplayName = (value: string) => {
    if (value === '@') {
      setUserDisplayName('');
    } else if (value.startsWith('@')) {
      setUserDisplayName(value);
    } else {
      setUserDisplayName(`@${value}`);
    }
  }

  const handleClearUserName = () => {
    setUserName('');
  }

  const handleClearUserDisplayName = () => {
    setUserDisplayName('');
  }

  const onSubmit = async () => {
    setIsLoading(true);
    const response = await dispatch(register({
      avatar: file?.base64,
      avatarType: 'image/base64',
      captcha: captchaValue,
      country: geoInfo.country,
      deviceId: deviceId(),
      email: userEmail,
      firstName: '',
      id: userId,
      lastname: '',
      locale: 'en',
      name: userName,
      password: userPassword,
      timezone: geoInfo.timezone,
      type: 'email',
      username: userDisplayName.split('').slice(1).join('')
    }))
    if (response?.payload) {
      await dispatch(login({ email: userEmail, password: userPassword }))
    }
    setIsLoading(false);
  }

  return (
    <Box className={styles.page}>
      <h2 className={styles.page__title}>How should others see you?</h2>
      <Box className={styles.page__block}>
        <Box className={styles.page__block_content}>
          <Box {...getRootProps()} className={styles.page__block_container}>
            <EditOutlinedIcon className={styles.page__block_icon} fontSize="small" />
          </Box>
          {file ? (
            <img src={file?.preview} alt="" className={styles.page__block_avatar} />
          ) : (
            <PanoramaOutlinedIcon className={styles.page__block_defaultAvatar} />
          )}
        </Box>
      </Box>
      <Box>
        <CustomInput
          title="What is your full name?"
          label={<CancelIcon fontSize="small" />}
          placeholder="Full name"
          type="text"
          value={userName}
          name="firstName"
          onChange={handleName}
          onClick={handleClearUserName}
        />
        <CustomInput
          title="What should be your display name in chat messages?"
          label={<CancelIcon fontSize="small" />}
          placeholder="@displayname"
          type="text"
          value={userDisplayName}
          name="displayName"
          onChange={handleDisplayName}
          onClick={handleClearUserDisplayName}
        />
        <ReCAPTCHA
          sitekey={REACT_USER_CAPTCHA}
          onChange={handleCaptchaChange}
          className={styles.page__captcha}
        />
      </Box>
      <CustomButton
        text="Continue"
        isLoading={isLoading}
        onClick={onSubmit}
        isFieldLength={!userName || !userDisplayName || !captchaValue}
      />
    </Box>
  )
}

export default SignUpUserInfo;
