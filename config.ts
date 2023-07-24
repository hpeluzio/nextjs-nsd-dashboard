export const USER_ROLE = {
  Admin: 'ADMIN',
  User: 'USER',
};

export const SERVICE_URL = process.env.SERVICE_URL;
export const USE_MULTI_LANGUAGE = true;

export const DEFAULT_USER = {
  id: 1,
  name: 'Lisa Jackson',
  thumb: '/img/profile/profile-9.webp',
  role: USER_ROLE.Admin,
  email: 'lisajackson@gmail.com',
};

export const REDUX_PERSIST_KEY = 'root';
