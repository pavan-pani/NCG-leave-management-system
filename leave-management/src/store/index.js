import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import leaveSlice from './slices/leaveSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leaves: leaveSlice,
    users: userSlice,
  },
});

export default store;