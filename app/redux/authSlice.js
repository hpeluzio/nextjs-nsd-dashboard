import { createSlice } from '@reduxjs/toolkit';
// import api from '../api';

const initialState = {
  isLogin: false,
  currentUser: { access_token: '' },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      if (action.payload === null || Object.keys(action.payload).length === 0) {
        state.currentUser = {};
        state.isLogin = false;
      } else {
        state.currentUser = action.payload;
        state.isLogin = true;
      }
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      // const response = await api.post('/auth/login', { email, password });
      // // console.log('userLogin -> ', response.data);
      // const user = response.data;
      // user.name = response.data.fullname;
      // user.thumb = response.data.avatar;
      // user.avatar = response.data.avatar;
      // if (user.role === 'ADMIN') user.role = USER_ROLE.Admin;
      // if (user.role === 'USER') user.role = USER_ROLE.User;
      // // id: 1,
      // // name: 'Lisa Jackson',
      // // thumb: '/img/profile/profile-9.webp',
      // // role: USER_ROLE.Admin,
      // // email: 'lisajackson@gmail.com',
      // dispatch(setCurrentUser(user));
      // return response;
    } catch (error) {
      console.log('error.response: ', error.response);
      dispatch(setCurrentUser({}));
      return error.response;
    }
  };

export const userRegister = (values) => async () => {
  try {
    // const response = await api.post('/users', values);
    // return response;
  } catch (error) {
    console.log('Register error.response: ', error.response);

    return error.response;
  }
};

export const userForgotPassword = (values) => async () => {
  try {
    // const response = await api.post('/auth/forgot-password', {
    //   email: values.email,
    // });
    // console.log('/auth/forgot-password: ', response.data);
    // return response;
  } catch (error) {
    console.log('/auth/forgot-password: ', error.response);

    return error.response;
  }
};

export const userResetPassword = (values) => async () => {
  // console.log('values /auth/reset-password: ', values);
  try {
    // const response = await api.post('/auth/reset-password', {
    //   token: values.token,
    //   password: values.password,
    //   confirm_password: values.confirm_password,
    // });
    // console.log('/auth/reset-password: ', response.data);
    // return response;
  } catch (error) {
    console.log('/auth/reset-password: ', error.response);

    return error.response;
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch(setCurrentUser({}));
    return true;
  } catch (error) {
    dispatch(setCurrentUser({}));
    return false;
  }
};

const authReducer = authSlice.reducer;

export default authReducer;
