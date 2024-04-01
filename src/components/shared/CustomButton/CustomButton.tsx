import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import styles from './customButton.module.scss';

interface IProps {
  text: string
  isLoading: boolean
  onClick: () => void
  isFieldLength?: boolean | null
  isError?: boolean | null
}

const CustomButton = ({ text, isLoading, onClick, isFieldLength, isError }: IProps) => {
  const methods = useForm<IProps>();

  return (
    <FormProvider {...methods} >
      <button
        className={classNames(
          styles.customButton,
          {[styles.customButton__disabled]: isFieldLength || isLoading || isError },

        )}
        onClick={onClick}
      >
        {isLoading ? <AutorenewIcon className={styles.customButton__loader} /> : text}
      </button>
    </FormProvider>
  )
}

export default CustomButton;
