'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import counterReducer from './counterSlice';
import layoutReducer from './layoutSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
