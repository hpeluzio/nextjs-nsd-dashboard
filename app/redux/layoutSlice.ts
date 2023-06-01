'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface LayoutState {
  navbar: boolean;
}

const initialState: LayoutState = {
  navbar: true,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.navbar = !state.navbar;
    },
  },
});

export const { toggleNavbar } = layoutSlice.actions;

export default layoutSlice.reducer;
