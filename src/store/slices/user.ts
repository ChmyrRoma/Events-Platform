import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

import { userAPI } from '../rest/user';
import { userInfo, setIsLoading, setIsAuthorized, setIsWebsiteValue } from '../reducers/user';
import { IRegister } from '../../types/user';

interface UserCredentials {
  email: string
  password: string
}

export const login = createAsyncThunk<string, UserCredentials, AsyncThunkConfig>(
  'login',
  async (data: UserCredentials, thunkAPI) => {
    const response = await userAPI.login(data);
    if (response?.data.accessToken) {
      localStorage.setItem('token', response?.data.accessToken);
      thunkAPI.dispatch(getUser());
      thunkAPI.dispatch(setIsLoading(false));
      return response?.data;
    }
    return response;
  },
);

export const signUp = createAsyncThunk<object, { email: string, deviceId: string, timezone: string }, AsyncThunkConfig>(
  'signUp',
  async (data) => {
    const response = await userAPI.signUp(data);
    if (response) {
      return response?.data;
    }
    return response;
  }
);

export const getUser = createAsyncThunk(
  'getUser',
  async (_, thunkAPI) => {
    const response = await userAPI.getUser();
    if (response?.data) {
      thunkAPI.dispatch(userInfo(response?.data));
      thunkAPI.dispatch(setIsAuthorized(true));
      return response.data;
    }
    return response;
  }
);

export const logOut = createAsyncThunk(
  'logOut',
  async (_, thunkAPI) => {
    localStorage.removeItem('token');
    return thunkAPI.dispatch(setIsAuthorized(false));
  }
);

export const checkAuth = createAsyncThunk(
  'checkAuth',
  async (_, thunkAPI) => {
    try {
      const token = await localStorage.getItem('token');
      if (token) {
        await thunkAPI.dispatch(getUser());
      }
      thunkAPI.dispatch(setIsLoading(false));
    } catch (error) {
      return error;
    }
  }
);

export const recoveryPassword = createAsyncThunk<object, { email: string, deviceId: string }, AsyncThunkConfig>(
  'recoveryPassword',
  async (data) => {
    const response = await userAPI.recoveryPassword(data);
    if (response?.data) {
      return response.data;
    }
    return null;
  }
);

export const verificationEmail = createAsyncThunk<object, { email: string, deviceId: string }, AsyncThunkConfig>(
  'verificationEmail',
  async (data) => {
    const response = await userAPI.verificationEmail(data);
    if (response?.data) {
      return response.data;
    }
    return null;
  }
);

export const verificationValidate = createAsyncThunk<object, { id: number, code: number }, AsyncThunkConfig>(
  'verificationValidate',
  async (data) => {
    const response = await userAPI.verificationValidate(data);
    if (response?.data) {
      return response.data;
    }
    return null;
  }
);

export const register = createAsyncThunk<object, IRegister, AsyncThunkConfig>(
  'register',
  async (data) => {
    const response = await userAPI.register(data);
    if (response?.data) {
      return response.data;
    }
    return response;
  }
)

export const getGeoInfo = createAsyncThunk<object, AsyncThunkConfig>(
  'getGeoInfo',
  async () => {
    try {
      const response = await userAPI.getGeoInfo();
      return response.data;
    } catch (error) {
      return null;
    }
  }
)

export const changeUserInfo = createAsyncThunk<object, { fieldName: string, value: string }, AsyncThunkConfig>(
  'changeUserInfo',
  async (data) => {
    const response = await userAPI.changeUserInfo(data);
    if (response?.data) {
      return response.data;
    }
    return response;
  }
)

export const getChangeUserInfo = createAsyncThunk<object, { id: string }, AsyncThunkConfig>(
  'getChangeUserInfo',
  async (data, thunkAPI) => {
    const response = await userAPI.getChangeUserInfo(data);
    if (response?.data) {
      thunkAPI.dispatch(userInfo(response?.data.profile));
      thunkAPI.dispatch(setIsWebsiteValue(response?.data.contactMechanisms));
      return response.data;
    }
    return response;
  }
)

export const addContactInfo = createAsyncThunk<object, { typeId: number, value: string }, AsyncThunkConfig>(
  'addContactInfo',
  async (data, thunkAPI) => {
    const response = await userAPI.addContactInfo(data);
    if (response?.data) {
// =      thunkAPI.dispatch(setIsWebsiteValue(response?.data));

      return response.data;
    }
    return response;
  }
)

export const getContact = createAsyncThunk<object, AsyncThunkConfig>(
  'getContact',
  async () => {
    const response = await userAPI.getContact();
    if (response?.data) {
      return response.data;
    }
    return response;
  }
)

export const deleteWebsite = createAsyncThunk<object, { id: number }, AsyncThunkConfig>(
  'deleteWebsite',
  async (data) => {
    const response = await userAPI.deleteWebsite(data);
    if (response?.data) {
      return response.data;
    }
    return response;
  }
)

export const getContactInfo = createAsyncThunk<object, { id: number, deviceId: string }, AsyncThunkConfig>(
  'getContactInfo',
  async (data) => {
    const response = await userAPI.getContactInfo(data);
    if (response?.data) {
      return response.data;
    }
    return response;
  }
)

export const getContactVerificationCode = createAsyncThunk<object, { id: number, code: number }, AsyncThunkConfig>(
  'getContactVerificationCode',
  async (data) => {
    const response = await userAPI.getContactVerificationCode(data);
    if (response?.data) {
      return response.data;
    }
    return response;
  }
)

export const getContactMechanisms = createAsyncThunk<object, { id: number }, AsyncThunkConfig>(
  'getContactMechanisms',
  async (data) => {
    const response = await userAPI.getContactMechanisms(data);
    if (response?.data) {
      return response.data;
    }
    return response;
  }
)

export const unPublishEmail = createAsyncThunk<object, { id: number }, AsyncThunkConfig>(
  'unPublishEmail',
  async (data) => {
    const response = await userAPI.unPublishEmail(data);
    if (response?.data) {
      return response.data;
    }
    return response;
  }
)
