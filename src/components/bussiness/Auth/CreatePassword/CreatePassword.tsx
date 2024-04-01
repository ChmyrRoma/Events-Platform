import React, { useState } from 'react';
import { Box } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { IValidateArray } from '../SignUp/SignUp';
import CustomInput from '../../../shared/CustomInput/CustomInput';

import styles from './createPassword.module.scss';

interface IProps {
  validatesBlock: IValidateArray[]
  userPassword: string
  handlePassword: (value: string) => void
}


const CreatePassword = ({ validatesBlock, userPassword, handlePassword }: IProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleField = () => setIsShow(!isShow);

  const checkValid = () => {
    validatesBlock.forEach((el) => {
      if (el.pattern.test(userPassword)) {
        return el.status = true
      } else {
        return el.status = false;
      }
    })

    return validatesBlock.map(el => (
      <Box className={styles.page__validBlock_validation} key={el.id}>
        { el.status ? (
          <CheckCircleIcon className={styles.page__validBlock_iconSuccess } />
        ) : (
          <CheckCircleOutlineIcon className={styles.page__validBlock_icon } />
        )}
        <span className={styles.page__validBlock_text}>{el.text}</span>
      </Box>
    ))
  }

  return (
    <Box className={styles.page}>
      <CustomInput
        title="Set a password"
        label={!isShow ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
        type={isShow ? 'text' : 'password'}
        placeholder="New password"
        value={userPassword}
        onChange={handlePassword}
        onClick={handleField}
        name="password"
      />
      <Box className={styles.page__validBlock}>
        {checkValid()}
      </Box>
    </Box>
  )
}

export default CreatePassword;
