import { createSlice } from '@reduxjs/toolkit';

import { UserProfile } from '../../types/user';

export interface IUserTypes {
  userInfo: null | UserProfile
  isLoading: boolean
}

const initialState = {
  userInfo: null,
  isLoading: false,
} as IUserTypes

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
});

export const { userInfo, setIsLoading } = usersSlice.actions;
