'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import layoutReducer from './layoutSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
