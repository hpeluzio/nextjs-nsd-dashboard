'use client';

import { createSlice } from '@reduxjs/toolkit';
import api from '@/api';
import axios from 'axios';

export interface ModelsState {
  value: number;
}

const initialState: ModelsState = {
  value: 0,
};

export const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = modelsSlice.actions;

export const getCifar10Predictions =
  (formData: FormData): any =>
  async () => {
    try {
      const response = await api.post(`/models/predict/cifar10`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error: any) {
      console.log('error.response: ', error.response);
      return error.response;
    }
  };

export const getCoffeeDiseasesPredictionsStage2 =
  (formData: FormData): any =>
  async () => {
    try {
      const response = await api.post(`/models/predict/coffee-diseases-stage2`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error: any) {
      console.log('error.response: ', error.response);
      return error.response;
    }
  };

export const getCoffeeDiseasesPredictionsStage3 =
  (formData: FormData): any =>
  async () => {
    try {
      const response = await api.post(`/models/predict/coffee-diseases-stage3`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error: any) {
      console.log('error.response: ', error.response);
      return error.response;
    }
  };

export default modelsSlice.reducer;
