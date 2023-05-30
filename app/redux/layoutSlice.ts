'use client';

import { createSlice } from '@reduxjs/toolkit';

export enum ThemeBright {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface LayoutState {
  theme: ThemeBright;
  navbar: boolean;
}

const initialState: LayoutState = {
  theme: ThemeBright.LIGHT,
  navbar: true,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme === 'LIGHT' ? (state.theme = ThemeBright.DARK) : (state.theme = ThemeBright.LIGHT);
    },
    toggleNavbar: (state) => {
      state.navbar = !state.navbar;
    },
  },
});

export const { toggleTheme, toggleNavbar } = layoutSlice.actions;

export default layoutSlice.reducer;
