import React from 'react';
import classNames from 'classnames';
import { Box, IconProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import styles from './customInput.module.scss';

interface IProps {
  title: string
  label: React.ReactElement<IconProps> | null
  placeholder: string
  type: string
  value: string
  name: string
  onChange: (value: string) => void
  onClick: () => void
  isError?: boolean | null
  isDisabledField?: boolean
}

const CustomInput = ({ title, label, placeholder, onChange, type, onClick, value, name, isError, isDisabledField }: IProps) => {
  const { formState: { errors }, register } = useFormContext<IProps>();

  const getEmailPatternRule = () => {
    if (name === 'email') {
      return {
        required: true,
        pattern: {
          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          message: "Please enter a valid email address"
        }
      }
    }
  };

  return (
    <Box className={styles.customInput}>
      <p className={styles.customInput__title}>{title}</p>
      <Box>
        <label
          onClick={onClick}
          className={classNames(
            styles.customInput__label,
            {[ styles.customInput__label_disabled ]: isDisabledField}
          )}
        >
          {value.length ? label : null}
        </label>
        <input
          type={type}
          {...register(name, getEmailPatternRule())}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={classNames(
            styles.customInput__input,
            {[ styles.customInput__input_error ]: isError || errors[`${name}`] },
            {[ styles.customInput__input_disabled ]: isDisabledField },
          )}
        />
      </Box>
      <p className={styles.customInput__error}> {errors[`${name}`] && <span>{errors[`${name}`].message || ""}</span>}</p>
    </Box>
  )
}

export default CustomInput;
