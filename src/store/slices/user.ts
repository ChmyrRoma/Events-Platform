import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

import { userAPI } from '../rest/user';
import { userInfo, setIsLoading, setIsAuthorized } from '../reducers/user';

interface UserCredentials {
  email: string
  password: string
}

export const login = createAsyncThunk<string, UserCredentials, AsyncThunkConfig>(
  'login',
  async(data: UserCredentials, thunkAPI) => {
    const response = await userAPI.login(data);
    if (response?.data.accessToken) {
      localStorage.setItem('token', response?.data.accessToken);
      thunkAPI.dispatch(getUser());
      thunkAPI.dispatch(setIsLoading(false))
      return response?.data
    }
    return response
  },
)

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
)

export const logOut = createAsyncThunk(
  'logOut',
  async (_, thunkAPI) => {
    localStorage.removeItem('token');
    return thunkAPI.dispatch(setIsAuthorized(false));
  }
)

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
)

export const recoveryPassword = createAsyncThunk<object, { email: string, deviceId: string }, AsyncThunkConfig>(
  'recoveryPassword',
  async (data) => {
    const response = await userAPI.recoveryPassword(data);
    if (response?.data) {
      return response.data
    }
    return null
  }
)
