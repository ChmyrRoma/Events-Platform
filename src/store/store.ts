import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { combinedReducers, StoreState } from './reducers/root';

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    reducer: rootReducer,
  })
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export type StoreType = StoreState;
