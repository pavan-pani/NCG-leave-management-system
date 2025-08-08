import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLeaves } from '../hooks/useLeaves';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatsCard from '../components/common/StatsCard';
import LeaveHistory from '../components/views/LeaveHistory';
import AllLeaveRequests from '../components/views/AllLeaveRequests';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Users,
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getLeaveStats, requests, loading } = useLeaves();

  if (!currentUser) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner text="Loading leave data..." />
      </div>
    );
  }

  const isEmployee = currentUser.role === 'employee';
  const stats = getLeaveStats(isEmployee);
  const uniqueEmployees = !isEmployee ? new Set(requests.map(req => req.employeeId)).size : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEmployee ? 'My Dashboard' : 'Manager Dashboard'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEmployee ? 'Track your leave requests' : 'Manage all leave requests from employees'}
        </p>
      </div>

      <div
        className={`grid grid-cols-2 ${
          isEmployee ? 'md:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-5'
        } gap-6 mb-8`}
      >
        <StatsCard
          title="Total Requests"
          value={stats.total}
          icon={<Calendar className="h-6 w-6" />}
          color="blue"
        />

        {!isEmployee && (
          <StatsCard
            title="Employees"
            value={uniqueEmployees}
            icon={<Users className="h-6 w-6" />}
            color="indigo"
          />
        )}

        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={<Clock className="h-6 w-6" />}
          color="yellow"
        />
        <StatsCard
          title="Approved"
          value={stats.approved}
          icon={<CheckCircle className="h-6 w-6" />}
          color="green"
        />
        <StatsCard
          title="Rejected"
          value={stats.rejected}
          icon={<XCircle className="h-6 w-6" />}
          color="red"
        />
      </div>

      {isEmployee ? <LeaveHistory /> : <AllLeaveRequests />}
    </div>
  );
};

export default Dashboard;
