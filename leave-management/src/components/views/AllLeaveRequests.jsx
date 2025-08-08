import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLeaves } from '../../hooks/useLeaves';
import LeaveRequestCard from './LeaveRequestCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Filter, Calendar, RefreshCw } from 'lucide-react';

const AllLeaveRequests = () => {
  const { users } = useSelector(state => state.users);
  const { getFilteredRequests, updateStatus, filters, updateFilter, clearFilters, loading } = useLeaves();
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredRequests = getFilteredRequests();
  const employees = users.filter(user => user.role === 'employee');

  const handleStatusUpdate = async (leaveId, status, comments = '') => {
    setIsUpdating(true);
    try {
      await updateStatus(leaveId, status, comments);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    updateFilter(filterType, value);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              All Leave Requests
            </CardTitle>
            <CardDescription>Manage employee leave requests</CardDescription>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select 
                value={filters.status} 
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select 
              value={filters.employee} 
              onValueChange={(value) => handleFilterChange('employee', value)}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map(employee => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(filters.status !== 'all' || filters.employee !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading requests...</span>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">No leave requests found</p>
            <p className="text-gray-500">
              {filters.status !== 'all' || filters.employee !== 'all' 
                ? 'Try adjusting your filters to see more results.'
                : 'No employees have submitted leave requests yet.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
            </div>
            {filteredRequests.map(leave => (
              <LeaveRequestCard 
                key={leave.id} 
                leave={leave} 
                showActions={true}
                showEmployee={true}
                onStatusUpdate={handleStatusUpdate}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllLeaveRequests;