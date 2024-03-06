import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

import { userAPI } from '../rest/user';
import { setIsLoading } from '../reducers/user';

interface UserCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'login',
  async(data: UserCredentials, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true))
   try {
     const response = await userAPI.login(data)
     if (response?.data.accessToken) {
       localStorage.setItem('token', response?.data.accessToken);
       thunkAPI.dispatch(setIsLoading(false))
       return response?.data
     }
     return response.data
   } catch {
     thunkAPI.dispatch(setIsLoading(false))
   }
  },
)
