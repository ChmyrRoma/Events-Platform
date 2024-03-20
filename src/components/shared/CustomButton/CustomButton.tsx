import React from 'react';
import { Box } from '@mui/material';
import classNames from 'classnames';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import styles from './customButton.module.scss';

interface IProps {
  text: string
  isLoading: boolean
  onClick: () => void
  emailLength?: boolean
  passwordLength?: boolean
  error?: boolean | null
}

const CustomButton = ({ text, isLoading, onClick, emailLength, passwordLength, error }: IProps) => {
  return (
    <Box
      className={classNames(
        styles.customButton,
        {[styles.customButton__disabled]: emailLength || passwordLength || isLoading || error },

      )}
      onClick={onClick}
    >
      {isLoading ? <AutorenewIcon className={styles.customButton__loader} /> : text}
    </Box>
  )
}

export default CustomButton;
