import { createSlice } from '@reduxjs/toolkit';
import { mockUsers } from '../../data/mockData';

const initialState = {
  users: mockUsers,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// export const {} = userSlice.actions;
export default userSlice.reducer;