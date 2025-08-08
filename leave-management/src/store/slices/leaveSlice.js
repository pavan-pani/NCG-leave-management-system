import { createSlice } from '@reduxjs/toolkit';
import { mockLeaves } from '../../data/mockData';

const initialState = {
  requests: mockLeaves,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    employee: 'all',
  },
};

const leaveSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addLeaveRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateLeaveStatus: (state, action) => {
      const { id, status, comments } = action.payload;
      const leave = state.requests.find(l => l.id === id);
      if (leave) {
        leave.status = status;
        leave.comments = comments || '';
        leave.updatedAt = new Date().toISOString();
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },
    resetFilters: (state) => {
      state.filters = {
        status: 'all',
        employee: 'all',
      };
    },
  },
});

export const {
  setLoading,
  addLeaveRequest,
  updateLeaveStatus,
  setError,
  setFilter,
  resetFilters,
} = leaveSlice.actions;

export default leaveSlice.reducer;