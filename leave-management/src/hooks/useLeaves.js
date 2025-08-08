import { useSelector, useDispatch } from 'react-redux';
import { 
  addLeaveRequest, 
  updateLeaveStatus, 
  setLoading, 
  setError,
  setFilter,
  resetFilters 
} from '../store/slices/leaveSlice';
import { generateId, getTodayDate } from '../utils/helpers';

export const useLeaves = () => {
  const dispatch = useDispatch();
  const { requests, loading, error, filters } = useSelector(state => state.leaves);
  const { currentUser } = useSelector(state => state.auth);

  const submitLeaveRequest = async (formData) => {
    dispatch(setLoading(true));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newLeave = {
        id: generateId(),
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        ...formData,
        status: 'pending',
        appliedDate: getTodayDate(),
        comments: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      dispatch(addLeaveRequest(newLeave));
      dispatch(setLoading(false));
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      return { success: false, error: error.message };
    }
  };

  const updateStatus = async (leaveId, status, comments = '') => {
    dispatch(setLoading(true));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(updateLeaveStatus({ id: leaveId, status, comments }));
      dispatch(setLoading(false));
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      return { success: false, error: error.message };
    }
  };

  const getUserLeaves = () => {
    if (!currentUser) return [];
    return requests.filter(leave => leave.employeeId === currentUser.id);
  };

  const getFilteredRequests = () => {
    let filtered = [...requests];
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(request => request.status === filters.status);
    }
    
    if (filters.employee !== 'all') {
      filtered = filtered.filter(request => request.employeeId === filters.employee);
    }
    
    return filtered.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
  };

  const getLeaveStats = (userSpecific = false) => {
    const relevantRequests = userSpecific ? getUserLeaves() : requests;
    
    return {
      total: relevantRequests.length,
      pending: relevantRequests.filter(l => l.status === 'pending').length,
      approved: relevantRequests.filter(l => l.status === 'approved').length,
      rejected: relevantRequests.filter(l => l.status === 'rejected').length,
    };
  };

  const updateFilter = (filterType, value) => {
    dispatch(setFilter({ filterType, value }));
  };

  const clearFilters = () => {
    dispatch(resetFilters());
  };

  return {
    requests,
    loading,
    error,
    filters,
    submitLeaveRequest,
    updateStatus,
    getUserLeaves,
    getFilteredRequests,
    getLeaveStats,
    updateFilter,
    clearFilters,
  };
};