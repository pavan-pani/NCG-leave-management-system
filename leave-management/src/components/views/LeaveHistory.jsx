import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLeaves } from '../../hooks/useLeaves';
import LeaveRequestCard from './LeaveRequestCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Calendar } from 'lucide-react';

const LeaveHistory = () => {
  const { currentUser } = useAuth();
  const { getUserLeaves } = useLeaves();

  const userLeaves = getUserLeaves();
  const sortedLeaves = userLeaves.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Leave History</CardTitle>
        <CardDescription>Your recent leave requests and their status</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedLeaves.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">No leave requests found</p>
            <p className="text-gray-500">You haven't submitted any leave requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedLeaves.map(leave => (
              <LeaveRequestCard 
                key={leave.id} 
                leave={leave} 
                showActions={false}
                showEmployee={false}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaveHistory;