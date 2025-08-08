import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { CheckCircle, XCircle, Clock, Calendar, User, MessageSquare } from 'lucide-react';
import { formatDate, getDaysCount, getStatusColor } from '../../utils/helpers';

const LeaveRequestCard = ({ 
  leave, 
  showActions = false, 
  showEmployee = true, 
  onStatusUpdate, 
  isUpdating = false 
}) => {
  const [comment, setComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStatusUpdate = async (status) => {
    if (!onStatusUpdate) return;

    setIsProcessing(true);
    try {
      await onStatusUpdate(leave.id, status, comment);
      setComment('');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const duration = getDaysCount(leave.startDate, leave.endDate);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600 py-0">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  {leave.leaveType}
                </h3>
                {showEmployee && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {leave.employeeName}
                  </p>
                )}
              </div>
              <Badge 
                variant="outline" 
                className={`${getStatusColor(leave.status)} capitalize flex items-center gap-1`}
              >
                {getStatusIcon(leave.status)}
                {leave.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <span className="font-medium text-gray-700">Duration:</span>
                <div className="text-gray-600">
                  <div>{formatDate(leave.startDate)} - {formatDate(leave.endDate)}</div>
                  <div className="text-xs text-gray-500">
                    ({duration} day{duration > 1 ? 's' : ''})
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="font-medium text-gray-700">Applied:</span>
                <div className="text-gray-600">{formatDate(leave.appliedDate)}</div>
              </div>
              
              <div className="space-y-1">
                <span className="font-medium text-gray-700">Reason:</span>
                <div className="text-gray-600 break-words">{leave.reason}</div>
              </div>
            </div>

            {leave.comments && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-700 text-sm">Approver Comments:</span>
                </div>
                <p className="text-sm text-gray-600">{leave.comments}</p>
              </div>
            )}
          </div>

          {showActions && leave.status === 'pending' && (
            <div className="flex flex-col space-y-3 lg:w-80">
              <Textarea
                placeholder="Add comments (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="text-sm resize-none"
                disabled={isProcessing || isUpdating}
              />
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleStatusUpdate('approved')}
                  disabled={isProcessing || isUpdating}
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate('rejected')}
                  disabled={isProcessing || isUpdating}
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveRequestCard;