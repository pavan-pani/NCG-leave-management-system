import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { Calendar, User, LogOut, Plus } from 'lucide-react';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleApplyLeave = () => {
    navigate('/apply-leave');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const showApplyLeaveButton = currentUser.role === 'employee' && location.pathname !== '/apply-leave';

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleDashboard}
            >
              <img
                src="https://netconnectglobal.com/wp-content/uploads/2023/04/NCG_dark.png"
                alt="NCG Logo"
                loading="lazy"
                className="w-20 md:w-40 h-auto"
              />
              <span className="text-[14px] md:text-xl font-bold text-gray-900 ">Leave Managemnt System</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300" />
            <div className="text-sm text-gray-600 md:block hidden">
              Hi, <span className="font-medium text-gray-900">{currentUser.name}</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {showApplyLeaveButton && (
              <Button onClick={handleApplyLeave} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Apply Leave</span>
              </Button>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline capitalize">{currentUser.role}</span>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;