import React from 'react';
import classNames from 'classnames';
import { Box, IconProps } from '@mui/material';

import styles from './customInput.module.scss';

interface IProps {
  title: string
  label: React.ReactElement<IconProps>
  placeholder: string
  type: string
  value: string
  onChange: (value: string) => void
  onClick: () => void
  error?: boolean | null
}

const CustomInput = ({ title, label, placeholder, onChange, type, onClick, value, error }: IProps) => {
  return (
    <Box className={styles.customInput}>
      <p className={styles.customInput__title}>{title}</p>
      <Box className={styles.customInput__form}>
        <label className={styles.customInput__label} onClick={onClick}>{value.length ? label : null}</label>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={classNames(
            styles.customInput__input,
            {[ styles.customInput__input_error ]: error}
          )}
        />
      </Box>
    </Box>
  )
}

export default CustomInput;
