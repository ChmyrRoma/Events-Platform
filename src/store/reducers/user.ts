import { createSlice } from '@reduxjs/toolkit';

export interface IUserTypes {
  userInfo: null
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
