import { createSlice } from '@reduxjs/toolkit';

import { UserProfile } from '../../types/user';

export interface IUserTypes {
  userInfo: null | UserProfile
  isLoading: boolean
  isAuthorized: boolean
}

const initialState = {
  userInfo: null,
  isLoading: true,
  isAuthorized: false,
} as IUserTypes

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    }
  }
});

export const { userInfo, setIsLoading, setIsAuthorized } = usersSlice.actions;
