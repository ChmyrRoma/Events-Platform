import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { IContactInfo, UserProfile } from '../../../../types/user';
import {
  addContactInfo,
  changeUserInfo,
  deleteWebsite,
  getChangeUserInfo,
  getContactInfo,
  getContactMechanisms,
  getContactVerificationCode,
  getContact, getUser, unPublishEmail,
} from '../../../../store/slices/user';
import { deviceId } from '../../../shared/deviceId/deviceId';

import SettingsPageComponent from '../SettingsPageComponent/SettingsPageComponent';
import SettingsProfileInfo from './SettingsProfileInfo/SettingsProfileInfo';

import natureImg from '../../../../assets/img/nature.jpg';

import styles from './settingsProfile.module.scss';

export interface IValueTypes {
  value: string | null
  status: boolean
  validText: string | null
  validStatus: boolean
}
interface IContactType {
  id: null | number
  userId: number | null
  status: boolean
}

export interface ICodeType {
  value: string
  status: boolean
}

const fieldsName: string[] = ['Full Name', 'Display Name', 'Bio', 'Location', 'Website', 'Mobile number', 'Email'];

const apiNames: string[] = ['name', 'nickname', 'about', 'primaryLocation', 'phoneNumber', 'email'];

const SettingsProfile = () => {
  const [fullNameValue, setFullNameValue] = useState<IValueTypes>({
    value: null,
    status: false,
    validText: '',
    validStatus: false
  });
  const [displayNameValue, setDisplayNameValue] = useState<IValueTypes>({
    value: null,
    status: false,
    validText: '',
    validStatus: false
  });
  const [bioValue, setBioValue] = useState<IValueTypes>({
    value: null,
    status: false,
    validText: null,
    validStatus: false
  });
  const [locationValue, setLocationValue] = useState<IValueTypes>({
    value: null,
    status: false,
    validText: null,
    validStatus: false
  });
  const [websiteValue, setWebsiteValue] = useState<IValueTypes>({
    value: null,
    status: false,
    validText: '',
    validStatus: false
  });
  const [phoneNumberValue, setPhoneNumberValue] = useState<IValueTypes>({
    value: null,
    status: false,
    validText: '',
    validStatus: false
  });
  const [emailValue, setEmailValue] = useState<IValueTypes>({
    value: null,
    status: false,
    validText: '',
    validStatus: false
  });
  const [contactId, setContactId] = useState<IContactType>({
    id: null,
    userId: null,
    status: false
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalStatus, setIsModalStatus] = useState<boolean>(false);
  const [userWebsite, setUserWebsite] = useState<null | IContactInfo>(null);
  const [userEmail, setUserEmail] = useState<null | IContactInfo>(null);
  const [userValue, setUserValue] = useState<string>('');
  const [isEmailStatus, setIsEmailStatus] = useState<boolean>(JSON.parse(localStorage.getItem('isEmailStatus')) || false);
  const [codeValue, setCodeValue] = useState<ICodeType>({
    value: '',
    status: true
  });

  const { userInfo, contactInfo }: UserProfile = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();


  // TODO: redo form valid on React Hook Form
  useEffect(() => {
    const validWebsite = new RegExp('^(http(s):\\/\\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$');
    const validPhoneNumber = new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$');
    const validEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

    if (!validWebsite.test(websiteValue.value as string)) {
      setWebsiteValue({ value: websiteValue.value, status: websiteValue.status, validText: 'invalid value', validStatus: true });
    } else {
      setWebsiteValue({ value: websiteValue.value, status: websiteValue.status, validText: '', validStatus: false });
    }

    if (!validPhoneNumber.test(phoneNumberValue.value as string)) {
      setPhoneNumberValue({ value: phoneNumberValue.value, status: phoneNumberValue.status, validText: 'invalid value', validStatus: true });
    } else {
      setPhoneNumberValue({ value: phoneNumberValue.value, status: phoneNumberValue.status, validText: '', validStatus: false });
    }

   if (!validEmail.test(emailValue.value as string) && !contactId.status) {
     setEmailValue({ value: emailValue.value, status: emailValue.status, validText: 'Please enter a valid email address', validStatus: true });
   } else {
     setEmailValue({ value: emailValue.value, status: emailValue.status, validText: '', validStatus: false });
   }

    if (fullNameValue.value?.length < 3) {
      setFullNameValue({ value: fullNameValue.value, status: fullNameValue.status, validText: 'Must be at least 3 characters', validStatus: true });
    } else {
      setFullNameValue({ value: fullNameValue.value, status: fullNameValue.status, validText: '', validStatus: false });
    }

    if (displayNameValue.value?.length < 3) {
      setDisplayNameValue({ value: displayNameValue.value, status: displayNameValue.status, validText: 'Must be at least 3 characters', validStatus: true });
    } else {
      setDisplayNameValue({ value: displayNameValue.value, status: displayNameValue.status, validText: '', validStatus: false });
    }

  }, [websiteValue.value, fullNameValue.value, displayNameValue.value, phoneNumberValue.value, emailValue.value])

  useEffect(() => {
    if (userInfo) {
     dispatch(getChangeUserInfo({ id: userInfo?.id }));
    }
  }, [userInfo?.id])

  useEffect(() => {
    contactInfo?.map(el => {
      if (el.typeId === 6) {
        return setUserWebsite(el);
      }
      if ((el.typeId === 2) && isEmailStatus) {
        console.log('EL', el)
       return setUserEmail(el);
      }
    })
  }, [contactInfo, isEmailStatus])


  const changeClickStatus = (statusField, fieldName, fieldValue, setFieldValue) => {
    fieldsName.forEach(el => {
      if (el === fieldName) {
        setFieldValue({ value: fieldValue.value, status: statusField, validText: fieldValue.validText, validStatus: fieldValue.validStatus });
      }
    })
    setIsModalStatus(false);
  };

  const handleValueChange = (event, fieldName, fieldValue, setFieldValue) => {
    fieldsName.forEach(el => {
      if (el === fieldName) {
        setFieldValue({ value: event, status: fieldValue.status, validText: fieldValue.validText, validStatus: fieldValue.validStatus });
      }
    })
  };

  const onSubmit = async (fieldName, fieldValue, setFieldValue) => {
    setIsLoading(true);
    if (fieldValue.validStatus) {
      setIsLoading(false);
      return;
    }

    let value;

    apiNames.forEach(el => {
      if (fieldName === el) {
        value = fieldValue.value;
      }
    })

    const response = await dispatch(changeUserInfo({ fieldName, value }));
    if (response?.payload) {
      dispatch(getChangeUserInfo({ id: response?.payload.id }));
    }
    setFieldValue({ value: fieldValue.value, status: false, validText: fieldValue.validText, validStatus: fieldValue.validStatus });

    setIsLoading(false);
  };

  const onChangeWebsite = async (fieldName, fieldValue, setFieldValue) => {
    setIsLoading(true);
    if (fieldValue.validStatus) {
      setIsLoading(false);
      return;
    }

    const response = await dispatch(addContactInfo({ typeId: 6, value: fieldValue.value }))
    if (response?.payload) {
      await dispatch(getContact());
      dispatch(getChangeUserInfo({ id: userInfo?.id }));
    }
    setFieldValue({ value: fieldValue.value, status: false, validText: fieldValue.validText, validStatus: fieldValue.validStatus });

    setIsLoading(false);
  }

  const onRemoveWebsite = async (id) => {
    const response = await dispatch(deleteWebsite({ id: id }));
    if (response?.payload) {
      await dispatch(getChangeUserInfo({ id: userInfo?.id }));
      setUserWebsite(null);
    }
  }

  const onRemoveEmail = async (id) => {
    const response = await dispatch(unPublishEmail({ id: id }));
    if (response?.payload) {
      await dispatch(getContact());
      await dispatch(getChangeUserInfo({ id: userInfo?.id }));
      localStorage.removeItem('isEmailStatus');
      setIsEmailStatus(false);
    }
    setUserEmail(null);
  }

  const onChangePhoneNumber = async (fieldsName, fieldValue, setFieldValue) => {
    setIsLoading(true);
    if (fieldValue.validStatus) {
      setIsLoading(false);
      return;
    }

    const response = await dispatch(addContactInfo({ typeId: 3, value: fieldValue.value }))
    if (response?.payload) {
      const getContactResponse = await dispatch(getContactInfo({ id: response?.payload.id, deviceId: deviceId() }))
      if (!getContactResponse?.payload) {
        setFieldValue({ value: fieldValue.value, status: true, validText: 'Number is already in use by another account. It must be unlinked before adding', validStatus: true });
        setIsLoading(false);
        return;
      } else {
        setIsModalStatus(true);
      }
    }
    setFieldValue({ value: fieldValue.value, status: false, validText: fieldValue.validText, validStatus: fieldValue.validStatus });

    setIsLoading(false);
  }

  const onChangeEmailAddress = async (fieldsName, fieldValue, setFieldValue) => {
    setIsLoading(true);
    if (fieldValue.validStatus) {
      setIsLoading(false);
      return;
    }

    const response = await dispatch(addContactInfo({ typeId: 2, value: fieldValue.value }));

    if (response?.payload) {
      setUserValue(response?.payload.value);
      const getContactResponse = await dispatch(getContactInfo({ id: response?.payload.id, deviceId: deviceId() }));
      if (!getContactResponse?.payload) {
        setFieldValue({ value: fieldValue.value, status: true, validText: 'Email is already in use by another account. It must be unlinked before adding', validStatus: true });
        setIsLoading(false);

        return;
      } else {
        const userId = getContactResponse.payload.contactMechanismVerificationId;

        setContactId({ userId: userId, id: response.payload.id, status: true });
        setFieldValue({ value: '', status: true, validText: '', validStatus: false });
        setIsModalStatus(true);
      }
    } else {
      setFieldValue({ value: fieldValue.value, status: true, validText: 'Email is already in use by another account. It must be unlinked before adding', validStatus: true });
    }
    setIsLoading(false);
  }

  const onChangeEmailCode = async (fieldsName, fieldValue, setFieldValue) => {
    setIsLoading(true);
    if (fieldValue.validStatus) {
      setIsLoading(false);
      return;
    }

    const response = await dispatch(getContactVerificationCode({ id: contactId?.userId, code: emailValue.value }));
    if (response?.payload) {
      await dispatch(getContactMechanisms({ id: contactId?.id }));
      await dispatch(getContact());
      await dispatch(getUser());
      await dispatch(getChangeUserInfo({ id: userInfo?.id }));
      setCodeValue({ value: '', status: false });
      setFieldValue({ value: '', status: false, validText: '', validStatus: false });
      setContactId({ id: null, userId: null, status: false });
      setIsModalStatus(false);
      localStorage.setItem('isEmailStatus', JSON.stringify(true));
      setIsEmailStatus(true);
    } else {
      setCodeValue({ value: 'Code is incorrect', status: true });
    }
    setIsLoading(false);
  }


  return (
    <SettingsPageComponent title="Profile">
      <Box className={styles.userInfo}>
        <Box
          className={styles.userInfo__backgroundPhoto}
          style={{ backgroundImage: `url(${ userInfo?.backgroundImageUrl || natureImg })` }}
        >
          <Box className={styles.userInfo__backgroundPhoto_iconBlock}>
            <EditOutlinedIcon fontSize="small" className={styles.userInfo__backgroundPhoto_icon} />
          </Box>
        </Box>
        <Box className={styles.userInfo__avatarBlock}>
          <img src={userInfo?.avatar} alt="avatar-img" className={styles.userInfo__avatarBlock_avatar} />
          <Box className={styles.userInfo__iconBlock}>
            <EditOutlinedIcon fontSize="small" className={styles.userInfo__iconBlock_icon} />
          </Box>
        </Box>
        <Box className={styles.userInfo__infoBlock}>
          <h1 className={styles.userInfo__infoBlock_name}>{userInfo?.name}</h1>
          <p className={styles.userInfo__infoBlock_displayName}>@{userInfo?.nickname}</p>
        </Box>
      </Box>
      <Box className={styles.profileContainer}>
        <h6 className={styles.profileContainer__title}>Public Profile</h6>
        <span className={styles.profileContainer__text}>
          Items added to Public Profile is accessible to all users of the application. Anyone viewing your User Profile can see this information.
        </span>
        <Box className={styles.profileContainer__container}>
          <SettingsProfileInfo
            fieldName="Full Name"
            name={userInfo?.name || 'Not Set'}
            defaultValue={userInfo?.name || ''}
            value={fullNameValue}
            setValue={setFullNameValue}
            buttonName="Change"
            apiName="name"
            changeClickStatus={changeClickStatus}
            onChange={handleValueChange}
            onClick={onSubmit}
            maxLength={40}
            isLoading={isLoading}
          />
          <SettingsProfileInfo
            fieldName="Display Name"
            name={`@${userInfo?.nickname}` || 'Not Set'}
            defaultValue={userInfo?.nickname || ''}
            value={displayNameValue}
            setValue={setDisplayNameValue}
            buttonName="Change"
            apiName="nickname"
            changeClickStatus={changeClickStatus}
            onChange={handleValueChange}
            onClick={onSubmit}
            maxLength={12}
            isLoading={isLoading}
          />
          <SettingsProfileInfo
            fieldName="Bio"
            name={userInfo?.about || 'Not Set'}
            defaultValue={userInfo?.about || ''}
            value={bioValue}
            setValue={setBioValue}
            buttonName="Change"
            apiName="about"
            changeClickStatus={changeClickStatus}
            onChange={handleValueChange}
            onClick={onSubmit}
            maxLength={200}
            isLoading={isLoading}
          />
          <SettingsProfileInfo
            fieldName="Location"
            name={userInfo?.primaryLocation || 'Not Set'}
            defaultValue={userInfo?.primaryLocation || ''}
            value={locationValue}
            setValue={setLocationValue}
            buttonName="Change"
            apiName="primaryLocation"
            changeClickStatus={changeClickStatus}
            onChange={handleValueChange}
            onClick={onSubmit}
            isLoading={isLoading}
          />
        </Box>
      </Box>
      <Box className={styles.profileContainer}>
        <h6 className={styles.profileContainer__title}>Public information</h6>
        <span className={styles.profileContainer__text}>
          Items added to Public Information is accessible to all users of the application. Anyone viewing your User Profile can see this information.
        </span>
        <Box className={styles.profileContainer__container}>
          <SettingsProfileInfo
            fieldName="Website"
            name={userWebsite?.value || 'Not Set'}
            defaultValue={userWebsite?.value || ''}
            value={websiteValue}
            id={userWebsite?.id}
            setValue={setWebsiteValue}
            buttonName="Add"
            apiName="website"
            changeClickStatus={changeClickStatus}
            onChange={handleValueChange}
            onClick={onChangeWebsite}
            onDelete={onRemoveWebsite}
            isLoading={isLoading}
          />
          <SettingsProfileInfo
            fieldName="Mobile number"
            name={'Not Set'}
            defaultValue={''}
            value={phoneNumberValue}
            setValue={setPhoneNumberValue}
            buttonName="Add"
            apiName="phoneNumber"
            changeClickStatus={changeClickStatus}
            onChange={handleValueChange}
            onClick={onChangePhoneNumber}
            onDelete={onRemoveWebsite}
            isLoading={isLoading}
            isModalStatus={isModalStatus}
          />
          <SettingsProfileInfo
            fieldName="Email"
            name={userEmail?.value || 'Not Set' }
            defaultValue={userEmail?.value || ''}
            value={emailValue}
            codeValue={codeValue}
            id={userEmail?.id}
            userValue={userValue}
            setValue={setEmailValue}
            buttonName="Add"
            apiName="email"
            changeClickStatus={changeClickStatus}
            onChange={handleValueChange}
            onClick={contactId.status ? onChangeEmailCode : onChangeEmailAddress}
            onDelete={onRemoveEmail}
            isLoading={isLoading}
            isModalStatus={isModalStatus}
          />
        </Box>
      </Box>
    </SettingsPageComponent>
  )
}

export default SettingsProfile;
