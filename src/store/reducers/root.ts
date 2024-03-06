import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { usersSlice, IUserTypes } from './user';

export interface StoreState {
  user: IUserTypes
}

export const combinedReducers = combineReducers({
  [usersSlice.name]: usersSlice.reducer,
})

export type Store = ReturnType<typeof combinedReducers>;

const rootReducer = (state: Store, action: AnyAction) => combinedReducers(state, action)

export default rootReducer;
