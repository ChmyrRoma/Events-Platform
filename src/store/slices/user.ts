import { createAsyncThunk } from '@reduxjs/toolkit';

import { userAPI } from '../rest/user';
import { setIsLoading, userInfo } from '../reducers/user';

interface UserCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'login',
  async(data: UserCredentials, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true))
   try {
     const response = await userAPI.login(data);
     if (response.data?.accessToken) {
       localStorage.setItem('token', response?.data.accessToken);
       thunkAPI.dispatch(getUser());
       thunkAPI.dispatch(setIsLoading(false))
       return response.data
     }
     return response.data
   } catch {
     thunkAPI.dispatch(setIsLoading(false))
   }
  },
)

export const getUser = createAsyncThunk(
  'getUser',
  async (_, thunkAPI) => {
    const response = await userAPI.getUser();
    if (response?.data) {
      thunkAPI.dispatch(userInfo(response.data))
      return response.data
    }
    return response
  }
)
