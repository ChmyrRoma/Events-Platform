import { createSlice } from '@reduxjs/toolkit';

import { UserProfile } from '../../types/user';

export interface IUserTypes {
  userInfo: null | UserProfile
  isLoading: boolean
  isAuthorized: boolean
  website: null | IUserContactMechanisms
  phoneNumber: null | number
}

interface IUserContactMechanisms {
  createdAt: string
  createdat: string
  designation: number
  id: number
  isNotification: boolean
  isPublic: boolean
  isVerificationPending: boolean
  isVerified: boolean
  typeId: number
  typeid: number
  updatedAt: string
  updatedat: string
  value: string
}

const initialState = {
  userInfo: null,
  isLoading: true,
  isAuthorized: false,
  contactInfo: null,
  phoneNumber: null
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
    },
    setIsWebsiteValue: (state, action) => {
      state.contactInfo = action.payload;
    },
    setIsPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    }
  }
});

export const { userInfo, setIsLoading, setIsAuthorized, setIsWebsiteValue, setIsPhoneNumber } = usersSlice.actions;
