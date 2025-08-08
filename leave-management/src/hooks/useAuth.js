import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, loading, error } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.users);

  const login = async (userId) => {
    try {
      const user = users.find(u => u.id === userId);
      if (user) {
        dispatch(loginSuccess(user));
        return { success: true };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    logout: handleLogout,
  };
};