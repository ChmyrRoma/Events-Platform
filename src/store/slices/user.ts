import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

import { userAPI } from '../rest/user';
import { userInfo, setIsLoading, setIsAuthorized } from '../reducers/user';

interface UserCredentials {
  email: string
  password: string
}

interface IRegister {
  avatar: string
  avatarType: string
  captcha: string
  country: string
  deviceId: string
  email: string
  firstName: string
  id: number
  lastname: string
  locale: string
  name: string
  password: string
  timezone: string
  type: string
  username: string
}

export const login = createAsyncThunk<string, UserCredentials, AsyncThunkConfig>(
  'login',
  async (data: UserCredentials, thunkAPI) => {
    const response = await userAPI.login(data);
    if (response?.data.accessToken) {
      localStorage.setItem('token', response?.data.accessToken);
      thunkAPI.dispatch(getUser());
      thunkAPI.dispatch(setIsLoading(false))
      return response?.data
    }
    return response
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
      thunkAPI.dispatch(userInfo(response?.data))
      thunkAPI.dispatch(setIsAuthorized(true))
      return response.data
    }
    return response
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
      const token = await localStorage.getItem('token')
      if (token) {
        await thunkAPI.dispatch(getUser());
      }
      thunkAPI.dispatch(setIsLoading(false));
    } catch (error) {
      return error
    }
  }
);

export const recoveryPassword = createAsyncThunk<object, { email: string, deviceId: string }, AsyncThunkConfig>(
  'recoveryPassword',
  async (data) => {
    const response = await userAPI.recoveryPassword(data);
    if (response?.data) {
      return response.data
    }
    return null
  }
);

export const verificationEmail = createAsyncThunk<object, { email: string, deviceId: string }, AsyncThunkConfig>(
  'verificationEmail',
  async (data) => {
    const response = await userAPI.verificationEmail(data);
    if (response?.data) {
      return response.data
    }
    return null
  }
);

export const verificationValidate = createAsyncThunk<object, { id: number, code: number }, AsyncThunkConfig>(
  'verificationValidate',
  async (data) => {
    const response = await userAPI.verificationValidate(data);
    if (response?.data) {
      return response.data
    }
    return null
  }
);

export const register = createAsyncThunk<object, IRegister, AsyncThunkConfig>(
  'register',
  async (data) => {
    const response = await userAPI.register(data);
    if (response?.data) {
      return response.data
    }
    return response
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
