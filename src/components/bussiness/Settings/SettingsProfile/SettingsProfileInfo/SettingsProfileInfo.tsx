import React from 'react';
import { Box } from '@mui/material';
import classNames from 'classnames';

import AutorenewIcon from '@mui/icons-material/Autorenew';

import { ICodeType, IValueTypes } from '../SettingsProfile';
import CustomModal from '../CustomModal/CustomModal';

import styles from './SettingsProfileInfo.module.scss';


interface IProps {
  buttonName: string
  apiName: string
  defaultValue: string
  fieldName: string
  value: IValueTypes
  setValue: (value: (((prevState: IValueTypes) => IValueTypes) | IValueTypes)) => void
  changeClickStatus: (statusField: boolean, fieldName: string, value: IValueTypes | string, setValue: (value: (((prevState: IValueTypes) => IValueTypes) | IValueTypes)) => void) => void
  onChange: (event: string, fieldName: string, value: IValueTypes, setValue: (value: (((prevState: IValueTypes) => IValueTypes) | IValueTypes)) => void) => void
  onClick: (apiName: string, fieldValue: IValueTypes, setValue: (value: (((prevState: IValueTypes) => IValueTypes) | IValueTypes)) => void) => void
  onDelete?: (id: any) => void
  maxLength?: number | undefined
  isLoading?: boolean | undefined,
  isModalStatus?: boolean | undefined
  id?: number | undefined
  userValue?: string | undefined
  codeValue?: ICodeType | undefined
}

const SettingsProfileInfo = (
  { fieldName, name, buttonName, apiName, defaultValue, value, setValue, changeClickStatus, onChange,
    onClick, onDelete, maxLength, isLoading, isModalStatus, id, userValue, codeValue }: IProps
) => {
  return (
    <Box className={styles.profileContainer}>
      {(apiName === 'phoneNumber' || apiName === 'email') || !value.status ? (
        <Box className={styles.profileContainer__container}>
          <Box>
            <span
              className={classNames(
                {[styles.profileContainer__container_fieldName]: !value.status},
                {[styles.profileContainer__editContainer_fieldName]: value.status}
              )}
            >
              {fieldName}
            </span>
            <span className={styles.profileContainer__container_name}>{name}</span>
          </Box>
          <Box className={styles.profileContainer__container_buttonBlock}>
            <Box
              onClick={() => changeClickStatus(true, fieldName, value, setValue)}
              className={styles.profileContainer__container_button}
            >
              {((apiName === 'website' || apiName === 'email') && defaultValue) ? 'Change' : buttonName}
            </Box>
            {((apiName === 'website' || apiName === 'email') && defaultValue) && (
              <Box
                onClick={() => onDelete ? onDelete(id) : null}
                className={classNames(
                  styles.profileContainer__container_button,
                  {[styles.profileContainer__container_buttonDisabled]: isLoading}
                )}
              >
                { isLoading ? <AutorenewIcon className={styles.profileContainer__container_buttonLoader} /> : 'Remove' }
              </Box>
            )}
          </Box>
          <CustomModal
            value={value}
            apiName={apiName}
            codeValue={codeValue}
            userValue={userValue}
            fieldName={fieldName}
            isLoading={isLoading}
            isModalStatus={isModalStatus}
            setValue={setValue}
            changeClickStatus={changeClickStatus}
            onChange={onChange}
            onClick={onClick}
          />
        </Box>
      ) : (
        <Box
          className={classNames(
            { [styles.profileContainer__editContainer]: value.status },
            {[styles.profileContainer__editContainer_locationSize]: fieldName === 'Location'}
          )}
        >
          <span className={styles.profileContainer__editContainer_fieldName}>{fieldName}</span>
          <Box className={styles.profileContainer__editContainer_inputBlock}>
            { fieldName !== 'Bio' ? (
              <input
                className={styles.profileContainer__editContainer_input}
                defaultValue={defaultValue}
                onChange={(event) => onChange(event?.target.value, fieldName, value, setValue)}
                maxLength={maxLength}
              />
            ) : (
              <textarea
                className={styles.profileContainer__editContainer_textArea}
                defaultValue={defaultValue}
                onChange={(event) => onChange(event?.target.value, fieldName, value, setValue)}
                maxLength={maxLength}
              />
            )}
            { (value.validText && value.value) && (<p className={styles.profileContainer__editContainer_validError}>{value.validText}</p>)}
            { maxLength && (
              <Box className={styles.profileContainer__editContainer_inputLength}>
                {value.value ? value.value.length : value.value?.length === 0 ? 0 : defaultValue.length}/{maxLength}
              </Box>
            )}
          </Box>
          <Box className={styles.profileContainer__editContainer_buttonBlock}>
            <Box
              className={classNames(styles.profileContainer__editContainer_button, styles.profileContainer__editContainer_buttonCancel)}
              onClick={() => changeClickStatus(false, fieldName, '', setValue)}
            >
              Cancel
            </Box>
            <Box
              onClick={() => onClick(apiName, value, setValue)}
              className={classNames(
                styles.profileContainer__editContainer_button,
                styles.profileContainer__editContainer_buttonSave,
                {[styles.profileContainer__editContainer_buttonDisabled]: isLoading || !value.value?.length || value.validStatus},
              )}
            >
              { isLoading ? <AutorenewIcon className={styles.profileContainer__editContainer_buttonLoader} /> : 'Save' }
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SettingsProfileInfo;
